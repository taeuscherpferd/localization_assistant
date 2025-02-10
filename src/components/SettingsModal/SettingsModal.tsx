import ModalBase from 'src/components/ModalBase/ModalBase'
import styles from './SettingsModal.module.scss'

interface SettingsModalProps {
  shouldDisplay: boolean
  toggleShouldDisplay: () => void
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { shouldDisplay, toggleShouldDisplay } = props
  return (
    <ModalBase toggleShouldDisplay={toggleShouldDisplay} shouldDisplay={shouldDisplay}>
      <div className={styles.SettingsModal}>

      </div>
    </ModalBase>
  )
}