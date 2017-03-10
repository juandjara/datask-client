import React, { Component } from 'react'

import Sidenav from './Sidenav';
import Header from './Header';
import { connect } from 'react-redux'
import { small } from '../utils/mediaQueries'
import { toggleSidenav } from '../ducks/sidenav'

class App extends Component {
  handleToggle = () => this.props.dispatch(toggleSidenav());
  render() {
    const containerStyle = this.props.sidenavOpen && !small() ? 
      {paddingLeft: 240}:{}
    return (
      <div style={containerStyle}>
        <Sidenav />
        <Header onToggleSidenav={this.handleToggle} />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidenavOpen: state.sidenavOpen
  }
}

export default connect(mapStateToProps)(App)