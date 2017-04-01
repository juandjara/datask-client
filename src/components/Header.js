import React from 'react'
import Menu from 'react-toolbox/lib/menu/Menu';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import IconButton from 'react-toolbox/lib/button/IconButton';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import { connect } from 'react-redux';
import { logout } from '../reducers/user.reducer'
import Avatar from './Avatar'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  toggleMenu = () => this.setState(({showMenu}) => ({showMenu: !showMenu}))
  render() {
    const props = this.props;
    const { showMenu } = this.state;
    return (
      <AppBar fixed flat title="Datask"
              onLeftIconClick={props.onToggleSidenav}
              theme={{appBar: "header-appbar", title: "header-appbar-title"}}
              leftIcon="menu" rightIcon="search">
        <div style={{display: 'flex', alignItems:'center'}}>
          <p style={{margin: '0'}}>{props.username}</p>
          <Menu active={showMenu} onHide={this.toggleMenu}
                inverse icon="arrow_drop_down" position="topRight" menuRipple>
            <MenuItem icon="settings" caption="Preferencias" />
            <MenuItem icon="person" caption="Perfil" />
            <MenuItem onClick={logout} icon="close" caption="Cerrar sesión" />
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

const mapStateToProps = state => {
  return state.user ? { username: state.user.sub } : {}
}
export default connect(mapStateToProps)(Header)
