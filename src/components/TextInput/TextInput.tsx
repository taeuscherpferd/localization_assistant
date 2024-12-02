import styles from './TextInput.module.scss';

interface TextInputProps {
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
}

export const TextInput = ({ value, onChange, placeholder }: TextInputProps) => {

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <input
      className={styles.TextInput}
      value={value}
      onChange={onInputChange}
      placeholder={placeholder}
    />
  )
}