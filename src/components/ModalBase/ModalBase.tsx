import { createPortal } from "react-dom";
import { Backdrop } from "src/components/Backdrop/Backdrop";
import { useLifeCycleAnimation } from "src/hooks/useLifeCycleAnimation";
import styles from './ModalBase.module.scss';

interface ModalBaseProps {
  toggleShouldDisplay: Function
  shouldDisplay: boolean

  isLoading?: boolean
  children?: React.ReactNode
  showCloseButton?: boolean
  showBackdrop?: boolean
  backDropStyles?: React.CSSProperties
  contentStyles?: React.CSSProperties
  className?: string
  customInAnimation?: string
  customOutAnimation?: string
  themeOverride?: string
};

const ModalBase = (props: ModalBaseProps) => {
  const [shouldRender, onAnimationEnd] = useLifeCycleAnimation(!props.isLoading && props.shouldDisplay)

  const { className } = props

  let portalDiv = document.getElementById("portal")

  if (!portalDiv) {
    portalDiv = document.createElement("div")
    portalDiv.setAttribute('id', 'portal')
    document.body.appendChild(portalDiv)
  }

  const moveDown = !props.isLoading && props.shouldDisplay
  const spinner = props.isLoading ? "💫" : null
  const inAnimation = props.customInAnimation ? props.customInAnimation : styles.slideIn
  const outAnimation = props.customOutAnimation ? props.customOutAnimation : styles.slideOut
  let toggle = props.toggleShouldDisplay;

  const backDrop = props.showBackdrop === false ? null :
    <Backdrop show={props.shouldDisplay} showClose={props.showCloseButton ?? true} clicked={() => toggle()} fadeTime={1} styleOverride={props.backDropStyles} />

  return createPortal((
    <>
      {spinner}
      {
        shouldRender ?
          /* NOTE: I know that this is gross, but until portals can share contexts we're a little stuck here */
          <>
            {backDrop}
            <div aria-label={"Modal Base"} className={`${styles.popup_root} ${className}`} style={{ animation: `${moveDown ? inAnimation : outAnimation} 0.3s`, ...props.contentStyles }} onAnimationEnd={onAnimationEnd}>
              {props.children}
            </div>
          </>
          : null
      }
    </>
  ), portalDiv);
}

export default ModalBase;
