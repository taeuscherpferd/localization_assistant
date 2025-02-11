import TranslationDisplayItem from 'src/components/TranslationDisplayItem/TranslationDisplayItem';
import { TranslationItem } from "src/types/models/TranslationItem";
import styles from "./MainPageCenterContent.module.scss";

interface ResultsColumnProps {
  items: TranslationItem[];
  onSelect: (item: TranslationItem) => void;
  selectedLangCode: string | null;
}

export const MainPageCenterContent = ({ items, onSelect, selectedLangCode }: ResultsColumnProps) => {

  const handleCopyResults = () => {
    const resultsText = items.map(item => item.translation).join('\n');
    navigator.clipboard.writeText(resultsText);
  };

  return (
    <div className={styles.MainPageCenterContent}>
      <div className={styles.headerContainer}>
        <span className={styles.header}>
          {"Results:"}
        </span>
        <button className={styles.copyButton} onClick={handleCopyResults}>
          {"Copy Results"}
        </button>
      </div>
      {items.map((item) => (
        <TranslationDisplayItem
          translationItem={item}
          isSelected={item.languageCode === selectedLangCode}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};