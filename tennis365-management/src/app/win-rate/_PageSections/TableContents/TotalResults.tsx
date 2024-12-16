import {IResultData} from '@/app/types/match';
import Table from '@/components/Table';
import {getResults} from '@/lib/api';
import {useEffect, useState} from 'react';
// interface IResultData {
//     debt: number;
//     id: number;
//     wins: number;
//     losses: number;
//     participation: number;
//     name: string;
//     win_rate?: string;
//   }
export default function TotalResults() {
  const columns = [
    {key: 'name', header: '이름'},
    {key: 'participation', header: '참여'},
    {key: 'wins', header: '승'},
    {key: 'losses', header: '패'},
    {key: 'win_rate', header: '승률'},
    {key: 'debt', header: '두오비'},
  ];

  const [results, setResults] = useState<IResultData[]>();

  useEffect(() => {
    updateResults();
  }, []);

  const updateResults = async () => {
    const resultsData = await getResults(false);
    setResults(resultsData);
  };

  // const getResults = async () => {
  //     const response = await fetch('/api/win-rate/results')
  //     const results = await response.json();

  //     if(results.is_success){
  //         const resultsData = results.results;
  //         resultsData.forEach((result:IResultData) => {
  //             if(!result.win_rate) return;
  //             result.win_rate = `${(result.win_rate)}%`;
  //         });
  //         setResults(results.results)
  //     }
  // }

  const data = [
    {
      name: '김정진',
      participation: 10,
      win: 8,
      lose: 2,
      win_rate: '80%',
      debt: 10000,
    },
    {
      name: '김정진',
      participation: 10,
      win: 8,
      lose: 2,
      win_rate: '80%',
      debt: 10000,
    },
    {
      name: '김정진',
      participation: 10,
      win: 8,
      lose: 2,
      win_rate: '80%',
      debt: 10000,
    },
  ];

  return <Table columns={columns} data={results} />;
}
