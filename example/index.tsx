/******************************************************
 * Created by nanyuantingfeng on 2019-03-29 17:46.
 *****************************************************/
import React from 'react'
import ReactDOM from 'react-dom/client'

import '../style/index.css'
import './index.css'

import { Modal } from '../src/Modal'

function App() {
  const [visible, setVisible] = React.useState(false)
  const [animation, setAnimation] = React.useState('zoom')

  const types = ['zoom', 'fade', 'flip', 'door', 'rotate', 'slideUp', 'slideDown', 'slideLeft', 'slideRight']

  return (
    <div className="wrap">
      <div className="container">
        <h1 className="title scale">React-Resizable-Modal</h1>
        <h3 className="intro scale">A React Resizable and Draggable Modal with Animations.</h3>
        <div className="btn-area">
          {types.map((value, index) => (
            <button
              key={index}
              className="btn scale"
              onClick={() => {
                setVisible(true)
                setAnimation(value)
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <Modal visible={visible} onClose={() => setVisible(false)} animation={animation}>
        <div className="modal-header">React-Resizable-Modal</div>
        <div className="modal-body">
          <h1>A React modal with animations.</h1>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
          <p>A React modal with animations.</p>
        </div>
      </Modal>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
