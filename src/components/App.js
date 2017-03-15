import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Sidenav from './Sidenav';
import Header from './Header';
import { connect } from 'react-redux'
import { toggleSidenav } from '../ducks/sidenav'

class App extends Component {
  handleToggle = () => this.props.dispatch(toggleSidenav());
  render() {
    const { sidenavOpen, responsive, children } = this.props;
    const containerStyle = {
      //transition: 'all 0.4s ease',
      flex: 1
    }
    if (sidenavOpen && !responsive.small) {
      containerStyle.paddingLeft = 256
    }
    return (
      <Layout>
        <Sidenav />
        <Panel style={containerStyle}>
          {/*
          {responsive.small ? (<Header onToggleSidenav={this.handleToggle} />) : null}
          */}
          <Header onToggleSidenav={this.handleToggle} />
          <main className="main">
            {children}
          </main>
        </Panel>
      </Layout>
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