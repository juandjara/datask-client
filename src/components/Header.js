import React from 'react'
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Avatar from './Avatar'
import './Header.css'

const Header = (props) => {
  return (
    <AppBar fixed flat title="Datask"
            onLeftIconClick={props.onToggleSidenav}
            theme={{appBar: "header-appbar", title: "header-appbar-title"}}
            leftIcon="menu" rightIcon="search">
      <div style={{display: 'flex', alignItems:'center'}}>
        <IconMenu inverse icon="arrow_drop_down" position="topRight" menuRipple>
          <MenuItem icon="settings" caption="Preferencias" />
          <MenuItem icon="person" caption="Perfil" />
          <MenuItem icon="close" caption="Cerrar sesión" />
        </IconMenu>
        <Avatar className="header-avatar" />
      </div>
    </AppBar>
  )
}

export default Header