import {DateObj, IResultData, MatchData} from '@/app/types/match';

export const getResults = async (isParticipationOver30: boolean) => {
  const response = await fetch(
    `/api/win-rate/results?is-over-30=${isParticipationOver30}`
  );
  if (!response.ok) return;
  const results = await response.json();

  if (results.is_success) {
    const resultsData = results.results;
    resultsData.forEach((result: IResultData) => {
      if (!result.win_rate) return;
      result.win_rate = `${result.win_rate}%`;
    });

    return results.results;
  }
};

export const validatePassword = async (password: string) => {
  const response = await fetch('/api/validate', {
    method: 'POST',
    body: JSON.stringify({password}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const fetchMatchDate = async (year: number, month: number) => {
  const response = await fetch(
    `/api/win-rate/calendar?year=${year}&month=${month}`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const postNewMeetingDate = async (meetingDateObj: DateObj) => {
  const {year, month, day} = meetingDateObj;

  const response = await fetch('/api/win-rate/calendar', {
    method: 'POST',
    body: JSON.stringify({meetingDate: `${year}-${month}-${day}`}),
  });

  return response;
};

export const fetchMatchData = async (date: string) => {
  const response = await fetch(`/api/win-rate/matches?date=${date}`, {
    method: 'GET',
  });

  return response;
};


export const deleteMatchData = async (matchID:string) => {
    const response = await fetch(
        `/api/win-rate/matches?match-id=${matchID}`,
        {
          method: 'DELETE',
        }
      );

      return response
}

export const postMatch = async (newMatchData:MatchData) => {
    const response = await fetch('/api/win-rate/matches', {
        method: 'POST',
        body: JSON.stringify(newMatchData),
      });

      return response
}