import { IResultData } from "@/app/types/match";
import { NextResponse } from "next/server";

const query = require('../../query');

export async function GET(req: Request) {
try{
    const {searchParams} = new URL(req.url);
    const isParticipationOver30 =(searchParams.get('is-over-30')) === 'true'; // convert string to boolean
    let queryResults
  
      if (isParticipationOver30) {
        // FIXME: 30경기 이상 참가자 없는 경우 처리
          queryResults = await query.get_results_over_30();
      } else {
          queryResults = await query.get_results();
      }
  
    if (queryResults.rows.length > 0) {
      const resultsData:IResultData[] = queryResults.rows;
  
      if(isParticipationOver30){
          resultsData.forEach((result:IResultData, index:number) => {
              result.rankings = index + 1;
          }
          )
      } else {
          resultsData.sort((a:IResultData, b:IResultData) => a.name > b.name ? 1: -1)
      }
  
      return NextResponse.json({is_success: true, results: resultsData}, {status: 200});
    } else {
        // No results found
        return NextResponse.json({ results:[], is_success: true}, { status: 200 });

    }


} catch(error){
    console.error('Error fetching results:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

}

}
