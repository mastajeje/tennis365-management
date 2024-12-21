import styles from '../styles/components.module.css'

interface ScoreInputProps {
    score?: number;
    handleScore?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: number;
    color?: string;
}

export default function ScoreInput({score, handleScore, value, color}:ScoreInputProps){
    return (
        <>
        {score !== undefined ? (
            <span className={styles.Score} style={{color}}>{score}</span>
          ) : (
            <input
              className={styles.ScoreInput}
              type="number"
              min="0"
              max="6"
              onChange={handleScore}
              value={value}
            />
          )}
          </>
    )
    }