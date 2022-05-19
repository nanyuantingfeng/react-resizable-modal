/******************************************************
 * Created by nanyuantingfeng on 2019-03-29 17:46.
 *****************************************************/
import React from 'react'

export interface IPanelProps {
  width?: number | `${string}%` | string
  height?: number | `${string}%` | string
  measure?: string
  showCloseButton?: boolean
  animationType?: 'enter' | 'leave'
  animation?:
    | 'zoom'
    | 'fade'
    | 'flip'
    | 'door'
    | 'rotate'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | string
  enterAnimation?: IPanelProps['animation']
  leaveAnimation?: IPanelProps['animation']
  duration?: number
  className?: string
  customStyles?: React.CSSProperties
  onClose?: (event?: React.MouseEvent) => void
}

export const Panel: React.FunctionComponent<IPanelProps> = (props) => {
  const { animationType, enterAnimation, leaveAnimation, animation, showCloseButton, onClose } = props

  const animation2 = (animationType === 'enter' ? enterAnimation : leaveAnimation) || animation
  const className = `react-resizeable-modal-panel react-resizeable-modal-${animation2}-${animationType}`
  const closeBtn = showCloseButton ? <span className="react-resizeable-modal-close" onClick={onClose} /> : null

  const { width, height, measure, duration, customStyles } = props

  const styles = {
    width: width + measure,
    height: height + measure,
    animationDuration: duration + 'ms',
    WebkitAnimationDuration: duration + 'ms',
    ...customStyles
  }

  return (
    <div style={styles} className={className}>
      {props.children}
      {closeBtn}
    </div>
  )
}
