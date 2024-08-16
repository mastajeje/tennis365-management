// import styles from './styles/CalMain.module.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const layoutStyle:React.CSSProperties = {    margin: '0 auto',
    backgroundColor: 'gray',
    maxWidth: '640px',
    padding:' 8px'}

  return (
      <div 
      style={layoutStyle}
      >{children}
      
      </div>
    
  );
}
