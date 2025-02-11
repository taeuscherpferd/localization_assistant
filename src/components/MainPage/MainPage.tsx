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
}

export const MainPage = (props: MainPageProps) => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [selectedTranslationLanguageCode, setSelectedTranslationLanuageCode] = useState("")

  const { translatedItems, updateTranslation } = useFetchTranslationsFromAPI()

  const selectedTranslatedItem = translatedItems.find(item => item.languageCode === selectedTranslationLanguageCode)

  const onSettingsClick = () => {
    setSettingsModalVisible(true)
  }

  const onTranslationItemSelected = (item: TranslationItem) => {
    setSelectedTranslationLanuageCode(item.languageCode)
  }

  const onUpdateTranslation = (item: TranslationItem) => {
    updateTranslation(item)
  }

  return (
    <div className={styles.MainPage}>
      <MainPageLayout
        LeftContent={<MainPageLeftContent />}
        CenterContent={<MainPageCenterContent items={translatedItems} onSelect={onTranslationItemSelected} selectedLangCode={selectedTranslationLanguageCode} />}
        RightContent={<MainPageRightContent selectedItem={selectedTranslatedItem} onUpdateTranslation={onUpdateTranslation} />}
        TopRightButton={<SettingsButton onClick={onSettingsClick} />}
      />
      <SettingsModal shouldDisplay={settingsModalVisible} toggleShouldDisplay={() => setSettingsModalVisible(false)} />
    </div>
  )
}