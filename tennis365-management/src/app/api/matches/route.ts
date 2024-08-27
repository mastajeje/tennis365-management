const query = require('../query')

export async function POST(req: Request) {
    try{
const data = await req.json()
const { aTeam, bTeam, aTeamScore, bTeamScore} = data

if( aTeamScore && bTeamScore) {
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