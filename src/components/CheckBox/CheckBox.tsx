import styles from './CheckBox.module.scss';

interface CheckBoxProps {
  checked: boolean;
  onChange: (b: boolean) => void;
  label?: string;
}

export const CheckBox = ({ checked, onChange, label }: CheckBoxProps) => {

  const onCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  }
  return (
    <div className={styles.CheckBox}>
      <label>
        <input
          type={"checkbox"}
          checked={checked}
          onChange={onCheckBoxChange}
        />
        {label}
      </label>
    </div>
  )
}