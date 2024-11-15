const query = require('../../query')


export async function GET(req: Request, res:Response){
    interface IMatchData {
        [matchId:number]: {
            aScore: number;
            bScore: number;
            timeAdded: string;
            aTeam: string[],
            bTeam: string[],
            winner: string
        } ;
    }

    const {searchParams} = new URL(req.url);
    const date = searchParams.get('date');
    if(date){
        const matches = await query.get_matches_by_date(date);
        let formattedMatches:IMatchData 
        formattedMatches = {}
        matches.rows.forEach((match: {matches_id:number,name:string, a_score:number, b_score:number, time_added: string, team: string, winner_team: string}) => {

            const matchId = match.matches_id;
    
            // matchId key에 property가 없을 경우 초기화
            if(!formattedMatches[matchId]){
                formattedMatches[matchId] = {
                    aScore: match.a_score,
                    bScore: match.b_score,
                    timeAdded: match.time_added,
                    aTeam: [],
                    bTeam: [],
                    winner: match.winner_team
                }
            }
             
                 if(match.team === "A"){
                    formattedMatches[matchId].aTeam.push(match.name)
                 } else if(match.team === "B"){
                    formattedMatches[matchId].bTeam.push(match.name)
                }
        })

   
        return Response.json(formattedMatches)
    }  else {
        return Response.json({'message':'error no data found'})
    }

}

export async function POST(req: Request) {
    try{
const data = await req.json()
const { aTeam, bTeam, aScore, bScore, matchDate} = data

const checkNonExistPlayer =await checkPlayers([...aTeam, ...bTeam]);

if(checkNonExistPlayer?.missingPlayers.length > 0){
    // DB에 존재하지 않는 선수가 있을 경우 추가
    checkNonExistPlayer.missingPlayers?.forEach(async(player_name: string) => {
    await query.insert_player(player_name)
    })
}

// 점수가 0일때를 falsy가 아닌 값으로 처리하기 위해 체크
if(aScore !== null && aScore !== undefined && bScore !== null && bScore !== undefined) {
    const winnerTeam = aScore > bScore ? 'A' : 'B'
    await query.insert_match_date();
    const match_result = await query.post_match(winnerTeam, aScore, bScore, matchDate)
    if(match_result.rows.length > 0) {
        const matchedPlayers = [...aTeam, ...bTeam]
        const players = await query.get_matched_players(matchedPlayers)
        if(players.rows.length > 0) {
            players.rows.forEach(async(player:{name:string,id:number}) => {
                if(winnerTeam === 'A'){
                    //A팀승리
                    if(aTeam.includes(player.name)){
                        //player가 A팀에 속한 경우
                       await query.insert_player_match('A', true, match_result.rows[0].id, player.id)
                       await query.update_player_win(player.id);
                    } else {
                        //player가 B팀에 속한 경우
                       await query.insert_player_match('B', false, match_result.rows[0].id, player.id)
                       await query.update_player_loss(player.id);
                    }
                } else {
                    //B팀승리
                    if(bTeam.includes(player.name)){
                        //player가 B팀에 속한 경우
                      await query.insert_player_match('B', true, match_result.rows[0].id, player.id)
                      await query.update_player_win(player.id);
                    } else{
                        //player가 A팀에 속한 경우
                        await query.insert_player_match('A', false, match_result.rows[0].id, player.id)
                        await query.update_player_loss(player.id);
                    }
                    //B팀승리
            
            }
        })
        }

        return Response.json({'message':'success',matchID:match_result.rows[0].id})
    }

} 

    } catch (error: any) {
        console.log(error);
        return new Response(JSON.stringify({error}), {status: 500})
    }

}

export async function DELETE(req: Request) {
    const {searchParams} = new URL(req.url);
    const matchId = parseInt(searchParams.get('match-id') as string,10);
    
    type Player ={
        id: number,
        team: string,
        is_winner: boolean,
        matches_id:number,
        player_id:number
    }
    if(matchId){
        // 1. player_match 테이블에서 matches_id === matchId인 데이터 가져오기
        const playersFromMatch = await query.get_player_by_match(matchId);
            
        // 2. 하나씩 is_winner가 true인지 확인 
        // 3. true일 경우 해당 player의 승리수 -1 / false일 경우 해당 player의 패배수 -1
        playersFromMatch.rows.forEach((player:Player) => {
            if(player.is_winner){
                query.decrease_player_win(player.player_id);
            } else {
                query.decrease_player_loss(player.player_id);
            }
        })

       const isDeleted = await query.delete_match(matchId);

       // 4. matches 테이블에서 id === matchId인 데이터 삭제
       if(isDeleted.rowCount){
        return Response.json({'message':'success'})
       } else{
        return Response.json({'message':'error no match deleted'})
       }
         } else {
        return Response.json({'message':'error no data found'})
    }
}

const checkPlayers =async (playerNames: string[]) => {

    const result = await query.check_players_by_name(playerNames);

    const existingPlayers = result.rows.map((row: {name:string})=> row.name);
    const missingPlayers = playerNames.filter((name)=> !existingPlayers.includes(name));


        return { missingPlayers}
  

}