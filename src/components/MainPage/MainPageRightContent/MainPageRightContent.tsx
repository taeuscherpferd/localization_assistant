import { useEffect, useState } from 'react';
import { TranslationItem } from 'src/types/models/TranslationItem';
import { AltServiceSelector } from './AltServiceSelector';
import { LabledInput } from './LabledInput';
import styles from './MainPageRightContent.module.scss';
import { Placeholder } from './Placeholder';
import { SaveButtons } from './SaveButtons';

interface MainPageRightContentProps {
  selectedItem?: TranslationItem;
  onUpdateTranslation: (updatedItem: TranslationItem) => void;
}

export const MainPageRightContent = ({ selectedItem, onUpdateTranslation }: MainPageRightContentProps) => {
  const [altService, setAltService] = useState<string>("GPT-4o");
  const [contextForGPT, setContextForGPT] = useState<string>("");
  const [sandboxValue, setSandboxValue] = useState<string>("");
  const [translationPlayboxValue, setTranslationPlayboxValue] = useState<string>(selectedItem?.translation ?? "");

  // Keep the translationPlayboxValue in sync with external changes
  useEffect(() => {
    setTranslationPlayboxValue(selectedItem?.translation ?? "");
  }, [selectedItem]);

  const handleTranslationChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!selectedItem) return;
    setTranslationPlayboxValue(e.target.value);
  };

  const onSaveBackToResults = () => {
    if (!selectedItem) return;
    onUpdateTranslation({
      ...selectedItem,
      translation: translationPlayboxValue,
    });
  }

  const mainContent = (
    <div className={styles.MainPageRightContent}>
      <span className={styles.header}>{selectedItem?.languageCode}</span>
      <LabledInput
        label="Translation:"
        value={translationPlayboxValue}
        onChange={handleTranslationChange}
      />
      <AltServiceSelector
        altService={altService}
        onChange={(e) => setAltService(e.target.value)}
      />
      <LabledInput
        label="Context for GPT:"
        value={contextForGPT}
        onChange={(e) => setContextForGPT(e.target.value)}
      />
      <LabledInput
        label="Sandbox (chat-sandbox?):"
        value={sandboxValue}
        onChange={(e) => setSandboxValue(e.target.value)}
      />
      <SaveButtons label={"⬅️ Save back to results"} onSaveClick={onSaveBackToResults} />
    </div>
  )

  return (
    <div className={styles.MainPageRightContent}>
      {!selectedItem ? <Placeholder /> : mainContent}
    </div>
  )
}