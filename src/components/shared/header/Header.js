import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton'
import ShowOnMedia from '../ShowOnMedia'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {logout} from 'reducers/auth.reducer'
import {toggleSidenavOpen} from 'reducers/sidenav.reducer'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  onToggleMenu = () => {
    this.props.actions.toggleSidenavOpen()
  }
  onLogout = () => {
    this.props.actions.logout();
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
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout, toggleSidenavOpen }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
