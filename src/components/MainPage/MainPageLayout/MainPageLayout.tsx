import styles from './MainPageLayout.module.scss'

interface MainPageLayoutProps {
  LeftContent: React.ReactNode
  CenterContent: React.ReactNode
  RightContent: React.ReactNode
}

export const MainPageLayout = (props: MainPageLayoutProps) => {
  const { RightContent, LeftContent, CenterContent } = props
  return (
    <div className={styles.MainPageLayout}>
      <div className={styles.leftContent}>
        {LeftContent}
      </div>
      <div className={styles.centerContent}>
        {CenterContent}
      </div>
      <div className={styles.rightContent}>
        {RightContent}
      </div>
    </div>
  )
}