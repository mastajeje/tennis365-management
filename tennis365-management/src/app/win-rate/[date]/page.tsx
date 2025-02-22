'use client';

import styles from '../styles/CalMain.module.css';
import MatchItem from '../../../components/MatchItem/MatchItem';
import {useEffect, useState} from 'react';
import Button from '@/components/Button';
import {PRIMARY_BLUE} from '@/app/constants';
import {fetchMatchData, postMatch} from '@/lib/api';
import {MatchData} from '@/app/types/match';

const buttonStyle: React.CSSProperties = {
  width: '100%',
  background: 'white',
  border: '1px solid var(--primary-blue)',
  borderRadius: '6px',
  marginTop: '16px',
};

export default function DailyResultPage({
  params: {date},
}: {
  params: {date: string};
}) {
  const [isAddingResult, setIsAddingResult] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<MatchData[]>([]);

  const updateMatchData = async (): Promise<void> => {
    try {
      const response = await fetchMatchData(date);

      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateMatchData();
  }, []);

  const handleAddResult = () => {
    setIsAddingResult(true);
  };

  const endAddingResult = () => {
    setIsAddingResult(false);
  };

  const handlePostMatch = async (newMatchData: MatchData): Promise<any> => {
    try {
      const response = await postMatch(newMatchData);

      if (response.ok) {
        const data = await response.json();
        const tempMatchID = data.matchID as number;

        setMatchData((prevMatchData) => {
          const updatedMatchData = {...prevMatchData};
          updatedMatchData[tempMatchID] = newMatchData;
          return updatedMatchData;
        });
      } else {
        throw new Error('Failed to add match');
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
          {matchData ? (
            <>
              {Object.entries(matchData)?.map(([matchID, match]) => {
                return (
                  <MatchItem
                    key={matchID}
                    matchID={matchID}
                    aTeam={match.aTeam}
                    bTeam={match.bTeam}
                    aScore={match.aScore}
                    bScore={match.bScore}
                    updateMatchData={updateMatchData}
                  />
                );
              })}
            </>
          ) : (
            <h1>경기결과가 없습니다.</h1>
          )}
        </ul>

        {isAddingResult ? (
          <MatchItem
            isAddingResult={isAddingResult}
            endAddingResult={endAddingResult}
            onPostMatch={handlePostMatch}
          />
        ) : (
          <Button
            onClick={handleAddResult}
            text="+ 경기결과 추가"
            buttonColor={PRIMARY_BLUE}
            style={buttonStyle}
          />
        )}
      </div>
      <div className={styles.Warning}>
        *선수 이름은 성까지 정확하게 입력해주세요!
      </div>
    </div>
  );
}
