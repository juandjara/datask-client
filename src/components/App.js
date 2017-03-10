import React, { Component } from 'react'

import Sidenav from './Sidenav';
import Header from './Header';
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'

class App extends Component {
  handleToggle = () => this.props.dispatch(toggleSidenav());
  render() {
    const { sidenavOpen, responsive, children } = this.props;
    const containerStyle = {
      transition: 'all 0.4s ease'
    }
    if (sidenavOpen && !responsive.small) {
      containerStyle.paddingLeft = 240
    }
    return (
      <div style={containerStyle}>
        <Sidenav />
        <Header onToggleSidenav={this.handleToggle} />
        <div className="main">
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidenavOpen: state.sidenavOpen,
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(App)