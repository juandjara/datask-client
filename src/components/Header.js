import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout } from '../reducers/auth.reducer'
import Avatar from './Avatar'
import ShowOnMedia from './ShowOnMedia'
import { toggleSidenavOpen } from '../reducers/sidenav.reducer'
import './Header.css'

class Header extends React.Component {
  state = {
    showMenu: false
  }
  onToggleMenu = () => {
    this.props.dispatch(toggleSidenavOpen())
  }
  onLogout = () => {
    this.props.dispatch(logout());
  }
  render() {
    const props = this.props;
    return (
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ccc'
        }}>
          <ShowOnMedia mediaKey="small">
            <IconButton onClick={this.onToggleMenu} icon="menu" />
          </ShowOnMedia>
          <h2 style={{textAlign: 'center', flex: 1, margin: '.5rem'}}>Datask</h2>
        </header>
    )
  }
}

const mapStateToProps = state => {
  return { username: `${state.profile.firstName} ${state.profile.lastName}` }
}
export default connect(mapStateToProps)(Header)
