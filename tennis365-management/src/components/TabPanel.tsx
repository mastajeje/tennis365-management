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
    if(tabs.length === 0) return null;

  const [activeTab, setActiveTab] = useState(0);

  return (
  
      <div >
        <ul className={styles.TabLabels} role='tablist'>
          {tabs.map((tab, index) => (
            <li
              key={tab.label}
              className={`${styles.TabLabel} ${activeTab === index ? styles.Active : ''}`}
              onClick={() => setActiveTab(index)}
                role='tab'
            >
              {tab.label}
            </li>
          ))}
        </ul>

        <div className="TabContent" role='tabpanel'>{tabs[activeTab].content}</div>
      </div>

  );
}
