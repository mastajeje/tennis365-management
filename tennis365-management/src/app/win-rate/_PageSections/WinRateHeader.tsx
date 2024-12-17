'use client'
import { useState } from 'react';
import styles from '../styles/PageSections.module.css'
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function WinRateHeader(){
const {isAuthenticated,validateAuth} = useAuth();
const [isModalOpen, setIsModalOpen] = useState(false);
const [password, setPassword] = useState('');
const router = useRouter();

    const handlePasswordModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handlePassword = async () => {
       const response = await fetch('/api/validate', {
            method: 'POST',
            body: JSON.stringify({password}),
            headers: {
                'Content-Type': 'application/json'
            }
       })

       if(response.status === 200) {
           setIsModalOpen(false);
          
            validateAuth()
       } else {
           alert('비밀번호가 틀렸습니다.');
       }
    }

    const handleResetModal = () => {
        setPassword('');
        setIsModalOpen(false);
    }
    
    const returnToMain = () => {
        router.push('/win-rate')
    }

    const modalContent = (
        <div>
            <h2>비밀번호를 입력</h2>
            <p>
                모임날짜 추가, 경기결과 삭제 등의 
                <br></br>
                작업을 하려면 비밀번호를 입력하세요.
            </p>
            <input type="password" onChange={handleChangePassword}/>
            <div>
            <Button text={'취소'} onClick={handleResetModal} />
            <Button text={'추가'} onClick={handlePassword} buttonColor='#1e74fd' />
            </div>

        </div>
    )

    return (
        <div className={styles.WinRateHeader}>
        <div className={styles.HeaderLogo} onClick={returnToMain}>Tennis 365</div>
        <h1>365 승률 계산기</h1>
        {isAuthenticated ? (<div className={styles.HeaderButton}>
          <img src="/images/lock-open.svg" alt="opened lock icon" />
        </div>) : <div className={styles.HeaderButton} onClick={handlePasswordModalOpen}>
          <img src="/images/LockIcon.svg" alt="lock icon" />
        </div>}

        {isModalOpen && <Modal open={isModalOpen} children={modalContent}/>}
      </div>
    )
    }