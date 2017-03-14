import React from 'react'
import BuildingIcon from 'material-ui/svg-icons/communication/business'
import WorkIcon from 'material-ui/svg-icons/action/work'
import PersonIcon from 'material-ui/svg-icons/social/person'
import TimeIcon from 'material-ui/svg-icons/image/timer'
import TimeIcon2 from 'material-ui/svg-icons/action/today'
import TimeIcon3 from 'material-ui/svg-icons/action/date-range'
import DownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { teal500 } from 'material-ui/styles/colors'
import { Drawer, MenuItem, IconButton } from 'material-ui';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'
import Avatar from './Avatar'
import './Sidenav.css'

const Sidenav = (props) => {
  return (
    <Drawer open={props.open}
            className="sidenav"
            docked={!props.responsive.small}
            onRequestChange={(open) => props.dispatch(toggleSidenav())}>
      <section className="sidenav-header" style={{backgroundColor: teal500}}>
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
      </section>
      <Link to="/clients">
        <MenuItem primaryText="Clientes" leftIcon={<BuildingIcon />} />
      </Link>
      <Link to="/projects">
        <MenuItem primaryText="Proyectos" leftIcon={<WorkIcon />} />
      </Link>
      <Link to="/users">
        <MenuItem primaryText="Usuarios" leftIcon={<PersonIcon />} />
      </Link>
    </Drawer>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidenavOpen,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(Sidenav)