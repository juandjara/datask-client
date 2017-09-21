import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ShowOnMedia from '../ShowOnMedia'
import { reducer as auth } from '../../features/login'
import { reducer as sidenav } from '../../components/sidenav'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  onToggleMenu = () => {
    this.actions.toggleSidenavOpen()
  }
  onLogout = () => {
    this.actions.logout();
  }
  render() {
    return (
      <header className="Header">
        <ShowOnMedia mediaKey="small">
          <IconButton onClick={this.onToggleMenu} icon="menu" />
        </ShowOnMedia>
        <h2 className="Header-title">Datask</h2>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    logout: auth.logout,
    toggleSidenavOpen: sidenav.toggleSidenavOpen
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
