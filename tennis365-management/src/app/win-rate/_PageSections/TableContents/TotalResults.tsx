import {IResultData} from '@/app/types/match';
import Table from '@/components/Table';

export default function TotalResults({
  resultsData,
}: {
  resultsData: IResultData[];
}) {
  const columns = [
    {key: 'name', header: '이름'},
    {key: 'participation', header: '참여'},
    {key: 'wins', header: '승'},
    {key: 'losses', header: '패'},
    {key: 'win_rate', header: '승률'},
    {key: 'debt', header: '두오비'},
  ];

  return <Table columns={columns} data={resultsData} />;
}
