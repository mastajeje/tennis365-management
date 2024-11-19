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
import { useEffect, useState } from 'react';
import Modal from '../../../Components/Modal';
// export const metadata: Metadata = {
//     title: "승률 계산기",
//   };

// typescript 예시
// export default function WinningPercentageCal({name, score, date: IResultProps}) {
export default function WinningPercentageCal() {

    // 데이트 픽커를 적용하기전 임시조치
    const [targetYear, setTargetYear] = useState<number>(2024);
    const [targetMonth, setTargetMonth] = useState<number>(9);
    const [matchDates, setMatchDates] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    useEffect(() => {
        getMatchDates(targetYear, targetMonth);
    },[])

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
      const response = await fetch(`/api/win-rate/calendar?year=${year}&month=${month}`, {
        method: 'GET'
      });

      const data = await response.json();
      
       const dates = data.map((date: {date: string}) => date.date.split('T')[0]);
      setMatchDates(dates)
      if(!response.ok) throw new Error('Failed to add match')
    } catch (error) {
      console.error(error);
    }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const AddDateModalContent = () => {
        return (
            <div className={styles.AddDateModal}>
                <h2>날짜 추가</h2>
                <div >
                    <input type="number" name="matchYear"/>
                    <input type="number" name="matchMonth"/>
                    <input type="number" name="matchDay"/>
                </div>
                <div>
                    <button>추가</button>
                    <button onClick={() => setIsModalOpen(false)}>취소</button>
                </div>
            </div>
        )
    }

  return (
    <main className={styles.CalMain} >
        <header className={styles.CalMainHeader}>
        <h1>365 승률 계산기</h1>
        <div className="TargetDate">
            <div className="TargetYear">
                <input type="number" name='year' onChange={handleTargetDateChange} value={targetYear}/>
                <span>년</span>
            </div>
            <div className="TargetMonth">
                <input type="number" name='month' onChange={handleTargetDateChange}  value={targetMonth}/>
                <span>월</span>
                </div>
        </div>
        <div className="AddDateButton">
            <button onClick={handleOpenModal}>날짜 추가</button>
        </div>
        </header>
        <div className="appBody">
            <ul>
                {matchDates.map((date) => {
                
                    return (
                        <DailyResult key={date} matchDate={date}/>
                    )
                })}
            </ul>
        </div>

      <Modal open={isModalOpen} children={AddDateModalContent()}/>

    </main>
  );
}
