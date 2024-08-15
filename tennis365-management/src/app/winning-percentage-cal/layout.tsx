import {Inter} from 'next/font/google';

import styles from './styles/CalMain.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={styles.CalLayout}>{children}
      
      </div>
    
  );
}
