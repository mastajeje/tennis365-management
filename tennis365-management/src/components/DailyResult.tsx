import Link from "next/link";
import styles from './styles/components.module.css'
interface DailyResultProps {
    matchDate: string;
    matchDay:string;
}

export default function DailyResult({matchDate, matchDay}: DailyResultProps) {
    return (
        <div className={styles.MeetingDay} >
            <Link href={`/win-rate/${matchDate}`}>{`${matchDate} (${matchDay})  경기결과`}</Link>
        </div>
    )
}