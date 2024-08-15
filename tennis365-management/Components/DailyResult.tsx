import Link from "next/link";

interface DailyResultProps {
    matchDate: string;
}

export default function DailyResult({matchDate}: DailyResultProps) {

 

    return (
        <div className="DailyResult" >
            <Link href={`/winning-percentage-cal/daily-results/${matchDate}`}>{matchDate} 경기결과</Link>
        </div>
    )
}