import { NextResponse } from 'next/server';
import pool from '../../../../db';

export async function GET(req,res) {
    try{
        console.log(process.env.DB_PASSWORD);
        console.log(process.env.DB_USER);
        const result = await pool.query('SELECT * FROM player');
        // res.status(200).json(result.rows);
        return NextResponse.json(result.rows);
    } catch(error) {
        console.error('Error running query', error);
        res.status(500).json({error:'Internal Server Error'});
    }
}