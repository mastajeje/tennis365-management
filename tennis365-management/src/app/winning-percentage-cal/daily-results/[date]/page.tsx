'use client';

import styles from '../../styles/CalMain.module.css';
import MatchItem from '../../../../../Components/MatchItem';
import {useEffect, useState} from 'react';

type MatchData = {
  teamA: string[];
  teamB: string[];
  aTeamScore: number;
  bTeamScore: number;
};
const dummyMatchData = [
  {
    teamA: ['김정진', '박진아'],
    teamB: ['김승기', '박상미'],
    aTeamScore: 6,
    bTeamScore: 4,
  },
  {
    teamA: ['이원우', '최건'],
    teamB: ['김한결', '마민혁'],
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

  const handleAddDummyData = async (matchData: MatchData) => {
    // setDummy([...dummy, matchData]);
    try {
      const response = await fetch('/api/matches', {
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
                key={match.teamA[0]}
                teamA={match.teamA}
                teamB={match.teamB}
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
            handleAddDummy={handleAddDummyData}
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
