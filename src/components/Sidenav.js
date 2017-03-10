import React from 'react'
import BuildingIcon from 'material-ui/svg-icons/communication/business'
import WorkIcon from 'material-ui/svg-icons/action/work'
import PersonIcon from 'material-ui/svg-icons/social/person'
import { blue500 } from 'material-ui/styles/colors'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'
import { small } from '../utils/mediaQueries'

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
            docked={!small()}
            onRequestChange={(open) => this.setState({open})}>
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

export default Sidenav