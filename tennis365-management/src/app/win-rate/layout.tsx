import { AuthProvider } from '../context/AuthContext';
import WinRateHeader from './_PageSections/WinRateHeader';
import styles from './styles/CalMain.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layoutStyle: React.CSSProperties = {
    margin: '0 auto',
    maxWidth: '640px',
    padding: '0 8px',
  };


  return (
    <AuthProvider>
    <div className={styles.CalMain} style={layoutStyle}>
      <WinRateHeader/>
      <div>{children}</div>
    </div>
    </AuthProvider>
  );
}
