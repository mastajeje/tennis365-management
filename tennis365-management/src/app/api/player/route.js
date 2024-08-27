import { NextResponse } from 'next/server';
import pool from '../../../../db';

export async function GET(req,res) {
    try{
        const result = await pool.query('SELECT * FROM player');
   
        return NextResponse.json(result.rows);
    } catch(error) {
        console.error('Error running query', error);
        res.status(500).json({error:'Internal Server Error'});
    }
}