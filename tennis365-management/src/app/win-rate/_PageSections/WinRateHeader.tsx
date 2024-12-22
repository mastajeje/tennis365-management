'use client';
import {useState} from 'react';
import styles from '../styles/PageSections.module.css';
import Modal from '@/components/Modal';
import {useAuth} from '@/app/context/AuthContext';
import {useRouter} from 'next/navigation';
import PasswordModal from './ModalContents/PasswordModal';

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


  return (
    <div className={styles.WinRateHeader}>
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

      {isModalOpen && <Modal open={isModalOpen} children={
        <PasswordModal 
            handlePassword={handlePassword} 
            handleChangePassword={handleChangePassword} 
            handleResetModal={handleResetModal}/>
      } />}
    </div>
  );
}
