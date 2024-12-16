import { useState } from 'react';
import styles from './styles/components.module.css'

export default function Button({
  text,
  onClick = () => {},
  disabled,
  style,
  buttonColor = 'black'
}: Readonly<{
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  buttonColor?: string;
}>) {

const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.CommonButton}
      onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      style={{...style, backgroundColor: isFocused ? buttonColor : 'white'}}
    >
      {text}
    </button>
  );
}