const query = require('../../query');

interface MeetingDate {
    date: any;
}

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    if(year && month){
        // to sync with current timezone
        const timezoneOffset = new Date().getTimezoneOffset() * 60000;

        const matches = await query.get_match_dates(parseInt(year,10), parseInt(month,10));
        const meetingDates = matches.rows.map((match:MeetingDate) => new Date(match.date - timezoneOffset).toISOString())
        return Response.json(meetingDates)
    }  else {
        return Response.json({'message':'error no data found'})
    }
}

export async function POST(req:Request){
  const data = await req.json();
  const {meetingDate} : {meetingDate:string} = data;

  const addedMeetingDate = await query.insert_match_date(meetingDate);
  
  if(addedMeetingDate.rowCount === 1){
      return Response.json({'message':'success'},{status:200});
  } else {
    return Response.json({'message':'error - date could not be added'},{status:500});
  }

}