/******************************************************
 * Created by nanyuantingfeng on 2019-03-29 17:46.
 *****************************************************/
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import { Portal } from './Portal'
import { Panel, IPanelProps } from './Panel'

export type IModalProps = {
  visible?: boolean
  showMask?: boolean
  closeOnEsc?: boolean
  closeOnMaskClick?: boolean
  onClose?: (event?: React.MouseEvent) => void
  onAnimationEnd?: () => void
  customMaskStyles?: React.CSSProperties
  minWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
} & Omit<IPanelProps, 'animationType'>

export const Modal: React.FunctionComponent<IModalProps> = (props) => {
  const [isShowing, setIsShowing] = useState<boolean>(props.visible)
  const [animationType, setAnimationType] = useState<'enter' | 'leave'>()
  const containerRef = useRef<HTMLDivElement>()

  const calculateRndPoint = useCallback((width: string | number, height: string | number) => {
    const cac = (value: string | number, clientValue: number) => {
      if (typeof value === 'string') {
        if (value.indexOf('%') === -1) {
          value = Number(value)
        } else {
          value = (clientValue * Number(value.replace('%', ''))) / 100
        }
      }
      return clientValue - value
    }
    const x = cac(width, document.body.clientWidth)
    const y = cac(height, document.body.clientHeight)
    return { x: x / 4, y: y / 8, width, height }
  }, [])

  const animationEnd = useCallback(
    (event?: React.AnimationEvent) => {
      if (animationType === 'leave') {
        setIsShowing(false)
      } else if (props.closeOnEsc) {
        containerRef.current.focus?.()
      }

      if (event.target === containerRef.current) props.onAnimationEnd?.()
    },
    [animationType]
  )

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (props.closeOnEsc && (event.code === 'Escape' || event.keyCode === 27)) props.onClose?.()
    }
    window.document.body.addEventListener('keyup', onKeyUp)
    return () => window.document.body.removeEventListener('keyup', onKeyUp)
  }, [])

  useEffect(() => {
    if (props.visible) setIsShowing(true)
    setAnimationType(props.visible ? 'enter' : 'leave')
  }, [props.visible])

  return (
    <Portal>
      <div
        style={{
          display: isShowing ? '' : 'none',
          animationDuration: props.duration + 'ms',
          WebkitAnimationDuration: props.duration + 'ms'
        }}
        className={`react-resizeable-modal react-resizeable-modal-fade-${animationType}`}
        onAnimationEnd={animationEnd}
        ref={containerRef}
      >
        {props.showMask ? (
          <div
            className="react-resizeable-modal-mask"
            style={props.customMaskStyles}
            onClick={props.closeOnMaskClick ? props.onClose : null}
          />
        ) : null}

        <Rnd
          default={calculateRndPoint(props.width, props.height)}
          style={{ zIndex: 100 }}
          maxHeight={props.maxHeight}
          maxWidth={props.maxWidth}
          minHeight={props.minHeight}
          minWidth={props.minWidth}
        >
          <Panel
            width={props.width}
            height={props.height}
            measure={props.measure}
            showCloseButton={props.showCloseButton}
            animation={props.animation}
            enterAnimation={props.enterAnimation}
            leaveAnimation={props.leaveAnimation}
            duration={props.duration}
            className={props.className}
            customStyles={props.customStyles}
            onClose={props.onClose}
            children={props.children}
            animationType={animationType}
          />
        </Rnd>
      </div>
    </Portal>
  )
}

Modal.defaultProps = {
  width: '50%',
  height: '40%',
  measure: 'px',
  visible: false,
  showMask: true,
  closeOnEsc: true,
  closeOnMaskClick: true,
  showCloseButton: true,
  animation: 'zoom',
  enterAnimation: '',
  leaveAnimation: '',
  duration: 300,
  className: '',
  customStyles: {},
  customMaskStyles: {}
}
