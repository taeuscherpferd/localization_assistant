import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import { MainPageCenterContent } from 'src/components/MainPage/MainPageCenterContent/MainPageCenterContent';
import { MainPageLayout } from 'src/components/MainPage/MainPageLayout/MainPageLayout';
import { MainPageLeftContent } from 'src/components/MainPage/MainPageLeftContent/MainPageLeftContent';
import { MainPageRightContent } from 'src/components/MainPage/MainPageRightContent/MainPageRightContent';
import { SettingsButton } from 'src/components/SettingsButton/SettingsButton';
import { SettingsModal } from 'src/components/SettingsModal/SettingsModal';
import { useFetchTranslationsFromAPI } from 'src/hooks/useFetchTranslationsFromAPI';
import { TranslationItem } from 'src/types/models/TranslationItem';
import styles from './MainPage.module.scss';

interface MainPageProps {
  localizerSettings: LocalizerSettings;
  saveSettings: (s: LocalizerSettings) => void;
}

export const MainPage = ({ localizerSettings, saveSettings }: MainPageProps) => {
  const [stringKey, setStringKey] = useState<string>('')
  const [stringToLocalize, setStringToLocalize] = useState<string>('')
  const [shouldUpdateDefaultLanguage, setShouldUpdateDefaultLanguage] = useState<boolean>(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [selectedTranslationLanguageCode, setSelectedTranslationLanguageCode] = useState("")

  const { translatedItems, updateTranslation, localizeString } = useFetchTranslationsFromAPI(localizerSettings.supportedLanguages, localizerSettings.apiKey)

  const selectedTranslatedItem = translatedItems.find(item => item.languageCode === selectedTranslationLanguageCode)

  const onSettingsClick = () => {
    setSettingsModalVisible(true)
  }

  const onTranslationItemSelected = (item: TranslationItem) => {
    setSelectedTranslationLanguageCode(item.languageCode)
  }

  const onUpdateTranslation = (item: TranslationItem) => {
    updateTranslation(item)
  }

  const onSettingsSave = (s: LocalizerSettings) => {
    saveSettings(s)
  }

  const onToggleSettingsModal = () => {
    setSettingsModalVisible(false)
  }

  const onLocalizeClick = async () => {
    localizeString(stringToLocalize)
  }

  const onSaveToFilesClick = async () => {
    const res = await invoke('write_to_language_files',
      {
        jsonData: JSON.stringify(translatedItems),
        translationKey: stringKey,
        pathToLocalesFolder: localizerSettings.localeJsonPath,
        defaultLanguage: localizerSettings.defaultLanguage,
        originalStringBeforeLocalization: stringToLocalize,
        shouldUpdateDefaultLanguage,
      });
    alert(res)
  }

  return (
    <div className={styles.MainPage}>
      <MainPageLayout
        LeftContent={
          <MainPageLeftContent
            onLocalizeClick={onLocalizeClick}
            onSaveToFiles={onSaveToFilesClick}
            stringKey={stringKey}
            stringToLocalize={stringToLocalize}
            shouldUpdateDefaultLanguage={shouldUpdateDefaultLanguage}
            setStringKey={setStringKey}
            setStringToLocalize={setStringToLocalize}
            setShouldUpdateDefaultLanguage={setShouldUpdateDefaultLanguage}
          />
        }
        CenterContent={<MainPageCenterContent items={translatedItems} onSelect={onTranslationItemSelected} selectedLangCode={selectedTranslationLanguageCode} />}
        RightContent={<MainPageRightContent selectedItem={selectedTranslatedItem} onUpdateTranslation={onUpdateTranslation} />}
        TopRightButton={<SettingsButton onClick={onSettingsClick} />}
      />
      <SettingsModal
        shouldDisplay={settingsModalVisible}
        toggleShouldDisplay={onToggleSettingsModal}
        localizerSettings={localizerSettings}
        onSettingsSave={onSettingsSave} />
    </div>
  )
}