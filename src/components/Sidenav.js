import React from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'
import Avatar from './Avatar'
import './Sidenav.css'

const Sidenav = (props) => {
  return (
    <NavDrawer permanentAt="md" 
               className="sidenav"
               active={props.open}
               pinned={!props.responsive.small}
               onOverlayClick={() => props.dispatch(toggleSidenav())}>
      <header className="sidenav-header">
        Juan
      </header>
      <List>
        <Link to="/projects">
          <ListItem leftIcon="work" caption="Proyectos" />
        </Link>
        <Link>
          <ListItem leftIcon="business" caption="Clientes"></ListItem>
        </Link>
        <Link>
          <ListItem leftIcon="person" caption="Usuarios"></ListItem>
        </Link>
      </List>
      {/*
      <header className="sidenav-header" style={{backgroundColor: teal500}}>
        <div className="sidenav-header-top">
          <Avatar className="sidenav-avatar" />
          <div className="sidenav-times">
            <div><TimeIcon  color="white" className="sidenav-time-icon" />{'00:00:00'}</div>
            <div><TimeIcon2 color="white" className="sidenav-time-icon" />{'00:00:00'}</div>
            <div><TimeIcon3 color="white" className="sidenav-time-icon" />{'00:00:00'}</div>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} >
          <p className="sidenav-username">Juan Dominguez</p>
          <IconButton style={{padding: 0, width: 24, height: 24}}>
            <DownIcon color="white" />
          </IconButton>
        </div>
      </header>
      <Link to="/clients">
        <MenuItem primaryText="Clientes" leftIcon={<BuildingIcon />} />
      </Link>
      <Link to="/projects">
        <MenuItem primaryText="Proyectos" leftIcon={<WorkIcon />} />
      </Link>
      <Link to="/users">
        <MenuItem primaryText="Usuarios" leftIcon={<PersonIcon />} />
      </Link>
      */}
    </NavDrawer>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidenavOpen,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(Sidenav)