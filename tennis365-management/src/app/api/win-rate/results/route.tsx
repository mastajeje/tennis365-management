import { IResultData } from "@/app/types/match";

const query = require('../../query');

export async function GET(req: Request, res: Response) {
  const {searchParams} = new URL(req.url);
  const isParticipationOver30 =(searchParams.get('is-over-30')) === 'true'; // convert string to boolean
 
  let queryResults

    if (isParticipationOver30) {
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

    return Response.json({is_success: true, results: resultsData}, {status: 200});
  }
}
