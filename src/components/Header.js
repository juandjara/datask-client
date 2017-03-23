import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import ShowOnMedia from './ShowOnMedia'
import Avatar from './Avatar'
import TaskQuickAccess from './TaskQuickAccess'
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
  /*
  return (
    <header className="Header">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconButton icon="menu" onClick={props.onToggleSidenav} />
        <h2 style={{margin: 0}}> Open Crono </h2>      
      </div>
      <ShowOnMedia queryKey="small">
      </ShowOnMedia>
      <Icon title="Tareas destacadas" className="task-cards-star">star</Icon>        
      <TaskQuickAccess />
    </header>
  )
  */
}

export default Header