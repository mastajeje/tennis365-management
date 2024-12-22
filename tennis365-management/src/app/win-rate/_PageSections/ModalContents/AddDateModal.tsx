import Button from '@/components/Button';
import styles from '../../styles/PageSections.module.css'
import { PRIMARY_BLUE } from '@/app/constants';

interface AddDateModalProps {
    newMatchDateObj: {
        year: number;
        month: number;
        day: number;
    };
    handleNewMatchDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleResetModal: () => void;
    handleAddNewMeetingDate: () => void;
}

export default function AddDateModal({newMatchDateObj,  handleNewMatchDateChange, handleResetModal,handleAddNewMeetingDate}:AddDateModalProps){
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
              max="31"
              value={newMatchDateObj.day}
              name="day"
              onChange={handleNewMatchDateChange}
            />
          </div>
          <div className={styles.AddDateButtons}>
              <Button text={'취소'} onClick={handleResetModal} />
              <Button text={'추가'} onClick={handleAddNewMeetingDate} buttonColor={PRIMARY_BLUE} />
     
          </div>
        </div>
      );
    }