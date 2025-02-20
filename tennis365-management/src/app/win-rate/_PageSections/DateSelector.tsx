import { D } from "node_modules/@tanstack/react-query-devtools/build/legacy/ReactQueryDevtools-Cn7cKi7o";
import styles from "../styles/PageSections.module.css"

interface DateSelectorProps {
 year: number;
    month: number;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateSelector({year, month,onDateChange}:DateSelectorProps) {
    return (
        <div className={styles.TargetDate}>
          <div className="TargetYear">
            <input
              type="number"
              className={styles.dateInput}
              name="year"
              min="2000"
              max="3000"
              onChange={onDateChange}
              value={year}
            />
            <span>년</span>
          </div>
          <div className="TargetMonth">
            <input
              type="number"
              name="month"
              className={styles.dateInput}
              min="1"
              max="12"
              onChange={onDateChange}
              value={month}
            />
            <span>월</span>
          </div>
        </div>
    )
    }