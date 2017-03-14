import React, { Component } from 'react'

//import Sidenav from './Sidenav';
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
      containerStyle.paddingLeft = 256
    }
    return (
      <div style={containerStyle}>
        {/*
        <Sidenav />
        */}
        {responsive.small ? (<Header onToggleSidenav={this.handleToggle} />) : null}
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          Open Crono
        </footer>
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