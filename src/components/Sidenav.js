import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Button from 'react-toolbox/lib/button/Button'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import TaskQuickAccess from './TaskQuickAccess'
import TimeCounters from './TimeCounters'
import Avatar from './Avatar'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { toggleSidenavOpen, toggleSidenavPinned } from '../reducers/sidenav.reducer'
import './Sidenav.css'

class Sidenav extends Component {
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
    const {open, pinned, dispatch} = this.props;
    return (
      <NavDrawer
        permanentAt="md"
        className={`sidenav ${open? '':''}`}
        active={open}
        pinned={pinned}
        onOverlayClick={() => dispatch(toggleSidenavOpen())}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Avatar style={{borderRadius: '50%', padding: '.5em'}} />
          <h3>Juan D. Jara</h3>
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
        <List>
          <Link to="/projects">
            <ListItem leftIcon="work" caption="Proyectos" />
          </Link>
          <Link to="/clients">
            <ListItem leftIcon="business" caption="Clientes" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Usuarios" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Enlace 4" />
          </Link>
          <Link to="/users">
            <ListItem leftIcon="person" caption="Enlace 5" />
          </Link>
        </List>
      </NavDrawer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.sidenav.open,
    pinned: state.sidenav.pinned,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(Sidenav)
