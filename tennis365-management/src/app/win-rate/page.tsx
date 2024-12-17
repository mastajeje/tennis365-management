// //typescript props 예시
// // **I는 interface 라는 뜻
// // interface IResultProps {
// //     name: string;
// //     score: number;
// //     date: string;
// // }

import TabPanel from "@/components/TabPanel";
import MeetingDaysList from "@/app/win-rate/_PageSections/TabContents/MeetingDaysList";
// 'use client';

// // import { Metadata } from 'next';
import styles from './styles/CalMain.module.css';
import ResultTable from "@/app/win-rate/_PageSections/TabContents/ResultTable";

// }
export default function winningRatePage (){
    const tabs = [
        {
            label: '모임 날짜',
            content: <MeetingDaysList/>
        },
        {
            label: '결과표',
            content: <ResultTable/>
        }

    ]
    return (
        <main className={styles.CalMain}>
            <TabPanel tabs={tabs}/>
        </main>
    )
}