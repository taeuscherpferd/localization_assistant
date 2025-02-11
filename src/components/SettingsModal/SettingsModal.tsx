import { ChangeEvent } from 'react'
import { LabledInput } from 'src/components/MainPage/MainPageRightContent/LabledInput'
import { SaveButtons } from 'src/components/MainPage/MainPageRightContent/SaveButtons'
import ModalBase from 'src/components/ModalBase/ModalBase'
import styles from './SettingsModal.module.scss'

interface SettingsModalProps {
  shouldDisplay: boolean
  apiKey: string
  setApiKey: (apiKey: string) => void
  toggleShouldDisplay: () => void
}

export const SettingsModal = ({ shouldDisplay, toggleShouldDisplay, setApiKey }: SettingsModalProps) => {

  function onApiKeyChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    if (!e.target.value) return
    setApiKey(e.target.value)
  }

  const onSaveClick = () => {
    toggleShouldDisplay()
  }

  const onSupportedLanguagesChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  }

  const onJsonPathChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  }

  return (
    <ModalBase toggleShouldDisplay={toggleShouldDisplay} shouldDisplay={shouldDisplay}>
      <div className={styles.SettingsModal}>
        <div className={styles.options}>
          <LabledInput label="API Key" useInput isSensitive onChange={onApiKeyChange} />
          <LabledInput label={"Path to JSON files"} useInput onChange={onJsonPathChange} />
          <LabledInput label={"Supported Languages (Language keys, new line delimited)"} onChange={onSupportedLanguagesChange} />
        </div>
        <div className={styles.buttonWrapper}>
          <SaveButtons label={"Save"} onSaveClick={onSaveClick} />
        </div>
      </div>
    </ModalBase>
  )
}