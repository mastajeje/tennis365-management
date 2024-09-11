'use client'
import {useEffect, useState} from 'react';
import styles from './styles/components.module.css';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import path from 'path';

type MatchData = {aTeam: string[], bTeam: string[], aTeamScore: number, bTeamScore: number, matchDate: string};

interface IResultProps {
  aTeam?: string[];
  bTeam?: string[];
  aTeamScore?: number;
  bTeamScore?: number;
  isAddingResult?: boolean;
  matchDate?: string;
  endAddingResult?: () => void;
  onPostMatch?: (matchData: MatchData) => void;
}

export default function DailyResult({
  aTeam,
  bTeam,
  aTeamScore,
  bTeamScore,
  isAddingResult,
  endAddingResult,
  onPostMatch
}: IResultProps) {
    const pathname = usePathname();
  const [playerA1, setPlayerA1] = useState<string>('');
  const [playerA2, setPlayerA2] = useState<string>('');
  const [playerB1, setPlayerB1] = useState<string>('');
  const [playerB2, setPlayerB2] = useState<string>('');
  const [scoreA, setScoreA] = useState<number>();
  const [scoreB, setScoreB] = useState<number>();

//   const {date} = router.query;
const matchDate = pathname.split('/')[2];
  
  const MAX_SCORE = 6;
  
  useEffect(() => {
    // 매치 정보 초기화
    if (aTeam) {
      setPlayerA1(aTeam[0]);
      setPlayerA2(aTeam[1]);
    }
    if (bTeam) {
      setPlayerB1(bTeam[0]);
      setPlayerB2(bTeam[1]);
    }
    if (aTeamScore) {
      setScoreA(aTeamScore);
    }
    if (bTeamScore) {
      setScoreB(bTeamScore);
    }

    // return () => {
    //     setPlayerA1('');
    //     setPlayerA2('');
    //     setPlayerB1('');
    //     setPlayerB2('');
    //     setScoreA(0);
    //     setScoreB(0);
    // }
  }, []);

  const handlePlayerA1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerA1(e.target.value);
  }
    const handlePlayerA2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerA2(e.target.value);
    }
    const handlePlayerB1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerB1(e.target.value);
    }
    const handlePlayerB2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayerB2(e.target.value);
    }

    const handleScoreA = (e: React.ChangeEvent<HTMLInputElement>) => {
        const score = Number(e.target.value);
        if(score > 6) {
            setScoreA(6);
            return;
        } else if(score < 0) {
            setScoreA(0);
            return;
        }
  
        setScoreA(score);
    }

    const handleScoreB = (e: React.ChangeEvent<HTMLInputElement>) => {
        const score = Number(e.target.value);
        if(score > 6) {
            setScoreB(6);
            return;
        } else if(score < 0) {
            setScoreB(0);
            return;
        }
  
        setScoreB(score);
    }

    const handleAddResult = () => {
        if(scoreA !== MAX_SCORE && scoreB !== MAX_SCORE || scoreA === scoreB) {
            console.log(MAX_SCORE,scoreA,scoreB)
            alert(`한 팀이 ${MAX_SCORE}점을 얻어야 합니다.`);
            return;
        }
        if(onPostMatch && endAddingResult && playerA1 !== '' && playerA2 !== '' && playerB1 !== '' && playerB2 !== '' && scoreA && scoreB) {
              onPostMatch({
                aTeam: [playerA1, playerA2],
                bTeam: [playerB1,playerB2],
                aTeamScore: scoreA,
                bTeamScore: scoreB,
                matchDate
              });

              endAddingResult()
        } else {
            alert('빈칸을 채워주세요');
        }
 
    }

  return (
    <li className={styles.MatchItem} onClick={()=> {
        console.log(playerA1, playerA2, playerB1, playerB2, scoreA, scoreB);
    }}>
      <div className={`${styles.col} ${styles.ATeam}`}>
        <div className={styles.PlayerName}>
          {aTeam ? (
            <h5>{aTeam[0]}</h5>
          ) : (
            // <input
            //   type="text"
            //   placeholder="선수1"
            //   onChange={handlePlayerA1}
            //   value={playerA1}
            // />
            <SearchBar onSearch={handlePlayerA1} keyword={playerA1} placeholder={"선수1"}/>
          )}
        </div>
        <div className={styles.PlayerName}>
          {aTeam ? (
            <h5>{aTeam[1]}</h5>
          ) : (
            // <input
            //   type="text"
            //   placeholder="선수2"
            //   onChange={handlePlayerA2}
            //   value={playerA2}
            // />
            <SearchBar onSearch={handlePlayerA2} keyword={playerA2} placeholder={"선수2"}/>
          )}
        </div>
      </div>
      <div className={`${styles.col} ${styles.MatchScore}`}>
        <div>{aTeamScore ? (
          <span>{aTeamScore}</span>
        ) : (
          <input className={styles.ScoreInput} type="number" min="0" max="6" 
          onChange={handleScoreA}
          value={scoreA}/>
        )}
        <span> VS </span>
        {bTeamScore ? (
          <span>{bTeamScore}</span>
        ) : (
          <input className={styles.ScoreInput} type="number" min="0" max="6" onChange={handleScoreB}
          value={scoreB}/>
        )}
        </div>
        {isAddingResult ? <div className={styles.ConfirmButtons}>
            <button onClick={endAddingResult}>취소</button>
            <button onClick={handleAddResult}>확인</button>
        </div> : null}
      </div>
      <div className={`${styles.col} ${styles.BTeam}`}>
        <div className={styles.PlayerName}>
          {bTeam ? (
            <h5>{bTeam[0]}</h5>
          ) : (
            // <input
            //   type="text"
            //   placeholder="선수1"
            //   onChange={handlePlayerB1}
            //   value={playerB1}
            // />
            <SearchBar onSearch={handlePlayerB1} keyword={playerB1} placeholder={"선수1"}/>
          )}
        </div>
        <div className={styles.PlayerName}>
          {bTeam ? (
            <h5>{bTeam[1]}</h5>
          ) : (
            // <input
            //   type="text"
            //   placeholder="선수2"
            //   onChange={handlePlayerB2}
            //   value={playerB2}
            // />
            <SearchBar onSearch={handlePlayerB2} keyword={playerB2} placeholder={"선수2"}/>)}
        </div>
      </div>
    </li>
  );
}
