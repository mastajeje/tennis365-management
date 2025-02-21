'use client';

import TotalResults from '../TableContents/TotalResults';
import styles from '../../styles/PageSections.module.css';
import {useEffect, useState} from 'react';
import ResultOver30 from '../TableContents/ResultOver30';
import Rankings from '../TableContents/Rankings';
import { getResults } from '@/lib/api';
import { IResultData } from '@/app/types/match';

const OVER_30_TABLE = 1; 

export default function ResultTable() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [resultsData, setResultsData] = useState<IResultData[]>();

useEffect(()=> {
    fetchResults(false);
},[])

  const handleClickTab = (e: React.MouseEvent<HTMLLIElement>) => {
    const tabIndex = e.currentTarget.getAttribute('data-index');
    setActiveTab(Number(tabIndex));
    fetchResults(Number(tabIndex) === OVER_30_TABLE);
  };

const fetchResults = async (isOver30: boolean) => {
    const data = await getResults(isOver30);
    console.log(resultsData)

    if(data === undefined) return console.log('Cannot get data from server');

    setResultsData(data);
}

  const renderTable = (activeTab: number) => {
    switch (activeTab) {
      case 0:
        return <TotalResults resultsData={resultsData}/>;
      case 1:
        return <ResultOver30 resultsData={resultsData}/>;
      case 2:
        return <Rankings resultsData={resultsData}/>;
    }
  };

  return (
    <div>
      <ul className={styles.TableTabs}>
        <li
          className={`${styles.TableTab} ${
            activeTab === 0 ? styles.Active : ''
          }`}
          data-index="0"
          onClick={handleClickTab}
        >
          <span>
            1번 코트
            <br />
            참가 현황
          </span>
        </li>
        <li
          className={`${styles.TableTab} ${
            activeTab === 1 ? styles.Active : ''
          }`}
          data-index="1"
          onClick={handleClickTab}
        >
          <span>
            30경기 이상
            <br />
            참가자 랭킹
          </span>
        </li>
        <li
          className={`${styles.TableTab} ${
            activeTab === 2 ? styles.Active : ''
          }`}
          data-index="2"
          onClick={handleClickTab}
        >
          종합 랭킹
        </li>
      </ul>
      <div>{renderTable(activeTab)}</div>
    </div>
  );
}
