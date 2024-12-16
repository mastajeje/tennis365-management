import styles from './styles/CalMain.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutStyle: React.CSSProperties = {
    margin: '0 auto',
    // backgroundColor: 'gray',
    maxWidth: '640px',
    padding: '0 8px',
  };

  return (
    <div className={styles.CalMain} style={layoutStyle}>
      <div className={styles.CalMainHeader}>
        <div className={styles.HeaderLogo}>Tennis 365</div>
        <h1>365 승률 계산기</h1>
        <div className={styles.HeaderButton}>
          <img src="/images/LockIcon.svg" alt="lock icon" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
