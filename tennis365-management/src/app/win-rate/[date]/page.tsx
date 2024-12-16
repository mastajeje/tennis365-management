'use client';

import styles from '../styles/CalMain.module.css';
import MatchItem from '../../../components/MatchItem';
import {useEffect, useState} from 'react';
import Button from '@/components/Button';

type MatchData = {
  aTeam: string[];
  bTeam: string[];
  aScore: number;
  bScore: number;
  matchDate: string;
  winner: string;
};



    const buttonStyle: React.CSSProperties = {
        'width': '100%',
        'background': 'white',
        'border': '1px solid var(--primary-blue)',
        'borderRadius': '6px',
        'marginTop': '16px'
      };

export default function DailyResultPage({
  params: {date},
}: {
  params: {date: string};
}) {
  const [isAddingResult, setIsAddingResult] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData[]>([]);


  const fetchMatchData = async () => {
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
    fetchMatchData()
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
      <header className={styles.MatchResultsHeader}>
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
                matchID={matchID}
                aTeam={match.aTeam}
                bTeam={match.bTeam}
                aScore={match.aScore}
                bScore={match.bScore}
                fetchMatchData={fetchMatchData}
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
        //   <button className={styles.AddResult} onClick={handleAddResult}>
        //     + 경기결과 추가
        //   </button>
        <Button onClick={handleAddResult} text="+ 경기결과 추가" buttonColor='#1e74fd' style={buttonStyle}/>
        )}
      </div>
    </div>
  );
}
