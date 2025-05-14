import { syncTimezone } from "../\butils";
import { supabase } from "./supabase"

const formatDate = (date: string) => {
    // Format the date as YYYY-MM-DD(postgresql format)
    const parsedDate = syncTimezone(new Date(date));
    return parsedDate.split('T')[0];
}

    export const getMatchesByDate = async (date:string) => {
        return supabase.from('player_match').select(`
            matches_id,
            team,
            is_winner,
            matches!inner(
                winner_team,
                a_score,
                b_score,
                time_added
                ),
                player!inner(
                name
                )
            `)
            .eq('matches.match_date', date)
    }

    export const checkMeetingDate = async (meetingDate: string) => {
        const {data, error } = await supabase
        .from('match_calendar')
        .select('date')
        .eq('date', meetingDate)
        .limit(1);
        if (error) {
            console.error('Error checking meeting date:', error);
            return {error};
        }
        const isMeetingDateExist = data.length > 0;
        return {data:{isMeetingDateExist},isSuccess:true};
    }

    export const selectMatchDates = async (year:number, month:number) => {
        const {data,error} = await supabase
        .from('match_calendar')
        .select('date')
        .filter('date', 'gte', `${year}-${month.toString().padStart(2, '0')}-01`)
        .filter('date', 'lt', month === 12 
          ? `${year + 1}-01-01`
          : `${year}-${(month + 1).toString().padStart(2, '0')}-01`)
        .order('date');

            if(error){
                console.error('Error fetching match dates:', error);
                return {error};
            }
            const meetingDates = data.map((match:{date:string}) =>{
      
                return match.date
            }
            );

            return {data:meetingDates,isSuccess:true};

    }

    export const insertMatchDate = async (newDate:string) => {
      if(!newDate){
        return {error:'No date provided'}
      }
        const formattedDate = formatDate(newDate);
 
        const {error} = await supabase
        .from('match_calendar')
        .upsert({date: formattedDate}, {onConflict: 'date', ignoreDuplicates: true})
      
        if (error) {
          console.error('Error inserting match date:', error);
          return {error};
        }
        return {isSuccess:true};
    }

    export const postMatch = async (winnerTeam:string, aScore:number, bScore:number, matchDate:string) => {
       console.log('matchDate:', matchDate);
        const {data, error} = await supabase
        .from('matches')
        .insert({
            winner_team: winnerTeam
            , a_score: aScore
            , b_score: bScore
            , match_date: matchDate
        })
        .select()

        if(error){
            console.error('Error inserting match:', error);
            return {error};
        }
        return {data, isSuccess:true};
    }

    export const checkPlayers = async (players:string[]) => {
        const {data, error} = await supabase
        .from('player')
        .select('name')
        .in('name', players);

        if(error){
            console.error('Error fetching players:', error);
            return {error};
        }

        //check for non-existing players
        const missingPlayers = players.filter(player => !data.some((p:{name:string}) => p.name === player));
        return {data:{missingPlayers}, isSuccess:true};
    }

    export const insertPlayer = async (playerName:string) => {
        const {data, error} = await supabase
        .from('player')
        .insert({name:playerName})
        .select()
        
        if(error){
            console.error('Error inserting player:', error);
            return {error};
        }
        return {data, isSuccess:true};
    }
    
    // export const insertMatchDate = async (newDate:string) => {
    //     const {data,error} = await supabase
    //     .from('match_calendar')
    //     .upsert(
    //         [{ date: newDate || new Date().toISOString() }],
    //         { onConflict: 'date', ignoreDuplicates: true }
    //       );

    //     if(error){
    //         console.error('Error inserting match date:', error);
    //         return {error};
    //     }
    // }