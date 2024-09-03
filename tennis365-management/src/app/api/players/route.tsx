import {  NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface SearchResponse {
    url?: URL;
  }

export async function GET(req:Request) {
    // 검색어에 해당하는 선수 목록을 반환
    try{
        const { searchParams } = new URL(req.url);
        console.log(searchParams);
        console.log(searchParams.get('keyword'));
        return NextResponse.json({'message':'success'},{status:200});
      
    } catch(error:any) {
        console.error('Error running query', error);
        return new Response(JSON.stringify({error: error.message}), {status: 500})    }
}
