import React from 'react'
import { connect } from 'react-redux'
import Avatar from 'react-avatar'

const UserAvatar = ({profile, dispatch, ...props}) => {
  const name = `${profile.name || ''} ${profile.surname || ''}`
  return (
    <Avatar name={name} round={true} size={50} {...props} style={{margin: '.5em'}} />      
  )
}

const mapStateToProps = state => ({profile: state.profile})

export default connect(mapStateToProps)(UserAvatar)
