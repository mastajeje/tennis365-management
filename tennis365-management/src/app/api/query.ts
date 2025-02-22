const {Pool} = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const query = {
  get_matches_by_date: (date: string) =>
    pool.query(
      'SELECT player_match.matches_id, player_match.team, player_match.is_winner, matches.winner_team ,matches.a_score, matches.b_score,matches.time_added, player."name" FROM player_match join matches on player_match.matches_id = matches.id join player on player_match.player_id = player.id where matches.match_date = $1',
      [date]
    ),
  check_meeting_date: (meetingDate: string) =>
    pool.query('SELECT EXISTS (SELECT 1 FROM match_calendar WHERE date= $1)', [
      meetingDate,
    ]),
  get_match_dates: (year: number, month: number) =>
    pool.query(
      'SELECT DISTINCT date FROM match_calendar where extract(year from Date) = $1 and extract(month from DATE) = $2 ORDER BY Date',
      [year, month]
    ),
  insert_match_date: (newDate: string) => {
    if (!newDate) {
      return pool.query(
        'INSERT INTO match_calendar VALUES (NOW()) ON CONFLICT DO NOTHING'
      );
    } else {
      return pool.query(
        'INSERT INTO match_calendar VALUES ($1) ON CONFLICT DO NOTHING',
        [newDate]
      );
    }
  },
  post_match: (
    winnerTeam: string,
    aScore: number,
    bScore: number,
    matchDate: string
  ) =>
    pool.query(
      'INSERT INTO matches (winner_team, a_score, b_score, match_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [winnerTeam, aScore, bScore, matchDate]
    ),
  get_matched_players: (matchedPlayers: string[]) =>
    pool.query('SELECT * FROM get_matched_players($1)', [matchedPlayers]),

  insert_player_match: (
    team: string,
    isWinner: boolean,
    matches_id: number,
    player_id: number
  ) =>
    pool.query(
      'INSERT INTO player_match (team, is_winner, matches_id, player_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [team, isWinner, matches_id, player_id]
    ),
  update_player_win: (player_id: number) =>
    pool.query(
      'UPDATE player SET wins = wins + 1, participation = participation + 1 WHERE id = $1',
      [player_id]
    ),
  update_player_loss: (player_id: number) =>
    pool.query(
      'UPDATE player SET losses = losses + 1, participation = participation + 1, debt = debt + 5000 WHERE id = $1',
      [player_id]
    ),
  decrease_player_win: (playerId: number) =>
    pool.query(
      'UPDATE player SET wins = wins - 1, participation = participation -1 WHERE id = $1',
      [playerId]
    ),
  decrease_player_loss: (playerId: number) =>
    pool.query(
      'UPDATE player SET losses = losses - 1, participation = participation -1 WHERE id = $1',
      [playerId]
    ),
  decrease_player_debt: (playerId: number) =>
    pool.query('UPDATE player SET debt = debt - 5000 WHERE id = $1', [
      playerId,
    ]),
  check_players_by_name: (player_names: string[]) =>
    pool.query(
      'SELECT player."name" FROM player WHERE player."name" = ANY($1)',
      [player_names]
    ),
  insert_player: (player_name: string) =>
    pool.query('INSERT INTO player ("name") VALUES ($1)', [player_name]),
  get_player_by_match: (matchId: number) =>
    pool.query('SELECT * FROM player_match WHERE matches_id = $1', [matchId]),
  delete_match: (matchId: number) =>
    pool.query('DELETE FROM matches WHERE id = $1', [matchId]),
  get_results: () => pool.query('SELECT *, CASE WHEN participation > 0 then ROUND((wins::float / participation * 100)::NUMERIC, 2)  ELSE 0 END AS win_rate FROM player'),
  get_results_over_30: () => pool.query('SELECT id, wins, losses, participation, player."name", CASE WHEN participation > 0 then ROUND((wins::float / participation * 100)::NUMERIC, 2)  ELSE 0 END AS win_rate  FROM player WHERE participation >= 30 order by win_rate desc'),
};

module.exports = query;
