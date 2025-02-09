import {NextApiRequest, NextApiResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server';

const query = require('../../query');

interface IMatchData {
  [matchId: number]: {
    aScore: number;
    bScore: number;
    timeAdded: string;
    aTeam: string[];
    bTeam: string[];
    winner: string;
  };
}

type Player = {
  id: number;
  team: string;
  is_winner: boolean;
  matches_id: number;
  player_id: number;
};

interface Match {
    matches_id: number;
    name: string;
    a_score: number;
    b_score: number;
    time_added: string;
    team: string;
    winner_team: string;
}

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const date = searchParams.get('date');
  if (date) {
    const matches = await query.get_matches_by_date(date);
    const formattedMatches: IMatchData = {};
    // formattedMatches = {};
    matches.rows.forEach(
      (match: Match) => {
        const matchId = match.matches_id;

        // matchId key에 property가 없을 경우 초기화
        if (!formattedMatches[matchId]) {
          formattedMatches[matchId] = {
            aScore: match.a_score,
            bScore: match.b_score,
            timeAdded: match.time_added,
            aTeam: [],
            bTeam: [],
            winner: match.winner_team,
          };
        }

        if (match.team === 'A') {
          formattedMatches[matchId].aTeam.push(match.name);
        } else if (match.team === 'B') {
          formattedMatches[matchId].bTeam.push(match.name);
        }
      }
    );

    return Response.json(formattedMatches);
  } else {
    // console.error('Error fetching matches:', error)
    return Response.json({message: 'error no data found'});
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {aTeam, bTeam, aScore, bScore, matchDate} = data;

    const checkNonExistPlayer = await checkPlayers([...aTeam, ...bTeam]);

    if (checkNonExistPlayer?.missingPlayers.length > 0) {
      handleMissingPlayers(checkNonExistPlayer.missingPlayers);
    }

    // 점수가 0일때를 falsy가 아닌 값으로 처리하기 위해 체크
    if (
      aScore !== null &&
      aScore !== undefined &&
      bScore !== null &&
      bScore !== undefined
    ) {
      const winnerTeam = aScore > bScore ? 'A' : 'B';
      await query.insert_match_date();
      const match_result = await query.post_match(
        winnerTeam,
        aScore,
        bScore,
        matchDate
      );

      if (match_result.rows.length > 0) {
        //경기에 참여한 선수들 정보 불러오기
        const matchedPlayers = [...aTeam, ...bTeam];
        const players = await query.get_matched_players(matchedPlayers);

        if (players.rows.length > 0) {
          const playerPromises = players.rows.map(
            (player: {name: string; id: number}) =>
              handlePlayerMatch(
                winnerTeam,
                match_result.rows[0].id,
                player,
                aTeam,
                bTeam
              )
          );
          await Promise.all(playerPromises);
        }

        return Response.json({
          message: 'success',
          matchID: match_result.rows[0].id,
        });
      }
    }
    return new Response(JSON.stringify({message: 'Invalid scores'}), {
      status: 400,
    });
  } catch (error: any) {
    console.error('Error processing POST request:', error);
    return new Response(JSON.stringify({error}), {status: 500});
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try{
        const {searchParams} = new URL(req.url);
  const matchId = parseInt(searchParams.get('match-id') as string, 10);

  if (!matchId) {
    return NextResponse.json({message: 'error no match found'},{status:400});
  }

  // 1. player_match 테이블에서 matches_id === matchId인 데이터 가져오기
  const playersFromMatch = await query.get_player_by_match(matchId);

  // 2. 하나씩 is_winner가 true인지 확인
  // 3. true일 경우 해당 player의 승리수 -1 / (false일 경우 해당 player의 패배수 -1 && debt -5000)
  const playersPromises = playersFromMatch.rows.map((player: Player) => {
    if (player.is_winner) {
      return query.decrease_player_win(player.player_id);
    } else {
      return Promise.all([
        query.decrease_player_loss(player.player_id),
        query.decrease_player_debt(player.player_id),
      ]);
    }
  });
  await Promise.all(playersPromises);

  // 4. matches 테이블에서 id === matchId인 데이터 삭제
  const isDeleted = await query.delete_match(matchId);

  if (isDeleted.rowCount) {
    return NextResponse.json({message: 'success'},{status:200});
  } else {
    return NextResponse.json({message: 'error no match deleted'}, {status:400});    
  }
    }catch(error: any){
        console.error('Error processing DELETE request:', error);
        return NextResponse.json({message:'Internal server error'},{status:500});

    }
  
}

const checkPlayers = async (playerNames: string[]) => {
  const result = await query.check_players_by_name(playerNames);

  const existingPlayers = result.rows.map((row: {name: string}) => row.name);
  const missingPlayers = playerNames.filter(
    (name) => !existingPlayers.includes(name)
  );

  return {missingPlayers};
};

const handleMissingPlayers = async (missingPlayers: string[]) => {
  // DB에 존재하지 않는 선수가 있을 경우 추가
  const insertPromises = missingPlayers.map((playerName) =>
    query.insert_player(playerName)
  );
  await Promise.all(insertPromises);
};

const handlePlayerMatch = async (
  // 경기결과를 player 정보에 반영
  winnerTeam: string,
  matchId: number,
  player: {name: string; id: number},
  aTeam: string[],
  bTeam: string[]
) => {
  if (winnerTeam === 'A') {
    //A팀승리
    if (aTeam.includes(player.name)) {
      //player가 A팀에 속한 경우
      await query.insert_player_match('A', true, matchId, player.id);
      await query.update_player_win(player.id);
    } else {
      //player가 B팀에 속한 경우
      await query.insert_player_match('B', false, matchId, player.id);
      await query.update_player_loss(player.id);
    }
  } else {
    //B팀승리
    if (bTeam.includes(player.name)) {
      //player가 B팀에 속한 경우
      await query.insert_player_match('B', true, matchId, player.id);
      await query.update_player_win(player.id);
    } else {
      //player가 A팀에 속한 경우
      await query.insert_player_match('A', false, matchId, player.id);
      await query.update_player_loss(player.id);
    }
  }
};
