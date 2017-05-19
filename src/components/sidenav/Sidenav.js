import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import IconButton from 'react-toolbox/lib/button/IconButton'
import TaskQuickAccess from '../taskQuickAccess/TaskQuickAccess'
import TimeCounters from '../timeCounters/TimeCounters'
import Avatar from '../Avatar'
import Flex from '../Flex'
import MenuLink from './MenuLink'
import { connect } from 'react-redux'
import { toggleSidenavOpen } from '../../reducers/sidenav.reducer'
import { logout } from '../../reducers/auth.reducer'
import './Sidenav.css'

class Sidenav extends Component {
  state = {profileMenuActive: false}
  toggleProfileMenu = () => {
    this.setState(({profileMenuActive}) => ({profileMenuActive: !profileMenuActive}))
  }
  logout = () => {
    this.props.dispatch(logout())
  }
  render () {
    const {open, pinned, profile, dispatch} = this.props;
    const {profileMenuActive} = this.state;
    const name = profile.loading ? 'Cargando ...' : `${profile.firstName} ${profile.lastName}`
    return (
      <NavDrawer
        permanentAt="md"
        className={`sidenav ${open? '':''}`}
        active={open}
        pinned={pinned}
        onOverlayClick={() => dispatch(toggleSidenavOpen())}>
        <Flex align="center">
          <Avatar style={{borderRadius: '50%', padding: '.5em'}} />
          <h3>{name}</h3>
          <IconButton
            icon={`arrow_drop_${profileMenuActive ? 'up':'down'}`}
            inverse onClick={this.toggleProfileMenu} />
        </Flex>
        <div className="sidenav-links" style={{
          marginTop: 0,
          display: profileMenuActive? 'block':'none'
        }}>
          <MenuLink to="/profile" icon="account_circle" text="Perfil" />
          <MenuLink to="/prefs" icon="settings" text="Preferencias" />
          <MenuLink onClick={this.logout} icon="clear" text="Cerrar sesión" />
        </div>
        <TimeCounters style={{height: 'auto'}} />
        <TaskQuickAccess style={{maxHeight: '140px'}} />
        <div className="sidenav-links">
          <MenuLink to="/projects" icon="work" text="Proyectos" />
          <MenuLink to="/clients" icon="business" text="Clientes" />
          <MenuLink to="/users" icon="person" text="Usuarios" />
          <MenuLink to="/reports" icon="warning" text="Reportes" />
        </div>
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
