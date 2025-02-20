'use client';

import styles from '../../styles/PageSections.module.css';
import DailyResult from '@/components/DailyResult';
import Modal from '@/components/Modal';
import {useEffect, useState} from 'react';
import {useAuth} from '@/app/context/AuthContext';
import AddDateModal from '../ModalContents/AddDateModal';
import {getDayOfWeek, processDateInput} from '@/lib/\butils';
import {DateObj} from '@/app/types/match';
import {fetchMatchDate, postNewMeetingDate} from '@/lib/api';
import DateSelector from '../DateSelector';

// type DateObj = {
//   year: number;
//   month: number;
//   day: number;
// };

export interface PostNewMeetingDateResponse {
  is_success: boolean;
}

export default function WinningPercentageCal() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const {isAuthenticated} = useAuth();

  const [targetYear, setTargetYear] = useState<number>(currentYear);
  const [targetMonth, setTargetMonth] = useState<number>(currentMonth);
  const [matchDates, setMatchDates] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newMatchDateObj, setNewMatchDateObj] = useState<DateObj>({
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  });

  useEffect(() => {
    getMatchDates(targetYear, targetMonth);
  }, []);

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const limitedValue = processDateInput(value, name, newMatchDateObj);
    if (limitedValue === undefined) return;

    if (name === 'year') {
      setTargetYear(limitedValue ? parseInt(limitedValue) : 0);
      getMatchDates(parseInt(limitedValue), targetMonth);
    } else {
      setTargetMonth(limitedValue ? parseInt(limitedValue) : 0);
      getMatchDates(targetYear, parseInt(limitedValue));
    }
  };

  const getMatchDates = async (year: number, month: number) => {
    try {
      const response = await fetchMatchDate(year, month);

      const data = await response.json();
      const meetingDates = data.map(
        (meetingDate: string) => meetingDate.split('T')[0]
      );
      setMatchDates(meetingDates);
      if (!response.ok) throw new Error('Failed to add match');
    } catch (error) {
      console.error('Failed to add new meeting date', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleNewMatchDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    const limitedValue = processDateInput(value, name, newMatchDateObj);

    setNewMatchDateObj((prevState) => ({
      ...prevState,
      [name]: limitedValue ? parseInt(limitedValue, 10) : '', // Prevent NaN as value
    }));
  };

  const resetModal = () => {
    setNewMatchDateObj({
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    });
    setIsModalOpen(false);
  };

  const updateMatchDates = (dateObj: DateObj) => {
    const {year, month, day} = dateObj;

    setMatchDates((prevMatchDates) => [
      ...prevMatchDates,
      `${year}-${month}-${day}`,
    ]);
    setTargetYear(year);
    setTargetMonth(month);
    getMatchDates(year, month);
  };

  const handleAddNewMeetingDate = async () => {
    const response = await postNewMeetingDate(newMatchDateObj);
    const {is_success} = await response.json();
    if (!is_success) return alert('이미 추가된 날짜입니다.');

    updateMatchDates(newMatchDateObj);
    resetModal();
  };

  return (
    <div>
      <header className={styles.CalMainHeader}>
        <DateSelector
          year={targetYear}
          month={targetMonth}
          onDateChange={handleTargetDateChange}
        />
        {isAuthenticated && (
          <button className={styles.AddDateButton} onClick={handleOpenModal}>
            날짜 추가
          </button>
        )}
      </header>
      <div className="appBody">
        <ul>
          {matchDates.length != 0 ? (
            matchDates.map((date) => {
              const day = getDayOfWeek(date);

              return <DailyResult key={date} matchDate={date} matchDay={day} />;
            })
          ) : (
            <div className={styles.NoDate}>경기결과가 없습니다.</div>
          )}
        </ul>
      </div>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          children={
            <AddDateModal
              newMatchDateObj={newMatchDateObj}
              handleNewMatchDateChange={handleNewMatchDateChange}
              handleResetModal={resetModal}
              handleAddNewMeetingDate={handleAddNewMeetingDate}
            />
          }
        />
      )}
    </div>
  );
}
