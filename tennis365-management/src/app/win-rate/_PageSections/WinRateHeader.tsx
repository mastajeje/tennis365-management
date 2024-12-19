'use client';
import {useState} from 'react';
import styles from '../styles/PageSections.module.css';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import {useAuth} from '@/app/context/AuthContext';
import {useRouter} from 'next/navigation';
import {PRIMARY_BLUE} from '@/app/constants';

export default function WinRateHeader() {
  const {isAuthenticated, validateAuth} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handlePasswordModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/validate', {
      method: 'POST',
      body: JSON.stringify({password}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      setIsModalOpen(false);
      validateAuth();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handleResetModal = () => {
    setPassword('');
    setIsModalOpen(false);
  };

  const returnToMain = () => {
    router.push('/win-rate');
  };

  const modalContent = (
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

  return (
    <div className={styles.WinRateHeader}>
      {/* <div className={styles.HeaderLogo} onClick={returnToMain}>Tennis 365</div> */}
      <div className={styles.HeaderLogo} onClick={returnToMain}>
        <img src="/images/tennis365-logo2.webp" alt="tennis 365 logo" />
      </div>
      <h2>365 테니스 트래커</h2>
      {isAuthenticated ? (
        <div className={styles.HeaderButton}>
          <img src="/images/lock-open.svg" alt="opened lock icon" />
        </div>
      ) : (
        <div className={styles.HeaderButton} onClick={handlePasswordModalOpen}>
          <img src="/images/LockIcon.svg" alt="lock icon" />
        </div>
      )}

      {isModalOpen && <Modal open={isModalOpen} children={modalContent} />}
    </div>
  );
}
