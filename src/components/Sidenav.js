import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import IconButton from 'react-toolbox/lib/button/IconButton'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
import MakeTooltip from 'react-toolbox/lib/tooltip'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'
import Avatar from './Avatar'
import './Sidenav.css'

const IconWithTooltip = MakeTooltip(FontIcon)

class Sidenav extends Component {
  constructor() {
    super()
    this.state = {
      showMainLinks: true
    }
  }
  render () {
    const mainLinks = (
      <List>
        <Link to="/projects">
          <ListItem leftIcon="work" caption="Proyectos" />
        </Link>
        <Link to="/clients">
          <ListItem leftIcon="business" caption="Clientes"></ListItem>
        </Link>
        <Link to="/users">
          <ListItem leftIcon="person" caption="Usuarios"></ListItem>
        </Link>
      </List>      
    )
    const userLinks = (
      <List>
        <Link to="/userprefs">
          <ListItem leftIcon="settings" caption="Preferencias" />
        </Link>
        <ListItem leftIcon="close" caption="Cerrar sesión" />
      </List>
    )
    const {open, responsive, dispatch} = this.props;
    const { showMainLinks } = this.state;
    return (
      <NavDrawer
        permanentAt="md" 
        className="sidenav"
        active={open}
        pinned={!responsive.small}
        onOverlayClick={() => dispatch(toggleSidenav())}>
        <header className="sidenav-header">
          <h2 style={{margin: 0, padding: '1rem 0'}}>Open Crono</h2>
          <div style={{display: 'flex'}}>
            <Avatar className="sidenav-avatar" />
            <section className="sidenav-times">
              <div>
                <IconWithTooltip tooltip="Tiempo de hoy" value="timer" />
                <span>00:00:00</span>
              </div>
              <div>
                <IconWithTooltip tooltip="Tiempo de la semana" value="date_range" />
                <span>00:00:00</span>
              </div>
              <div>
                <IconWithTooltip tooltip="Tiempo del mes" value="event_note" />
                <span>00:00:00</span>
              </div>
            </section>
          </div>
          <div className="sidenav-username">
            <p style={{flex: 1}} >Juan D. Jara</p>
            <IconButton 
              onClick={() => this.setState({ showMainLinks: !showMainLinks })} 
              inverse icon="arrow_drop_down" />
          </div>
        </header>
        {showMainLinks ? mainLinks : userLinks}
      </NavDrawer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidenavOpen,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(Sidenav)