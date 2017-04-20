import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton'
import { connect } from 'react-redux'
import { logout } from '../../../reducers/auth.reducer'
import ShowOnMedia from '../ShowOnMedia'
import { toggleSidenavOpen } from '../../../reducers/sidenav.reducer'
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
