/******************************************************
 * Created by nanyuantingfeng on 2019-06-05 11:25.
 *****************************************************/
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export interface IPortalProps {
  elementId?: string
}

export const Portal: React.FunctionComponent<IPortalProps> = (props) => {
  const { elementId, children } = props
  const $el = useRef(document.getElementById(elementId) || document.createElement('div'))
  const [dynamic] = useState(!$el.current.parentElement)

  useEffect(() => {
    if (dynamic) {
      if (elementId) $el.current.id = elementId
      document.body.appendChild($el.current)
    }

    return () => {
      if (dynamic) $el.current.parentElement?.removeChild($el.current)
    }
  }, [elementId])

  return createPortal(children, $el.current)
}
