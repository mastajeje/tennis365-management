import Link from "next/link";
import styles from './styles/components.module.css'
interface DailyResultProps {
    matchDate: string;
}

export default function DailyResult({matchDate}: DailyResultProps) {
    return (
        <div className={styles.MeetingDay} >
            <Link href={`/win-rate/${matchDate}`}>{matchDate} 경기결과</Link>
        </div>
    )
}