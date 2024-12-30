import {useState} from 'react';
import styles from './styles/components.module.css';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    buttonColor?: string;
}


export default function Button({
  text,
  type = 'button',
  onClick = () => {},
  disabled,
  style,
  buttonColor = '#e1e1e1',
}: Readonly<ButtonProps>) {
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
