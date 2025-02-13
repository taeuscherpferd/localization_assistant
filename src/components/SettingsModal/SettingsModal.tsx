import { open } from "@tauri-apps/plugin-dialog"
import { useEffect, useState } from 'react'
import { LabledInput } from 'src/components/MainPage/MainPageRightContent/LabledInput'
import { SaveButtons } from 'src/components/MainPage/MainPageRightContent/SaveButtons'
import ModalBase from 'src/components/ModalBase/ModalBase'
import styles from './SettingsModal.module.scss'

interface SettingsModalProps {
  shouldDisplay: boolean
  localizerSettings: LocalizerSettings
  toggleShouldDisplay: () => void
  onSettingsSave: (s: LocalizerSettings) => void
}

export const SettingsModal = ({ shouldDisplay, toggleShouldDisplay, localizerSettings: { apiKey, localeJsonPath, supportedLanguages }, onSettingsSave }: SettingsModalProps) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey)
  const [localPathToJson, setLocalPathToJson] = useState<string>(localeJsonPath)
  const [localSupportedLanguages, setLocalSupportedLanguages] = useState<string>(supportedLanguages.join('\n'))

  useEffect(() => {
    setLocalApiKey(apiKey)
    setLocalPathToJson(localeJsonPath)
    setLocalSupportedLanguages(supportedLanguages.join('\n'))
  }, [apiKey, localeJsonPath, supportedLanguages])

  const onSaveClick = () => {
    onSettingsSave({
      apiKey: localApiKey,
      localeJsonPath: localPathToJson,
      supportedLanguages: localSupportedLanguages.trim().split('\n')
    })
    toggleShouldDisplay()
  }

  const onPickJsonPathClick = async () => {
    const file = await open({ multiple: false, directory: true })
    if (file) {
      setLocalPathToJson(file)
    }
  }

  return (
    <ModalBase toggleShouldDisplay={toggleShouldDisplay} shouldDisplay={shouldDisplay}>
      <div className={styles.SettingsModal}>
        <div className={styles.options}>
          <LabledInput label="API Key" useInput isSensitive value={localApiKey} onChange={(x) => { setLocalApiKey(x.target.value) }} />
          <LabledInput label={"Path to JSON files"} useInput readonly value={localPathToJson} onChange={(x) => { setLocalPathToJson(x.target.value) }} onClick={onPickJsonPathClick} />
          <LabledInput className={styles.externalExpand} label={"Supported Languages (Language keys, new line delimited)"} value={localSupportedLanguages} onChange={(x) => { setLocalSupportedLanguages(x.target.value) }} />
        </div>
        <div className={styles.buttonWrapper}>
          <SaveButtons label={"Save"} onSaveClick={onSaveClick} />
        </div>
      </div>
    </ModalBase>
  )
}