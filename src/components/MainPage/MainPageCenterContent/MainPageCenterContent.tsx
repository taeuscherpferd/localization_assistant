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
    const resultsObject = items.reduce((acc, item) => {
      acc[item.languageCode] = item.translation;
      return acc;
    }, {} as Record<string, string>);

    const resultsText = JSON.stringify(resultsObject, null, 2);
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
      <div className={styles.scrollableContent}>
        {items.map((item) => (
          <TranslationDisplayItem
            key={item.languageCode}
            translationItem={item}
            isSelected={item.languageCode === selectedLangCode}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};