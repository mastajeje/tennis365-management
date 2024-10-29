const query = require('../../query')


export async function GET(req: Request, res:Response){
    const {searchParams} = new URL(req.url);
    const date = searchParams.get('date');
    if(date){
        const matches = await query.get_matches_by_date(date);
        let formattedMatches = {}
        // matches.rows.forEach((match: {matches_id:number,name:string, winner_team: string, a_score:number, b_score:number, time_added: string, team: string, winner: string}) => {
        //     console.log(match);
        //     const matchId = match.matches_id;
        //     formattedMatches = {
        //         [matchId] :{
        //             winner_team: match.winner_team,
        //             a_score: match.a_score,
        //             b_score: match.b_score,
        //             time_added: match.time_added,
        //             aTeam: match.team === 'A' ? [match.name ] : [...formattedMatches['matchId']aTeam,]
        //             bTeam: match.bTeam,
        //             winner: match.winner
        //         }
        //     }
        // })

        console.log(formattedMatches)
        return Response.json(matches.rows)
    }  else {
        return Response.json({'message':'error no data found'})
    }

}

export async function POST(req: Request) {
    try{
const data = await req.json()
const { aTeam, bTeam, aTeamScore, bTeamScore, matchDate} = data

const checkNonExistPlayer =await checkPlayers([...aTeam, ...bTeam]);

if(checkNonExistPlayer?.missingPlayers.length > 0){
    // DB에 존재하지 않는 선수가 있을 경우 추가
    checkNonExistPlayer.missingPlayers?.forEach((player_name: string) => {
       const result = query.insert_player(player_name)
       console.log(result);
    })
}

// 점수가 0일때를 falsy가 아닌 값으로 처리하기 위해 체크
if(aTeamScore !== null && aTeamScore !== undefined && bTeamScore !== null && bTeamScore !== undefined) {
    const winnerTeam = aTeamScore > bTeamScore ? 'A' : 'B'
    const match_result = await query.post_match(winnerTeam, aTeamScore, bTeamScore, matchDate)
    if(match_result.rows.length > 0) {
        const matchedPlayers = [...aTeam, ...bTeam]
        const players = await query.get_matched_players(matchedPlayers)
        if(players.rows.length > 0) {
            players.rows.forEach((player:{name:string,id:number}) => {
                if(winnerTeam === 'A'){
                    //A팀승리
                    if(aTeam.includes(player.name)){
                        //player가 A팀에 속한 경우
                        query.insert_player_match('A', true, match_result.rows[0].id, player.id)
                        query.update_player_win(player.id);
                    } else {
                        //player가 B팀에 속한 경우
                        query.insert_player_match('B', false, match_result.rows[0].id, player.id)
                        query.update_player_loss(player.id);
                    }
                } else {
                    //B팀승리
                    if(bTeam.includes(player.name)){
                        //player가 B팀에 속한 경우
                        query.insert_player_match('B', true, match_result.rows[0].id, player.id)
                        query.update_player_win(player.id);
                    } else{
                        //player가 A팀에 속한 경우
                        query.insert_player_match('A', false, match_result.rows[0].id, player.id)
                        query.update_player_loss(player.id);
                    }
                    //B팀승리
            
            }
        })
        }

        return Response.json({'message':'success'})
    }

} 

    } catch (error: any) {
        return new Response(JSON.stringify({error: error}), {status: 500})
    }

}

const checkPlayers =async (playerNames: string[]) => {

    const result = await query.check_players_by_name(playerNames);

    const existingPlayers = result.rows.map((row: {name:string})=> row.name);
    const missingPlayers = playerNames.filter((name)=> !existingPlayers.includes(name));


        return { missingPlayers}
  

}