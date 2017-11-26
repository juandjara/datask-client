import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton'
import ShowOnMedia from '../ShowOnMedia'
import './Header.css'

class Header extends React.Component {
  onToggleMenu = () => this.props.toggleSidenav()
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

export default Header;