const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER
    , host: process.env.DB_HOST
    , database: process.env.DB_NAME
    , password: process.env.DB_PASSWORD
    , port: process.env.DB_PORT
})

const query = {
    get_matches_by_date: (date: string) => 
        pool.query('SELECT player_match.matches_id, player_match.team, player_match.is_winner, matches.winner_team ,matches.a_score, matches.b_score,matches.time_added, player."name" FROM player_match join matches on player_match.matches_id = matches.id join player on player_match.player_id = player.id where matches.match_date = $1', [date]),
    get_match_dates:(year:number, month:number) => 
        pool.query('SELECT DISTINCT date FROM match_calendar where extract(year from Date) = $1 and extract(month from DATE) = $2 ORDER BY Date',[year, month]),
    insert_match_date:() => 
        pool.query('INSERT INTO match_calendar VALUES (NOW()) ON CONFLICT DO NOTHING'),
    post_match: (winnerTeam: string, aScore: number, bScore:number, matchDate:string) =>
        pool.query('INSERT INTO matches (winner_team, a_score, b_score, match_date) VALUES ($1, $2, $3, $4) RETURNING *', [winnerTeam, aScore, bScore, matchDate]),
    get_matched_players: (matchedPlayers: string[]) =>
        pool.query('SELECT * FROM get_matched_players($1)',[matchedPlayers]),

    insert_player_match: (team: string, isWinner: boolean, matches_id:number, player_id: number) =>
        pool.query('INSERT INTO player_match (team, is_winner, matches_id, player_id) VALUES ($1, $2, $3, $4) RETURNING *', [team, isWinner, matches_id, player_id]), 
    update_player_win: (player_id: number) => 
        pool.query('UPDATE player SET wins = wins + 1, participation = participation + 1 WHERE id = $1', [player_id]),

    update_player_loss: (player_id: number) => 
        pool.query('UPDATE player SET losses = losses + 1, participation = participation + 1, debt = debt + 5000 WHERE id = $1', [player_id]),
    check_players_by_name: (player_names: string[]) =>
        pool.query('SELECT player."name" FROM player WHERE player."name" = ANY($1)', [player_names]),
    insert_player: (player_name: string) =>
        pool.query('INSERT INTO player ("name") VALUES ($1)',[player_name])
}

module.exports = query;