import styles from './styles/components.module.css'

export default function Button({
  text,
  onClick,
  disabled,
  style,
}: Readonly<{
  text: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.CommonButton}
      style={style}
    >
      {text}
    </button>
  );
}