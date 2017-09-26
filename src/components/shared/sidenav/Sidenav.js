import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import IconButton from 'react-toolbox/lib/button/IconButton'

import {TaskQuickAccess} from '../taskQuickAccess'
import {TimeCounters} from '../timeCounters'
import Avatar from '../Avatar'
import Flex from '../Flex'
import MenuLink from './MenuLink'
import {logout} from 'reducers/auth.reducer'
import {toggleSidenavOpen} from 'reducers/sidenav.reducer'
import './Sidenav.css'

class Sidenav extends Component {
  state = {profileMenuActive: false}
  toggleProfileMenu = () => {
    this.setState(({profileMenuActive}) => ({profileMenuActive: !profileMenuActive}))
  }
  logout = () => {
    this.props.actions.logout()
  }
  render () {
    const {open, pinned, profile, actions} = this.props;
    const {profileMenuActive} = this.state;
    const {loading, name, surname} = profile
    const fullname = loading ? 'Cargando ...' : `${name} ${surname}`
    return (
      <NavDrawer
        permanentAt="md"
        className="sidenav"
        active={open}
        pinned={pinned}
        onOverlayClick={actions.toggleSidenavOpen}>
        <Flex align="center">
          <Avatar />
          <h3>{fullname}</h3>
          <IconButton
            inverse
            icon={`arrow_drop_${profileMenuActive ? 'up':'down'}`} 
            onClick={this.toggleProfileMenu} 
          />
        </Flex>
        <div className="sidenav-links" style={{
          display: profileMenuActive? 'block':'none'
        }}>
          <MenuLink to="/profile" icon="account_circle" text="Mi cuenta" />
          <MenuLink to="/prefs" icon="settings" text="Preferencias" />
          <MenuLink onClick={this.logout} icon="clear" text="Cerrar sesión" />
        </div>
        <TimeCounters style={{height: 'auto'}} />
        <TaskQuickAccess style={{maxHeight: '140px'}} />
        <div className="sidenav-links">
          <MenuLink to="/projects" icon="work" text="Proyectos" />
          <MenuLink to="/clients" icon="business" text="Clientes" />
          <MenuLink to="/users" icon="person" text="Usuarios" />
        </div>
      </NavDrawer>
    )
  }
}

const mapStateToProps = ({sidenav, profile, responsive}) => ({
  ...sidenav, responsive, profile
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout, toggleSidenavOpen }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav)
