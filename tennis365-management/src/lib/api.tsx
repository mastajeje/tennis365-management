import { IResultData } from "@/app/types/match";

export const getResults = async (isParticipationOver30:boolean) => {
    const response = await fetch(`/api/win-rate/results?is-over-30=${isParticipationOver30}`)
    if(!response.ok)return
    const results = await response.json();

    if(results.is_success){
        const resultsData = results.results;
        resultsData.forEach((result:IResultData) => {
            if(!result.win_rate) return;
            result.win_rate = `${(result.win_rate)}%`;
        });
    
        return results.results
        // setResults(results.results.sort((a:IResultData, b:IResultData) => a.name > b.name ? 1: -1))
    }
}

// export const validateAuth = async () => {
//     const response = await fetch('/api/validate')
//     const results = await response.json();

//     if(results.authenticated){
//         return true;
//     } else {
//         return false;
//     }

// }