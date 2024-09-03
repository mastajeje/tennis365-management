const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER
    , host: process.env.DB_HOST
    , database: process.env.DB_NAME
    , password: process.env.DB_PASSWORD
    , port: process.env.DB_PORT
})

const query = {
    post_match: (winnerTeam: string, aTeamScore: number, bTeamScore:number) =>
        pool.query('INSERT INTO matches (winner_team, a_score, b_score) VALUES ($1, $2, $3) RETURNING *', [winnerTeam, aTeamScore, bTeamScore]),

    get_matched_players: (matchedPlayers: string[]) =>
        pool.query('SELECT * FROM get_matched_players($1)',[matchedPlayers]),

    insert_player_match: (team: string, isWinner: boolean, matches_id:number, player_id: number) =>
        pool.query('INSERT INTO player_match (team, is_winner, matches_id, player_id) VALUES ($1, $2, $3, $4) RETURNING *', [team, isWinner, matches_id, player_id]), 
    update_player_win: (player_id: number) => 
        pool.query('UPDATE player SET wins = wins + 1, participation = participation + 1 WHERE id = $1', [player_id]),

    update_player_loss: (player_id: number) => 
        pool.query('UPDATE player SET losses = losses + 1, participation = participation + 1, debt = debt + 5000 WHERE id = $1', [player_id])

}

module.exports = query;