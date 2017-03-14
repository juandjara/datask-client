import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton';
import Avatar from './Avatar'

const Header = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <IconButton icon="menu" onClick={props.onToggleSidenav} />
      <div>
        <Avatar className="header-avatar"></Avatar>
      </div>
    </div>
  )
}

export default Header