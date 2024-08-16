'use client'

import styles from '../../styles/CalMain.module.css';
import MatchList from '../../../../../Components/MatchList';
import { useState } from 'react';
import { match } from 'assert';

type MatchData = {teamA: string[], teamB: string[], aTeamScore: number, bTeamScore: number};
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

const handleAddResult = () => {
    setIsAddingResult(true);
}

const endAddingResult = () => {
    setIsAddingResult(false);
}

const handleAddDummyData = (matchData: MatchData) => {
    setDummy([...dummy, matchData]);
}

  return (
    <div>
      <header className={styles.ResultsHeader}>
        <span>{date} 경기결과 페이지</span>
      </header>
      <div className="ResultsBody">
        <ul className={styles.MatchContainer}>
          {dummy.map((match) => {
            return (
              <MatchList
                key={match.teamA[0]}
                teamA={match.teamA}
                teamB={match.teamB}
                aTeamScore={match.aTeamScore}
                bTeamScore={match.bTeamScore}
              />
            );
          })}
          {/* <li className={styles.MatchList}>
            <div className={`${styles.col} ${styles.ATeam}`}>
              <h5>김정진</h5>
              <h5>박진아</h5>
            </div>  
            <div className={`${styles.col} ${styles.MatchScore}`}>
              <span>6</span>
              <span>VS</span>
              <span>4</span>
            </div>
            <div className={`${styles.col} ${styles.BTeam}`} >
              <h5>김승기</h5>
              <h5>박상미</h5>
            </div>
          </li> */}
        </ul>

        {isAddingResult ? 
            <MatchList isAddingResult={isAddingResult} endAddingResult={endAddingResult} handleAddDummy={handleAddDummyData}/>
         : 
         <button className={styles.AddResult} onClick={handleAddResult}>+ 경기결과 추가</button>}
      </div>
    </div>
  );
}
