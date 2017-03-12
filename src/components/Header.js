import React from 'react'
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import AppBar from 'material-ui/AppBar'
import Avatar from './Avatar'

/*
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
*/

const Header = (props) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <IconButton onTouchTap={props.onToggleSidenav}>
        <MenuIcon color="black"></MenuIcon>
      </IconButton>
      <div>
        <Avatar className="header-avatar"></Avatar>
      </div>
    </div>
  )
}

export default Header