import { IResultData } from "@/app/types/match";
import Table from "@/components/Table"
import { getResults } from "@/lib/api";
import { useEffect, useState } from "react";


export default function ResultOver30({resultsData}){
    const columns = [
        {key: 'rankings', header: '순위'},
        {key: 'name', header: '이름'},
        {key: 'participation', header: '참여'},
        {key: 'wins', header: '승'},
        {key: 'losses', header: '패'},
        {key: 'win_rate', header: '승률'},
    ]
    // const [results, setResults] = useState<IResultData[]>();

    // useEffect(()=> {
    //     updateResults()
    // },[])

    // const updateResults = async () => {
    //     const resultsData = await getResults(true);
    //     setResults(resultsData);
    // }

    return (
        <Table columns={columns} data={resultsData} />
    )
    }