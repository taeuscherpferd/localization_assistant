import { TranslationItem } from "src/types/models/TranslationItem";
import styles from "./MainPageCenterContent.module.scss";

interface ResultsColumnProps {
  items: TranslationItem[];
  onSelect: (item: TranslationItem) => void;
  selectedLangCode: string | null;
}

const pageStyle = {
  padding: "4px",
  cursor: "pointer",
  // backgroundColor: item.languageCode === selectedLangCode ? "#eee" : "transparent",
}

export const MainPageCenterContent = ({
  items,
  onSelect,
  selectedLangCode,
}: ResultsColumnProps) => {
  return (
    <div className={styles.MainPageCenterContent}>
      <span className={styles.leftAlign}>
        <h2>Results:</h2>
      </span>
      {items.map((item) => (
        <div
          key={item.languageCode}
          onClick={() => onSelect(item)}
          style={pageStyle}
          className={styles.translationItem}
        >
          {item.languageCode}
        </div>
      ))}
    </div>
  );
};