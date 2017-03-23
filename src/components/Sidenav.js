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
  toggleLinks() {
    const animationTime = 400; // ms
    if(this.state.showMainLinks) {
      this.setState(prev => ({
        animationClass: 'animated slideInLeft',
        showMainLinks: !prev.showMainLinks
      }), () => {
        setTimeout(() => {
          this.setState({ animationClass: '' })
        }, animationTime)
      })
    } else {
      this.setState({
        animationClass: 'animated slideOutLeft'
      }, () => {
        setTimeout(() => {
          this.setState(prev => ({
            showMainLinks: !prev.showMainLinks,
            animationClass: ''
          }))
        }, animationTime)
      })
    }
  }
  getAnimClass() {
    return this.state.animationClass;
  }
  render () {
    const mainLinks = (
      <List className="animated slideInLeft">
        <Link to="/projects">
          <ListItem leftIcon="work" caption="Proyectos" />
        </Link>
        <Link to="/clients">
          <ListItem leftIcon="business" caption="Clientes" />
        </Link>
        <Link to="/users">
          <ListItem leftIcon="person" caption="Usuarios" />
        </Link>
      </List>
    )
    const userLinks = (
      <List key="sidenav1" className={this.getAnimClass()}>
        <Link to="/userprefs">
          <ListItem leftIcon="settings" caption="Preferencias" />
        </Link>
        <Link to="/account">
          <ListItem leftIcon="account_circle" caption="Cuenta de usuario" />
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
        width={240}
        active={open}
        pinned={!responsive.small}
        onOverlayClick={() => dispatch(toggleSidenav())}>
        {showMainLinks ? null : [userLinks, (<div key="sidenav2" className="divider"></div>)]}
        {mainLinks}
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