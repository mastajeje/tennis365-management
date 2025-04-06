import { syncTimezone } from "@/lib/\butils";
import { checkMeetingDate, insertMatchDate } from "@/lib/supabase/query";

const query = require('../../query');

interface MeetingDate {
  date: any;
}

// const syncTimezone = (date: Date) => {
//         // to sync with current timezone(multiplied by 60000 to convert to milliseconds)
//     const timezoneOffset = date.getTimezoneOffset() * 60000;
//     return new Date(date.getTime() - timezoneOffset).toISOString();
//     }

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const year = searchParams.get('year');
  const month = searchParams.get('month');
  if (year && month) {

    const matches = await query.get_match_dates(
      parseInt(year, 10),
      parseInt(month, 10)
    );
    const meetingDates = matches.rows.map((match: MeetingDate) =>
    syncTimezone(match.date)
    );
    return Response.json(meetingDates);
  } else {
    return Response.json({message: 'error no data found'});
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const {meetingDate}: {meetingDate: string} = body;
//   const checkMeetingDate = await query.check_meeting_date(meetingDate);
const {data,error} = await checkMeetingDate(meetingDate);
    if (error) {
        console.error('Error checking meeting date:', error);
        return Response.json({error});
    }

    const isMeetingDateExist = data?.isMeetingDateExist;

  if (isMeetingDateExist)
    return Response.json(
      {is_success: false, message: 'error - date already exists'}
    );

  const {isSuccess} = await insertMatchDate(meetingDate);
  if (isSuccess) {
    return Response.json({is_success: true}, {status: 200});
  } else {
    return Response.json({
      is_success: false,
      message: 'error - date could not be added',
    });
  }
}
