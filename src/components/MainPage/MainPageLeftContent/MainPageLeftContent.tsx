import { useState } from 'react'
import { CheckBox } from 'src/components/CheckBox/CheckBox'
import { TextInput } from 'src/components/TextInput/TextInput'
import styles from './MainPageLeftContent.module.scss'

interface MainPageLeftContentProps {
}

export const MainPageLeftContent = (props: MainPageLeftContentProps) => {
  const [prefix, setPrefix] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)

  const onPrefixInputChange = (value: string) => {
    setPrefix(value)
  }

  const onTextInputChange = (value: string) => {
    setText(value)
  }

  const onCheckBoxChange = (value: boolean) => {
    setChecked(value)
  }

  const onLocalizeClick = () => {
  }

  function onSaveToFiles(): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className={styles.MainPageLeftContent}>
      <TextInput value={prefix}
        onChange={onPrefixInputChange}
        placeholder={'Prefix (myKey)'}
      />
      <TextInput value={text}
        onChange={onTextInputChange}
        placeholder={'Text to localize'}
      />
      <CheckBox
        checked={checked}
        onChange={onCheckBoxChange}
        label={"Include default language when saving"}
      />
      <div className={styles.buttonWrapper}>
        <button onClick={onLocalizeClick}>
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