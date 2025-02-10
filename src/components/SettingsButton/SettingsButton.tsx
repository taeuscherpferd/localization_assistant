import styles from './SettingsButton.module.scss'

interface SettingsButtonProps {
  onClick: () => void
}

export const SettingsButton = (props: SettingsButtonProps) => {
  return (
    <button onClick={props.onClick} className={styles.SettingsButton}>
      ⚙️
    </button>
  )
}