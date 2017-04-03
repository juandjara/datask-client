import React from 'react'
import Menu from 'react-toolbox/lib/menu/Menu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import IconButton from 'react-toolbox/lib/button/IconButton';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import { connect } from 'react-redux';
import { logout } from '../reducers/auth.reducer'
import Avatar from './Avatar'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  onToggleMenu = () => this.setState(({showMenu}) => ({showMenu: !showMenu}))
  onLogout = () => {
    this.props.dispatch(logout());
  }
  render() {
    const props = this.props;
    const { showMenu } = this.state;
    return (
      <AppBar fixed flat title="Datask"
              onLeftIconClick={props.onToggleSidenav}
              theme={{appBar: "header-appbar", title: "header-appbar-title"}}
              leftIcon="menu">
        <div style={{display: 'flex', alignItems:'center'}}>
          <Menu active={showMenu} onHide={this.toggleMenu}
                className="below-navbar"
                inverse icon="arrow_drop_down" position="topRight" menuRipple>
            <MenuItem icon="settings" caption="Preferencias" />
            <MenuItem icon="account_circle" caption="Perfil" />
            <MenuItem onClick={this.onLogout} icon="close" caption="Cerrar sesión" />
          </Menu>
          <IconButton inverse icon="search" />
          <div className="divider"></div>
          <p style={{margin: '0 1em'}}>{props.username}</p>
          <Avatar onClick={this.onToggleMenu}
                  className="header-avatar" />
          <IconButton onClick={this.onToggleMenu}
                      style={{marginRight: -12}}
                      inverse icon="arrow_drop_down" />
        </div>
      </AppBar>
    )
  }
}

const mapStateToProps = state => {
  return { username: state.auth.sub }
}
export default connect(mapStateToProps)(Header)
