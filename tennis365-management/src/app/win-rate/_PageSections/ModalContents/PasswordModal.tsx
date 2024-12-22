import {PRIMARY_BLUE} from '@/app/constants';
import styles from '../../styles/PageSections.module.css';
import Button from '@/components/Button';

interface PasswordModalProps {
  handlePassword: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetModal: () => void;
}

export default function PasswordModal({
  handlePassword,
  handleChangePassword,
  handleResetModal,
}: PasswordModalProps) {
  return (
    <form className={styles.PasswordModal} onSubmit={handlePassword}>
      <h2>비밀번호를 입력</h2>
      <p className={styles.PasswordText}>
        모임날짜 추가, 경기결과 삭제 등의
        <br></br>
        작업을 하려면 비밀번호를 입력하세요.
      </p>
      <input
        type="password"
        className={styles.PasswordInput}
        onChange={handleChangePassword}
      />
      <div className={styles.PasswordButtons}>
        <Button text={'취소'} onClick={handleResetModal} />
        <Button text={'추가'} type={'submit'} buttonColor={PRIMARY_BLUE} />
      </div>
    </form>
  );
}
