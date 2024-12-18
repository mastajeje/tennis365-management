import {useState} from 'react';
import styles from './styles/components.module.css';

export default function Button({
  text,
  //   /button type attribute
  type = 'button',
  onClick = () => {},
  disabled,
  style,
  buttonColor = '#e1e1e1',
}: Readonly<{
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  buttonColor?: string;
}>) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <button
      className={styles.CommonButton}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      style={{...style, backgroundColor: isFocused ? buttonColor : 'white'}}
    >
      {text}
    </button>
  );
}
