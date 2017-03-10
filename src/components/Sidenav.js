import React from 'react'
import BuildingIcon from 'material-ui/svg-icons/communication/business'
import WorkIcon from 'material-ui/svg-icons/action/work'
import PersonIcon from 'material-ui/svg-icons/social/person'
import { blue500 } from 'material-ui/styles/colors'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'

const Sidenav = (props) => {
  const styles = {
    sidenavHeader: {
      height: 120,
      backgroundColor: blue500,
      color: 'white',
      display: 'flex',
      alignItems: 'flex-end'
    },
    sidenavLink: {
      textDecoration: 'none'
    }
  }
  return (
    <Drawer width={props.open ? 240 : null}
            open={props.open}
            docked={!props.responsive.small}
            onRequestChange={(open) => props.dispatch(toggleSidenav())}>
      <section style={styles.sidenavHeader}>
        <p style={{marginLeft: "1em"}}>Juan Dominguez</p>
      </section>
      <Link style={styles.sidenavLink} to="/clients">
        <MenuItem 
          primaryText="Clientes"
          leftIcon={<BuildingIcon />} />
      </Link>
      <Link style={styles.sidenavLink} to="/projects">
        <MenuItem 
          primaryText="Proyectos"
          leftIcon={<WorkIcon />} />
      </Link>
      <Link style={styles.sidenavLink} to="/users">
        <MenuItem 
          primaryText="Usuarios"
          leftIcon={<PersonIcon />} />
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