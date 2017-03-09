import React from 'react'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

const Header = (props) => {
  return (
    <div className="header">
      <IconButton onTouchTap={props.onToggleSidenav} >
        <MenuIcon></MenuIcon>
      </IconButton>
    </div>
  )
}

export default Header