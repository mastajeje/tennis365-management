export interface IResultData {
  id: number;
  wins: number;
  losses: number;
  participation: number;
  name: string;
  win_rate: string;
  rankings: number;
  debt?: number;
}

export type DateObj = {
  year: number;
  month: number;
  day: number;
};

export type MatchData = {
  aTeam: string[];
  bTeam: string[];
  aScore: number;
  bScore: number;
  matchDate: string;
  winner: string;
};
