import styles from './SaveButtons.module.scss';

interface SaveButtonsProps {
  onSaveClick: () => void;
}

export const SaveButtons = ({ onSaveClick }: SaveButtonsProps) => (
  <div>
    <button
      className={styles.button}
      onClick={onSaveClick}
    >
      {"⬅️ Save back to results"}
    </button>
  </div>
);
