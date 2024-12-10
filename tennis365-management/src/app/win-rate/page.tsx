//typescript props 예시
// **I는 interface 라는 뜻
// interface IResultProps {
//     name: string;
//     score: number;
//     date: string;
// }

'use client';

// import { Metadata } from 'next';
import styles from './styles/CalMain.module.css';
import DailyResult from '../../../Components/DailyResult';
import {useEffect, useState} from 'react';
import Modal from '../../../Components/Modal';
// export const metadata: Metadata = {
//     title: "승률 계산기",
//   };

type DateObj = {
  year: number;
  month: number;
  day: number;
};

// typescript 예시
// export default function WinningPercentageCal({name, score, date: IResultProps}) {
export default function WinningPercentageCal() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // 데이트 픽커를 적용하기전 임시조치
  const [targetYear, setTargetYear] = useState<number>(currentYear);
  const [targetMonth, setTargetMonth] = useState<number>(currentMonth);
  const [matchDates, setMatchDates] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newMatchDateObj, setNewMatchDateObj] = useState<DateObj>({
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  });

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  }

  useEffect(() => {
    getMatchDates(targetYear, targetMonth);
  }, []);

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'year') {
      setTargetYear(parseInt(value));
      getMatchDates(parseInt(value), targetMonth);
    } else {
      setTargetMonth(parseInt(value));
      getMatchDates(targetYear, parseInt(value));
    }
  };

  const getMatchDates = async (year: number, month: number) => {
    try {
      const response = await fetch(
        `/api/win-rate/calendar?year=${year}&month=${month}`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();
      console.log(data)
      const meetingDates = data.map((meetingDate : string) => meetingDate.split('T')[0]);
      setMatchDates(meetingDates);
      if (!response.ok) throw new Error('Failed to add match');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleNewMatchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const daysInMonth = getDaysInMonth(newMatchDateObj.year, newMatchDateObj.month);
    const limitedValue = value.slice(0, name === 'year' ? 4 : 2); // Limit year to 4 digits, month and day to 2 digits

    if(name === 'month' && parseInt(limitedValue) > 12 || parseInt(limitedValue) === 0) return;
    if(name === 'day' && parseInt(limitedValue) > daysInMonth || parseInt(limitedValue) === 0) return;
   
    setNewMatchDateObj((prevState) => ({
      ...prevState,
      [name]: limitedValue  ? parseInt(limitedValue, 10) : "" , // Prevent NaN as value
    }));
  };

  const handleAddNewMeetingDate = async () => {
    const {year, month, day} = newMatchDateObj;
     const response = await fetch('/api/win-rate/calendar', {
        method: 'POST',
        body: JSON.stringify({meetingDate: `${year}-${month}-${day}`}),
    })
    if(response.ok) {
        setMatchDates(prevMatchDates => [...prevMatchDates, `${year}-${month}-${day}`]);
        setTargetYear(year);
        setTargetMonth(month);
        setIsModalOpen(false);
        getMatchDates(year, month);
    }
  }

  const AddDateModalContent = () => {
    return (
      <div className={styles.AddDateModal}>
        <h2>날짜 추가</h2>
        <div className={styles.AddDateInputBox}>
          <input
            type="number"
            min="2000"
            max="3000"
            value={newMatchDateObj.year}
            name="year"
            onChange={handleNewMatchDateChange}
          />
          <input
            type="number"
            min="1"
            max="12"
            value={newMatchDateObj.month}
            name="month"
            onChange={handleNewMatchDateChange}
          />
          <input
            type="number"
            min="1"
            max='31'
            value={newMatchDateObj.day}
            name="day"
            onChange={handleNewMatchDateChange}
          />
        </div>
        <div>
          <button onClick={handleAddNewMeetingDate}>추가</button>
          <button onClick={() => {
            setNewMatchDateObj({
                year: currentYear,
                month: currentMonth,
                day: currentDay,
              })
            setIsModalOpen(false)}}>취소</button>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.CalMain}>
      <header className={styles.CalMainHeader}>
        <h1>365 승률 계산기</h1>
        <div className="TargetDate">
          <div className="TargetYear">
            <input
              type="number"
              name="year"
              onChange={handleTargetDateChange}
              value={targetYear}
            />
            <span>년</span>
          </div>
          <div className="TargetMonth">
            <input
              type="number"
              name="month"
              onChange={handleTargetDateChange}
              value={targetMonth}
            />
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
            return <DailyResult key={date} matchDate={date} />;
          })}
        </ul>
      </div>

      {isModalOpen && <Modal open={isModalOpen} children={AddDateModalContent()} />}
    </main>
  );
}
