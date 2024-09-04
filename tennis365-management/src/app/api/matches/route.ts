const query = require('../query')


export async function GET(req: Request, res:Response){
    const {searchParams} = new URL(req.url);
    const date = searchParams.get('date');
    if(date){
        const matches = await query.get_matches_by_date(date);
        return Response.json(matches.rows)
    }  else {
        return Response.json({'message':'error no data found'})
    }

}

export async function POST(req: Request) {
    try{
const data = await req.json()
const { aTeam, bTeam, aTeamScore, bTeamScore} = data

const checkNonExistPlayer =await checkPlayers([...aTeam, ...bTeam]);

if(checkNonExistPlayer?.missingPlayers.length > 0){
    // DB에 존재하지 않는 선수가 있을 경우 추가
    checkNonExistPlayer.missingPlayers?.forEach((player_name: string) => {
       const result = query.insert_player(player_name)
       console.log(result);
    })
}

if(aTeamScore && bTeamScore) {
    const winnerTeam = aTeamScore > bTeamScore ? 'A' : 'B'
    const match_result = await query.post_match(winnerTeam, aTeamScore, bTeamScore)
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
                        query.update_player_lose(player.id);
                    }
                    //B팀승리
            
            }
        })
        }

        return Response.json({'message':'success'})
    }

} 

    } catch (error: any) {
        return new Response(JSON.stringify({error: error.message}), {status: 500})
    }

}

const checkPlayers =async (playerNames: string[]) => {

    const result = await query.check_players_by_name(playerNames);

    const existingPlayers = result.rows.map((row: {name:string})=> row.name);
    const missingPlayers = playerNames.filter((name)=> !existingPlayers.includes(name));


        return { missingPlayers}
  

}