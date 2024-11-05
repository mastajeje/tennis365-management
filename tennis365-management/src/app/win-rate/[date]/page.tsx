'use client';

import styles from '../styles/CalMain.module.css';
import MatchItem from '../../../../Components/MatchItem';
import {useEffect, useState} from 'react';

type MatchData = {
  aTeam: string[];
  bTeam: string[];
  aScore: number;
  bScore: number;
  matchDate: string;
  winner: string;
};



// const dummyMatchData = [
//   {
//     aTeam: ['김정진', '박진아'],
//     bTeam: ['김승기', '박상미'],
//     aScore: 6,
//     bScore: 4,
//   },
//   {
//     aTeam: ['이원우', '최건'],
//     bTeam: ['김한결', '마민혁'],
//     aScore: 6,
//     bScore: 4,
//   },
// ];

export default function DailyResultPage({
  params: {date},
}: {
  params: {date: string};
}) {
  const [isAddingResult, setIsAddingResult] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData[]>([]);


  const fetchItems = async () => {
    try{

        const response = await fetch(`/api/win-rate/matches?date=${date}`,{
            method: 'GET'
        })

        const data= await response.json();
        setMatchData(data);
    } catch (error){
        console.error(error)
    }
}


useEffect(()=> {

    fetchItems()
},[])

  
  const handleAddResult = () => {
    setIsAddingResult(true);
  };

  const endAddingResult = () => {
    setIsAddingResult(false);
  };

  const handlePostMatch = async (newMatchData: MatchData):Promise<any> => {

    try {
      const response = await fetch('/api/win-rate/matches', {
        method: 'POST',
        body: JSON.stringify(newMatchData),
      });
   
      if(response.ok) {
        const data = await response.json();
        const tempMatchID = data.matchID as number;
        // 
        setMatchData(prevMatchData => {
            const updatedMatchData = {...prevMatchData};
            updatedMatchData[tempMatchID] = newMatchData
            return updatedMatchData;
        });
      }else{
        throw new Error('Failed to add match')
      }
    
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
          {
          matchData ? 
          <>
          {
          
          (Object.entries(matchData))?.map(([matchID,match]) => {
            return (
              <MatchItem
                key={matchID}
                aTeam={match.aTeam}
                bTeam={match.bTeam}
                aScore={match.aScore}
                bScore={match.bScore}
              />
            );
          })} 
          </>
          : <h1>경기결과가 없습니다.</h1>}
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
