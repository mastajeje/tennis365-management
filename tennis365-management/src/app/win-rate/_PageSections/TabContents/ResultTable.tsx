'use client';

import TotalResults from '../TableContents/TotalResults';
import styles from '../../styles/PageSections.module.css';
import { useState } from 'react';
import ResultOver30 from '../TableContents/ResultOver30';
import Rankings from '../TableContents/Rankings';

export default function ResultTable() {
const [activeTab, setActiveTab] = useState<number>(0);

const handleClickTab = (e: React.MouseEvent<HTMLLIElement>) => {
    const tabIndex = e.currentTarget.getAttribute('data-index');
    setActiveTab(Number(tabIndex));
}

const renderTable = (activeTab: number) => {
    switch(activeTab) {
        case 0:
            return <TotalResults />;
        case 1:
            return <ResultOver30 />;
        case 2:
            return <Rankings />;
    }
}

  return (
    <div>
      <ul className={styles.TableTabs}>
        <li className={`${styles.TableTab} ${activeTab === 0 ? styles.Active : ''}`} data-index='0' onClick={handleClickTab}>1번 코트 참가 현황</li>
        <li className={`${styles.TableTab} ${activeTab === 1 ? styles.Active : ''}`} data-index='1' onClick={handleClickTab}>30회 이상 참가자 랭킹</li>
        <li className={`${styles.TableTab} ${activeTab === 2 ? styles.Active : ''}`} data-index='2' onClick={handleClickTab}>종합 랭킹</li>
      </ul>
      <div>
        {renderTable(activeTab)}
      </div>
    </div>
  );
}
