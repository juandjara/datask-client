import React from 'react'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import AppBar from 'material-ui/AppBar'

const Header = (props) => {
  return (
    <AppBar 
      title="Open Crono"
      onLeftIconButtonTouchTap={props.onToggleSidenav}
      iconElementLeft={(
        <IconButton>
          <MenuIcon color="black"></MenuIcon>
        </IconButton>
      )}
      style={{boxShadow: "none", backgroundColor: "transparent"}}
      titleStyle={{color: "black"}}
    >
    </AppBar>
  )
}

export default Header