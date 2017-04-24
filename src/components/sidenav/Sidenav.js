import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import MenuItem from 'react-toolbox/lib/menu/MenuItem'
import TaskQuickAccess from '../taskQuickAccess/TaskQuickAccess'
import TimeCounters from '../timeCounters/TimeCounters'
import Avatar from '../Avatar'
import Flex from '../Flex'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenavOpen } from '../../reducers/sidenav.reducer'
import './Sidenav.css'

class Sidenav extends Component {
  state = {profileMenuActive: false}
  toggleProfileMenu = () => {
    this.setState(({profileMenuActive}) => ({profileMenuActive: !profileMenuActive}))
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
          <Link to="/profile">
            <MenuItem className="sidenav-link" icon="account_circle" caption="Perfil" />
          </Link>
          <MenuItem className="sidenav-link" icon="settings" caption="Preferencias" />
          <MenuItem className="sidenav-link" icon="clear" caption="Cerrar sesión" />
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
        <div className="sidenav-links">
          <Link to="/projects">
            <MenuItem className="sidenav-link" icon="work" caption="Proyectos" />
          </Link>
          <Link to="/clients">
            <MenuItem className="sidenav-link" icon="business" caption="Clientes" />
          </Link>
          <Link to="/users">
            <MenuItem className="sidenav-link" icon="person" caption="Usuarios" />
          </Link>
          <Link to="/users">
            <MenuItem className="sidenav-link" icon="person" caption="Enlace 4" />
          </Link>
          <Link to="/users">
            <MenuItem className="sidenav-link" icon="person" caption="Enlace 5" />
          </Link>
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
