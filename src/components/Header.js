import React from 'react'
import Menu from 'react-toolbox/lib/menu/Menu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import IconButton from 'react-toolbox/lib/button/IconButton';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import { browserHistory } from 'react-router'
import Avatar from './Avatar'
import { logout } from '../reducers/user.reducer'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  toggleMenu = () => this.setState(({showMenu}) => ({showMenu: !showMenu}))
  logout = () => {
    logout();
    browserHistory.push('/login');
  }
  render() {
    const props = this.props;
    const { showMenu } = this.state;
    return (
      <AppBar fixed flat title="Datask"
              onLeftIconClick={props.onToggleSidenav}
              theme={{appBar: "header-appbar", title: "header-appbar-title"}}
              leftIcon="menu" rightIcon="search">
        <div style={{display: 'flex', alignItems:'center'}}>
          <Menu active={showMenu} onHide={this.toggleMenu}
                inverse icon="arrow_drop_down" position="topRight" menuRipple>
            <MenuItem icon="settings" caption="Preferencias" />
            <MenuItem icon="person" caption="Perfil" />
            <MenuItem onClick={this.logout} icon="close" caption="Cerrar sesión" />
          </Menu>
          <IconButton onClick={this.toggleMenu}
                      inverse icon="arrow_drop_down" />
          <Avatar onClick={this.toggleMenu}
                  className="header-avatar" />
        </div>
      </AppBar>
    )
  }
}

export default Header
