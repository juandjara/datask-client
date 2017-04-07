import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import ReactTooltip from 'react-tooltip';
import Sidenav from './Sidenav';
import { connect } from 'react-redux'
import Header from './Header'
import { fetchProfile } from '../reducers/profile.reducer';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  render() {
    const { sidenav, children } = this.props;
    const containerStyle = {};
    if (sidenav.pinned) {
      containerStyle.paddingLeft = 256
    }
    return (
      <Layout>
        <Sidenav />
        <Panel style={containerStyle}>
          <ReactTooltip place="right" effect="solid" />
          <Header />
          <main className="main">{children}</main>
        </Panel>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidenav: state.sidenav
  }
}

export default connect(mapStateToProps)(App)
