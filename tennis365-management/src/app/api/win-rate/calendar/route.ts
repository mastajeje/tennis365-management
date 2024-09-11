const query = require('../../query');

export async function GET(req:Request, res:Response){
    const {searchParams} = new URL(req.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    if(year && month){
     
        const matches = await query.get_match_dates(parseInt(year,10), parseInt(month,10));
        return Response.json(matches.rows)
    }  else {
        return Response.json({'message':'error no data found'})
    }
}