import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Button from 'react-toolbox/lib/button/Button'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Menu from 'react-toolbox/lib/menu/Menu'
import MenuItem from 'react-toolbox/lib/menu/MenuItem'
import TaskQuickAccess from './TaskQuickAccess'
import TimeCounters from './TimeCounters'
import Avatar from './Avatar'
import Flex from './Flex'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenavOpen, toggleSidenavPinned } from '../reducers/sidenav.reducer'
import './Sidenav.css'

class Sidenav extends Component {
  state = {profileMenuActive: false}
  toggleProfileMenu = () => {
    this.setState(({profileMenuActive}) => ({profileMenuActive: !profileMenuActive}))
  }
  render () {
    const {open, pinned, profile, dispatch} = this.props;
    const {profileMenuActive} = this.state;
    return (
      <NavDrawer
        permanentAt="md"
        className={`sidenav-green ${open? '':''}`}
        active={open}
        pinned={pinned}
        onOverlayClick={() => dispatch(toggleSidenavOpen())}>
        <Flex align="center">
          <Avatar style={{borderRadius: '50%', padding: '.5em'}} />
          <h3>{profile.firstName} {profile.lastName}</h3>
          <IconButton
            icon={`arrow_drop_${profileMenuActive ? 'up':'down'}`}
            inverse onClick={this.toggleProfileMenu} />
        </Flex>
        <div className="sidenav-links" style={{
          marginBottom: '1em ',
          display: profileMenuActive? 'block':'none'
        }}>
          <Link to="/profile">
            <MenuItem style={{
              borderBottom: '1px solid #ccc',
            }} icon="account_circle" caption="Perfil" />
          </Link>
          <MenuItem style={{
            borderBottom: '1px solid #ccc',
          }} icon="settings" caption="Preferencias" />
          <MenuItem style={{
            borderBottom: '1px solid #ccc',
          }} icon="clear" caption="Cerrar sesión" />
        </div>
        <TimeCounters style={{height: 'auto'}} />
        <p style={{margin: '.5em'}}>
          <Icon value="star" style={{
            fontSize: 'inherit',
            color: 'var(--palette-amber-500)',
            paddingRight: '4px'
          }} />
          Tareas destacadas
        </p>
        <TaskQuickAccess style={{maxHeight: '140px'}} />
        <List className="sidenav-links">
          <Link to="/projects">
            <ListItem leftIcon="work" caption="Proyectos" />
          </Link>
          <Link to="/clients">
            <ListItem leftIcon="business" caption="Clientes" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Usuarios" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Enlace 4" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Enlace 5" />
          </Link>
        </List>
      </NavDrawer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidenav.open,
    pinned: state.sidenav.pinned,
    responsive: state.responsive,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Sidenav)
