import SearchBar from '../SearchBar';
import styles from '../styles/components.module.css'
interface PlayerProps {
  team?: string[];
  index: number;
  handlePlayer: (e: React.ChangeEvent<HTMLInputElement>) => void;
  player: string;
  placeholder: string;
}

export default function Player({
  team,
  index,
  handlePlayer,
  player,
  placeholder,
}:PlayerProps) {
  return (
    <div className={styles.PlayerName}>
      {team ? (
        <h4>{team[index]}</h4>
      ) : (
        <SearchBar
          onSearch={handlePlayer}
          keyword={player}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
