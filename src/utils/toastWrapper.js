import React from 'react'
import { toast } from 'react-toastify';

const ToastBody = ({text}) => (
  <p style={{
    background: '#333',
    color: 'white'
  }}>{text}</p>
)
export default function(type, text) {
  toast[type](<ToastBody text={text} />)
}
