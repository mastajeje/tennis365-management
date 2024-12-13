'use client';
import {useState} from 'react';
import styles from './styles/components.module.css'
type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabPanelProps = {
  tabs: Tab[];
};

export default function TabPanel({tabs}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
  
      <div className="TabContainer">
        <ul className={styles.TabLabels}>
          {tabs.map((tab, index) => (
            <li
              key={tab.label}
              className={`${styles.TabLabel} ${activeTab === index ? styles.Active : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </li>
          ))}
        </ul>

        <div className="TabContent">{tabs[activeTab].content}</div>
      </div>

  );
}
