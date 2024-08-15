//typescript props 예시
// **I는 interface 라는 뜻 
// interface IResultProps {
//     name: string;
//     score: number;
//     date: string;
// }

const dummyDate = [
    '2021-01-01',
    '2021-01-02',
    '2021-01-03',
    '2021-01-04',
    '2021-01-05',
]

import { Metadata } from 'next';
import styles from './styles/CalMain.module.css'
import DailyResult from '../../../Components/DailyResult';
export const metadata: Metadata = {
    title: "승률 계산기",
  };

// typescritp 예시
// export default function WinningPercentageCal({name, score, date: IResultProps}) {
export default function WinningPercentageCal() {
  return (
    <main className={styles.CalMain} >
        <header className={styles.CalMainHeader}>
        <h1>365 승률 계산기</h1>
        <div className="TargetDate">
            <span>2024년 8월</span>
        </div>
        </header>
        <div className="appBody">
            <ul>
                {dummyDate.map((date) => {
                    return (
                        <DailyResult key={date} matchDate={date}/>
                    )
                })}
            </ul>
        </div>

      

    </main>
  );
}
