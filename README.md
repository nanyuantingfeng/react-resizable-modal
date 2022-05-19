# react-resizeable-modal


## Installation

React 16.8+

    npm i react-resizeable-modal

## Usage

```typescript jsx
import React, { useState } from 'react'
import Modal from 'react-resizeable-modal'

// include styles
import 'react-resizeable-modal/style/index.css'

function App() {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setVisible(true)}>show</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <div>Content</div>
      </Modal>
    </div>
  )
}
```

## Props

| Property         | Type     | Default | Description                                          |
| ---------------- | -------- | ------- | ---------------------------------------------------- |
| width            | number   | -       | width of panel                                       |
| height           | number   | -       | height of panel                                      |
| measure          | string   | px      | measure of width and height                          |
| onClose          | function | /       | handler called onClose of modal                      |
| onAnimationEnd   | function | /       | handler called onEnd of animation                    |
| visible          | bool     | false   | whether to show panel                                |
| showMask         | bool     | true    | whether to show mask                                 |
| closeOnEsc       | bool     | false   | whether close dialog when esc pressed                |
| closeMaskOnClick | bool     | true    | whether close dialog when mask clicked               |
| showCloseButton  | bool     | true    | whether to show close button                         |
| animation        | string   | zoom    | animation type                                       |
| enterAnimation   | string   | /       | enter animation type (higher order than 'animation') |
| leaveAnimation   | string   |         | leave animation type (higher order than 'animation') |
| duration         | number   | 300     | animation duration                                   |
| className        | string   | /       | className for the container                          |
| customStyles     | object   | /       | custom styles for the container                      |
| customMaskStyles | object   | /       | custom mask styles for mask layer                    |

## Animation Types

- zoom
- fade
- flip
- door
- rotate
- slideUp
- slideDown
- slideLeft
- slideRight
