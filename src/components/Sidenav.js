import React, { Component } from 'react'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Button from 'react-toolbox/lib/button/Button'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon'
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
        className={`sidenav ${open? '':'hidden'}`}
        width={240}
        active={open}
        pinned={pinned}
        onOverlayClick={() => dispatch(toggleSidenavOpen())}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottom: '1px solid #ccc'
        }}>
          <Button
            onClick={() => dispatch(toggleSidenavPinned())}
            style={{
              textTransform: 'none',
              borderRadius: 0,
              width: '100%',
              textAlign: 'right'
            }}>
            {pinned? 'Desprender':'Fijar'} men&uacute;
            <FontIcon style={{ paddingLeft: '.75rem' }}
                      value={pinned? 'first_page':'last_page'} />
          </Button>
        </div>
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
