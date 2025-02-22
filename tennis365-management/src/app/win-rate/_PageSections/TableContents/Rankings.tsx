import {IResultData} from '@/app/types/match';
import Table from '@/components/Table';
import {useEffect, useState} from 'react';
import styles from '../../styles/CalMain.module.css';
// FIXME: 현재는 서버로 부터 불필요한 데이터를 받아오고 있음(승,패) 나중에 수정 필요

export default function Rankings({resultsData}: {resultsData: IResultData[]}) {
  const winRateColumns = [
    {key: 'rankings', header: '순위'},
    {key: 'name', header: '이름'},
    {key: 'win_rate', header: '승률'},
  ];

  const participateColumns = [
    {key: 'rankings', header: '순위'},
    {key: 'name', header: '이름'},
    {key: 'participation', header: '참여'},
  ];

  const debtColumns = [
    {key: 'rankings', header: '순위'},
    {key: 'name', header: '이름'},
    {key: 'debt', header: '두오비'},
  ];

  const [winRateRankings, setWinRateRankings] = useState<IResultData[]>([]);
  const [participationRankings, setParticipationRankings] = useState<
    IResultData[]
  >([]);
  const [donationRankings, setDonationRankings] = useState<IResultData[]>([]);

  useEffect(() => {
    updateResults();
  }, []);

  const sortByWinRate = (a: IResultData, b: IResultData) =>
    a.win_rate > b.win_rate ? -1 : 1;
  const sortByParticipation = (a: IResultData, b: IResultData) =>
    a.participation > b.participation ? -1 : 1;
  const sortByDebt = (a: IResultData, b: IResultData) =>
    a.debt && b.debt && a.debt > b.debt ? -1 : 1;
  const mapResultsData = (item: IResultData, index: number) => ({
    ...item,
    rankings: index + 1,
  });

  const updateResults = async () => {
    // const resultsData = await getResults(false);
    if (resultsData === undefined)
      return console.log('Cannot get data from server');
    setWinRateRankings(
      resultsData
        .filter((item: IResultData) => item.participation > 30)
        .sort(sortByWinRate)
        .slice(0, 3)
        .map(mapResultsData)
    );
    setParticipationRankings(
      resultsData.sort(sortByParticipation).slice(0, 3).map(mapResultsData)
    );
    setDonationRankings(
      resultsData.sort(sortByDebt).slice(0, 3).map(mapResultsData)
    );
  };
  return (
    <div>
      <div className={styles.RankingTable}>
        <span>승률</span>
        <Table columns={winRateColumns} data={winRateRankings} />
      </div>
      <div className={styles.RankingTable}>
        <span>참가</span>
        <Table columns={participateColumns} data={participationRankings} />
      </div>
      <div className={styles.RankingTable}>
        <span>기부왕</span>
        <Table columns={debtColumns} data={donationRankings} />
      </div>
    </div>
  );
}
