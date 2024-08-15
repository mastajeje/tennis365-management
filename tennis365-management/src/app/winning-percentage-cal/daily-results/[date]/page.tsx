import styles from '../../styles/CalMain.module.css';
import MatchList from '../../../../../Components/MatchList';
const dummyMatchData = [
    {
        teamA: ['김정진', '박진아'],
        teamB: ['김승기', '박상미'],
        aTeamScore: 6,
        bTeamScore: 4,
    },
]

export default function DailyResultPage({
  params: {date},
}: {
  params: {date: string};
}) {
  console.log(date);
  return (
    <div>
      <header className={styles.ResultsHeader}>
        <span>{date} 경기결과 페이지</span>
      </header>
      <div className="ResultsBody">
        <ul className={styles.MatchContainer}>
        {dummyMatchData.map((match => {
            return (
                <MatchList key={match.teamA[0]} teamA={match.teamA} teamB={match.teamB} aTeamScore={match.aTeamScore} bTeamScore={match.bTeamScore}/>
            )
        }))}
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

        <button className={styles.AddResult}>+ 경기결과 추가</button>
      </div>
    </div>
  );
}
