import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Sidenav from '../components/sidenav/Sidenav';
import Header from '../components/header/Header'
import { fetchProfile } from '../reducers/profile.reducer';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  render() {
    const { sidenav, children } = this.props;
    const containerStyle = {
      minHeight: '100vh'
    };
    if (sidenav.pinned) {
      containerStyle.paddingLeft = 256
    }
    return (
      <Layout>
        <Sidenav />
        <Panel style={containerStyle}>
          <ReactTooltip effect="solid" place="right" />
          <ToastContainer autoClose={3000} position="bottom-right" />
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
