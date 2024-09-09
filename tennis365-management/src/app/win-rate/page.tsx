//typescript props 예시
// **I는 interface 라는 뜻 
// interface IResultProps {
//     name: string;
//     score: number;
//     date: string;
// }

'use client';

const dummyDate = [
    '2021-01-01',
    '2021-01-02',
    '2021-01-03',
    '2021-01-04',
    '2021-01-05',
]

// import { Metadata } from 'next';
import styles from './styles/CalMain.module.css'
import DailyResult from '../../../Components/DailyResult';
import { useState } from 'react';
// export const metadata: Metadata = {
//     title: "승률 계산기",
//   };

// typescript 예시
// export default function WinningPercentageCal({name, score, date: IResultProps}) {
export default function WinningPercentageCal() {

    // 데이트 픽커를 적용하기전 임시조치
    const [targetYear, setTargetYear] = useState<number>(2024);
    const [targetMonth, setTargetMonth] = useState<number>(9);

    const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if(name === 'year') {
            setTargetYear(parseInt(value));
            getMatchDates(parseInt(value), targetMonth);
        } else {
            setTargetMonth(parseInt(value));
            getMatchDates(targetYear, parseInt(value));
        }
    }

    const getMatchDates = async (year: number, month: number) => {
            try {
      const response = await fetch(`/api/win-rate?year=${targetYear}?month=${targetMonth}`, {
        method: 'GET'
      });
        console.log(response);

      if(!response.ok) throw new Error('Failed to add match')
    } catch (error) {
      console.error(error);
    }
    }

  return (
    <main className={styles.CalMain} >
        <header className={styles.CalMainHeader}>
        <h1>365 승률 계산기</h1>
        <div className="TargetDate">
            {/* <span>2024년 8월</span> */}
            <div className="TargetYear">
                <input type="number" name='year' onChange={handleTargetDateChange} value={targetYear}/>
                <span>년</span>
            </div>
            <div className="TargetMonth">
                <input type="number" name='month' onChange={handleTargetDateChange}  value={targetMonth}/>
                <span>월</span>
                </div>
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
