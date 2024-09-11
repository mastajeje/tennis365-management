'use client';

import styles from '../styles/CalMain.module.css';
import MatchItem from '../../../../Components/MatchItem';
import {useEffect, useState} from 'react';

type MatchData = {
  aTeam: string[];
  bTeam: string[];
  aTeamScore: number;
  bTeamScore: number;
  matchDate?: string;
};
const dummyMatchData = [
  {
    aTeam: ['김정진', '박진아'],
    bTeam: ['김승기', '박상미'],
    aTeamScore: 6,
    bTeamScore: 4,
  },
  {
    aTeam: ['이원우', '최건'],
    bTeam: ['김한결', '마민혁'],
    aTeamScore: 6,
    bTeamScore: 4,
  },
];

export default function DailyResultPage({
  params: {date},
}: {
  params: {date: string};
}) {
  const [isAddingResult, setIsAddingResult] = useState<boolean>(false);
  const [dummy, setDummy] = useState<MatchData[]>(dummyMatchData);
console.log(date)
useEffect(()=> {
    const fetchItems = async () => {
        try{
            const response = await fetch('')
        } catch (error){
            console.error(error)
        }
    }
})

  
  const handleAddResult = () => {
    setIsAddingResult(true);
  };

  const endAddingResult = () => {
    setIsAddingResult(false);
  };

  const handlePostMatch = async (matchData: MatchData) => {
    // setDummy([...dummy, matchData]);
    try {
      const response = await fetch('/api/win-rate/matches', {
        method: 'POST',
        body: JSON.stringify(matchData),
      });

      if(!response.ok) throw new Error('Failed to add match')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header className={styles.ResultsHeader}>
        <span>{date} 경기결과 페이지</span>
      </header>
      <div className="ResultsBody">
        <ul className={styles.MatchContainer}>
          {dummy.map((match) => {
            return (
              <MatchItem
                key={match.aTeam[0]}
                aTeam={match.aTeam}
                bTeam={match.bTeam}
                aTeamScore={match.aTeamScore}
                bTeamScore={match.bTeamScore}
              />
            );
          })}
        </ul>

        {isAddingResult ? (
          <MatchItem
            isAddingResult={isAddingResult}
            endAddingResult={endAddingResult}
            onPostMatch={handlePostMatch}
          />
        ) : (
          <button className={styles.AddResult} onClick={handleAddResult}>
            + 경기결과 추가
          </button>
        )}
      </div>
    </div>
  );
}
