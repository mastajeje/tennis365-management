import styles from  './styles/components.module.css'

interface Column {
    key: string;
    header: string;
}

interface TableProps {
    columns: Column[];
    data?: {[key:string]: any}[];
}

export default function Table({columns, data = []}: TableProps){
    return (
        <div>
            <table className={styles.Table}>
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((row, rowIndex)=>(
                        <tr key={rowIndex}>
                            {columns.map((col)=> (
                                <td key={`${rowIndex}-${col.key}`}>
                                    {row[col.key] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    }