import { MainPageCenterContent } from 'src/components/MainPage/MainPageCenterContent/MainPageCenterContent'
import { MainPageLayout } from 'src/components/MainPage/MainPageLayout/MainPageLayout'
import { MainPageLeftContent } from 'src/components/MainPage/MainPageLeftContent/MainPageLeftContent'
import { MainPageRightContent } from 'src/components/MainPage/MainPageRightContent/MainPageRightContent'
import styles from './MainPage.module.scss'

interface MainPageProps {
}

export const MainPage = (props: MainPageProps) => {
  return (
    <div className={styles.MainPage}>
      <MainPageLayout
        LeftContent={<MainPageLeftContent />}
        CenterContent={<MainPageCenterContent />}
        RightContent={<MainPageRightContent />}
      />
    </div>
  )
}