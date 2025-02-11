import React from 'react';
import { TranslationItem } from 'src/types/models/TranslationItem';
import styles from './TranslationDisplayItem.module.scss';

interface TranslationDisplayItemProps {
  translationItem: TranslationItem;
  isSelected: boolean;
  onSelect: (item: TranslationItem) => void;
}

const TranslationDisplayItem: React.FC<TranslationDisplayItemProps> = (
  { translationItem, translationItem: { languageCode, translation }, isSelected, onSelect }) => {

  return (
    <div
      onClick={() => onSelect(translationItem)}
      className={styles.translationItem}
    >
      <div className={`${styles.translationDisplayItem} ${isSelected ? styles.selected : ''}`}>
        <button className={styles.languageButton}>{languageCode}</button>
        <input type="text" value={translation} readOnly className={styles.translationDisplay} />
      </div>
    </div>
  );
};

export default TranslationDisplayItem;
