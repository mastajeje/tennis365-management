import styles from './styles/components.module.css'

interface IResultProps {
    teamA: string[];
    teamB: string[];
    aTeamScore: number;
    bTeamScore: number;
}

export default function DailyResult({teamA, teamB, aTeamScore, bTeamScore}: IResultProps) {
    return (
        <li className={styles.MatchList}>
        <div className={`${styles.col} ${styles.ATeam}`}>
          <h5>{teamA[0]}</h5>
          <h5>{teamA[1]}</h5>
        </div>  
        <div className={`${styles.col} ${styles.MatchScore}`}>
          <span>{aTeamScore}</span>
          <span>VS</span>
          <span>{bTeamScore}</span>
        </div>
        <div className={`${styles.col} ${styles.BTeam}`} >
          <h5>{teamB[0]}</h5>
          <h5>{teamB[1]}</h5>
        </div>
      </li>
    )
}