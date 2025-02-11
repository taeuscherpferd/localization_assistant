import { useState } from 'react';
import { TranslationItem } from 'src/types/models/TranslationItem';
import { AltServiceSelector } from './AltServiceSelector';
import { GenericInput } from './GenericInput';
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

  const handleTranslationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <GenericInput
        label="Translation:"
        value={translationPlayboxValue}
        onChange={handleTranslationChange}
      />
      <AltServiceSelector
        altService={altService}
        onChange={(e) => setAltService(e.target.value)}
      />
      <GenericInput
        label="Context for GPT:"
        value={contextForGPT}
        onChange={(e) => setContextForGPT(e.target.value)}
      />
      <GenericInput
        label="Sandbox (chat-sandbox?):"
        value={sandboxValue}
        onChange={(e) => setSandboxValue(e.target.value)}
      />
      <SaveButtons onSaveClick={onSaveBackToResults} />
    </div>
  )

  return (
    <div className={styles.MainPageRightContent}>
      {!selectedItem ? <Placeholder /> : mainContent}
    </div>
  )
}