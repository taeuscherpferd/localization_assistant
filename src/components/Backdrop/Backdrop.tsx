import React from 'react';
import { useLifeCycleAnimation } from 'src/hooks/useLifeCycleAnimation';
import styles from './Backdrop.module.scss';

interface BackdropProps {
  show: boolean
  showClose: boolean
  clicked?: Function
  shouldAnimate?: boolean
  fadeTime?: number
  showSpinner?: boolean
  styleOverride?: React.CSSProperties
}

export const Backdrop: React.FC<BackdropProps> = (props) => {
  const { show, clicked, showClose, shouldAnimate, fadeTime, showSpinner, styleOverride } = props;
  const [shouldRender, onAnimationEnd] = useLifeCycleAnimation(show)
  const closeButton = showClose ? <div aria-label="Close" className={styles.close_button}>❌</div> : null
  const isFadeTimeValid = fadeTime && fadeTime > 0

  const visibilityCondition = shouldAnimate === false ? show : shouldRender
  const animation = shouldAnimate === false ? '' : `${show ? styles.fadeIn : styles.fadeOut} ${isFadeTimeValid ? fadeTime?.toString() + "s" : "0.5s"}`

  return visibilityCondition ?
    <div aria-label="Overlay" className={`${styles.Backdrop}`} onClick={(e) => clicked && clicked(e)}
      onAnimationEnd={onAnimationEnd}
      style={{
        animation: animation,
        ...styleOverride
      }}
    >
      {showSpinner && <div className={show ? styles.busyIndicatorIn : styles.busyIndicatorOut}>
        {"💫"}
      </div>}
      {closeButton}
    </div>
    : null
}