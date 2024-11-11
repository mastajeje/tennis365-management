'use client';
import {useEffect, useState} from 'react';
import styles from './styles/components.module.css';
import SearchBar from './SearchBar';
import {usePathname} from 'next/navigation';
import Button from './Button';

type MatchData = {
  aTeam: string[];
  bTeam: string[];
  aScore: number;
  bScore: number;
  matchDate: string;
  winner: string;
};



interface IResultProps {
  aTeam?: string[];
  bTeam?: string[];
  aScore?: number;
  bScore?: number;
  isAddingResult?: boolean;
  matchDate?: string;
  endAddingResult?: () => void;
  onPostMatch?: (matchData: MatchData) => Promise<any>;
}

const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    marginLeft: '10px',
    };

export default function MatchItem({
  aTeam,
  bTeam,
  aScore,
  bScore,
  isAddingResult,
  endAddingResult,
  onPostMatch,
}: IResultProps) {
  const pathname = usePathname();
  const [playerA1, setPlayerA1] = useState<string>('');
  const [playerA2, setPlayerA2] = useState<string>('');
  const [playerB1, setPlayerB1] = useState<string>('');
  const [playerB2, setPlayerB2] = useState<string>('');
  const [scoreA, setScoreA] = useState<number>(0);
  const [scoreB, setScoreB] = useState<number>(0);

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
    if (aScore) {
      setScoreA(aScore);
    }
    if (bScore) {
      setScoreB(bScore);
    }

  }, []);

  const handlePlayerA1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerA1(e.target.value);
  };
  const handlePlayerA2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerA2(e.target.value);
  };
  const handlePlayerB1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerB1(e.target.value);
  };
  const handlePlayerB2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerB2(e.target.value);
  };

  const handleScoreA = (e: React.ChangeEvent<HTMLInputElement>) => {
    const score = Number(e.target.value);
    if (score > 6) {
      setScoreA(6);
      return;
    } else if (score < 0) {
      setScoreA(0);
      return;
    }

    setScoreA(score);
  };

  const handleScoreB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const score = Number(e.target.value);
    if (score > 6) {
      setScoreB(6);
      return;
    } else if (score < 0) {
      setScoreB(0);
      return;
    }

    setScoreB(score);
  };

  const handleAddResult = () => {
    if ((scoreA !== MAX_SCORE && scoreB !== MAX_SCORE) || scoreA === scoreB) {
      alert(`한 팀이 ${MAX_SCORE}점을 얻어야 합니다.`);
      return;
    }
    if (
      onPostMatch &&
      endAddingResult &&
      playerA1 !== '' &&
      playerA2 !== '' &&
      playerB1 !== '' &&
      playerB2 !== '' &&
      scoreA >= 0 &&
      scoreB >= 0
    ) {
      onPostMatch({
        aTeam: [playerA1, playerA2],
        bTeam: [playerB1, playerB2],
        aScore: scoreA,
        bScore: scoreB,
        matchDate,
        winner: scoreA > scoreB ? 'A' : 'B',
      });

      endAddingResult();
    } else {
      alert('빈칸을 채워주세요');
    }
  };

  return (
    <li
      className={styles.MatchItem}
    >
      <div className={`${styles.col} ${styles.ATeam}`}>
        <div className={styles.PlayerName}>
          {aTeam ? (
            <h5>{aTeam[0]}</h5>
          ) : (
            <SearchBar
              onSearch={handlePlayerA1}
              keyword={playerA1}
              placeholder={'선수1'}
            />
          )}
        </div>
        <div className={styles.PlayerName}>
          {aTeam ? (
            <h5>{aTeam[1]}</h5>
          ) : (
            <SearchBar
              onSearch={handlePlayerA2}
              keyword={playerA2}
              placeholder={'선수2'}
            />
          )}
        </div>
      </div>
      <div className={`${styles.col} ${styles.MatchScore}`}>
        <div>
          {aScore !== undefined ? (
            <span>{aScore}</span>
          ) : (
            <input
              className={styles.ScoreInput}
              type="number"
              min="0"
              max="6"
              onChange={handleScoreA}
              value={scoreA}
            />
          )}
          <span> VS </span>
          {bScore !== undefined ? (
            <span>{bScore}</span>
          ) : (
            <input
              className={styles.ScoreInput}
              type="number"
              min="0"
              max="6"
              onChange={handleScoreB}
              value={scoreB}
            />
          )}
          <Button text={'삭제'} onClick={()=>{}} style={buttonStyle}/>
        </div>
        {isAddingResult ? (
          <div className={styles.ConfirmButtons}>
            <button onClick={endAddingResult}>취소</button>
            <button onClick={handleAddResult}>확인</button>
          </div>
        ) : null}
        
      </div>
      <div className={`${styles.col} ${styles.BTeam}`}>
        <div className={styles.PlayerName}>
          {bTeam ? (
            <h5>{bTeam[0]}</h5>
          ) : (

            <SearchBar
              onSearch={handlePlayerB1}
              keyword={playerB1}
              placeholder={'선수1'}
            />
          )}
        </div>
        <div className={styles.PlayerName}>
          {bTeam ? (
            <h5>{bTeam[1]}</h5>
          ) : (
            <SearchBar
              onSearch={handlePlayerB2}
              keyword={playerB2}
              placeholder={'선수2'}
            />
          )}
        </div>
      </div>
    </li>
  );
}
