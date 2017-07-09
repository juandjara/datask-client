import React from 'react'
import templateImage from '../assets/fuken-comic-avatar.jpg'
import { connect } from 'react-redux'
import Avatar from 'react-toolbox/lib/avatar/Avatar'

const UserAvatar = (props) => {
  const {name, surname} = props.profile
  const title = `${name} ${surname}`
  return (
    <Avatar {...props} className="header-avatar" title={title} />
  )
}

const mapStateToProps = state => ({profile: state.profile})

export default connect(mapStateToProps)(UserAvatar)
