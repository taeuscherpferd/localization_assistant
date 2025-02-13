import { CheckBox } from 'src/components/CheckBox/CheckBox'
import { TextInput } from 'src/components/TextInput/TextInput'
import styles from './MainPageLeftContent.module.scss'

interface MainPageLeftContentProps {
  stringKey: string
  stringToLocalize: string
  shouldUpdateDefaultLanguage: boolean
  setStringKey: React.Dispatch<React.SetStateAction<string>>
  setStringToLocalize: React.Dispatch<React.SetStateAction<string>>
  setShouldUpdateDefaultLanguage: React.Dispatch<React.SetStateAction<boolean>>
  onSaveToFiles: () => void
  onLocalizeClick: () => void
}

export const MainPageLeftContent = ({ onSaveToFiles, onLocalizeClick, stringKey, stringToLocalize,
  shouldUpdateDefaultLanguage, setStringKey, setStringToLocalize, setShouldUpdateDefaultLanguage }: MainPageLeftContentProps) => {
  const isLocalizeDisabled = !stringKey || !stringToLocalize

  const onPrefixInputChange = (value: string) => {
    setStringKey(value)
  }

  const onTextInputChange = (value: string) => {
    setStringToLocalize(value)
  }

  const onCheckBoxChange = (value: boolean) => {
    setShouldUpdateDefaultLanguage(value)
  }

  return (
    <div className={styles.MainPageLeftContent}>
      <TextInput value={stringKey}
        onChange={onPrefixInputChange}
        placeholder={'Prefix (myKey)'}
      />
      <TextInput value={stringToLocalize}
        onChange={onTextInputChange}
        placeholder={'Text to localize'}
      />
      <CheckBox
        checked={shouldUpdateDefaultLanguage}
        onChange={onCheckBoxChange}
        label={"Include default language when saving"}
      />
      <div className={styles.buttonWrapper}>
        <button onClick={onLocalizeClick} className={isLocalizeDisabled ? styles.disabledButton : undefined} disabled={isLocalizeDisabled}>
          {"Localize"}
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={onSaveToFiles}>
          {"Save to files"}
        </button>
      </div>
    </div>
  )
}