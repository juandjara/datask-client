import React from 'react'
import templateImage from '../../assets/fuken-comic-avatar.jpg'

const Avatar = (props) => {
  return (
    <img {...props} src={templateImage} alt="Avatar"/>
  )
}

export default Avatar
