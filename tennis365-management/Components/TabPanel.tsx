import {useState} from 'react';

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
    <div>
      <div className="TabContainer">
        {tabs.map((tab, index) => (
          <div key={tab.label} onClick={() => setActiveTab(index)}>
            <div className="TabLabel">{tab.label}</div>
            <div className="TabContent">{tab.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
