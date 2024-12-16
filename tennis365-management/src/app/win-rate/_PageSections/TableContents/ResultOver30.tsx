import { IResultData } from "@/app/types/match";
import Table from "@/components/Table"
import { getResults } from "@/lib/api";
import { useEffect, useState } from "react";


export default function ResultOver30(){
    const columns = [
        {key: 'rankings', header: '순위'},
        {key: 'name', header: '이름'},
        {key: 'participation', header: '참여'},
        {key: 'wins', header: '승'},
        {key: 'losses', header: '패'},
        {key: 'win_rate', header: '승률'},
    ]

    const [results, setResults] = useState<IResultData[]>();

    useEffect(()=> {
        updateResults()
    },[])

    const updateResults = async () => {
        const resultsData = await getResults(true);
        setResults(resultsData);
    }

    // const getResults = async () => {
    //     const response = await fetch('/api/win-rate/results?is-over-30=true')
    //     const results = await response.json();

    //     if(results.is_success){
    //         const resultsData = results.results;
    //         resultsData.forEach((result:IResultData) => {
    //             if(!result.win_rate) return;
    //             result.win_rate = `${(result.win_rate)}%`;
    //         });
        
    //         setResults(results.results)
    //         // setResults(results.results.sort((a:IResultData, b:IResultData) => a.name > b.name ? 1: -1))
    //     }
    // }


    return (
        <Table columns={columns} data={results} />
    )
    }