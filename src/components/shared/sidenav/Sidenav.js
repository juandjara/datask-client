import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import IconButton from 'react-toolbox/lib/button/IconButton'
import {TaskQuickAccess} from '../taskQuickAccess'
import {TimeCounters} from '../timeCounters'
import Avatar from '../Avatar'
import Flex from '../Flex'
import MenuLink from './MenuLink'

import './Sidenav.css'

class Sidenav extends Component {
  state = {profileMenuActive: false}
  toggleProfileMenu = () => {
    this.setState(({profileMenuActive}) => ({
      profileMenuActive: !profileMenuActive
    }))
  }
  logout = () => {
    this.props.actions.logout()
  }
  render () {
    const {times, sidenav, profile, actions} = this.props;
    const {profileMenuActive} = this.state;
    return (
      <NavDrawer
        permanentAt="md"
        className="sidenav"
        active={sidenav.open}
        pinned={sidenav.pinned}
        onOverlayClick={actions.toggleSidenavOpen}>
        <Flex align="center">
          <Avatar />
          <h3>{profile.full_name}</h3>
          <IconButton
            inverse
            icon={`arrow_drop_${profileMenuActive ? 'up':'down'}`} 
            onClick={this.toggleProfileMenu} 
          />
        </Flex>
        {profileMenuActive && (
          <div className="sidenav-links">
            <MenuLink 
              to="/profile"
              icon="account_circle" 
              text="Mi cuenta" />
            <MenuLink 
              onClick={this.logout} 
              icon="clear" 
              text="Cerrar sesión" />
          </div>
        )}
        <TimeCounters style={{height: 'auto'}} />
        <TaskQuickAccess times={times} style={{maxHeight: '140px'}} />
        <div className="sidenav-links">
          <MenuLink to="/projects" icon="work" text="Proyectos" />
          <MenuLink to="/users" icon="person" text="Usuarios" />
          <MenuLink to="/clients" icon="business" text="Clientes" />
          <MenuLink to="/reports" icon="timeline" text="Reportes" />          
        </div>
      </NavDrawer>
    )
  }
}

export default Sidenav
