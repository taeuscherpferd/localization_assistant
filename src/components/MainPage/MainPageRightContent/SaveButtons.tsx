import styles from './SaveButtons.module.scss';

interface SaveButtonsProps {
  label: string;
  onSaveClick: () => void;
}

export const SaveButtons = ({ onSaveClick, label }: SaveButtonsProps) => (
  <div>
    <button
      className={styles.button}
      onClick={onSaveClick}
    >
      {label}
      {/* {"⬅️ Save back to results"} */}
    </button>
  </div>
);
