import {IResultData} from '@/app/types/match';
import Table from '@/components/Table';
import styles from '../../styles/PageSections.module.css';

export default function ResultOver30({
  resultsData,
}: {
  resultsData: IResultData[];
}) {
  const columns = [
    {key: 'rankings', header: '순위'},
    {key: 'name', header: '이름'},
    {key: 'participation', header: '참여'},
    {key: 'wins', header: '승'},
    {key: 'losses', header: '패'},
    {key: 'win_rate', header: '승률'},
  ];

  return (
    <>
      {resultsData.length > 0 ? (
        <Table columns={columns} data={resultsData} />
      ) : (
        <div className={styles.NoResult}>30회 이상 참가자가 없습니다</div>
      )}
    </>
  );
}
