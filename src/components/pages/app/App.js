import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {Sidenav} from '../../components/sidenav';
import {Header} from '../../components/header'
import ShowOnMedia from '../../components/ShowOnMedia'
import {TaskQuickAccess} from '../../components/taskQuickAccess'
import { reducer as profileReducer } from '../profile';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.actions.fetchProfile()
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
          <ToastContainer autoClose={3000} position="bottom-right" />
          <Header />
          <ShowOnMedia mediaKey="small">
            <TaskQuickAccess />
          </ShowOnMedia>
          <main className="main">{children}</main>
        </Panel>
      </Layout>
    )
  }
}

const mapStateToProps = ({sidenav}) => ({sidenav})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchProfile: profileReducer.fetchProfile
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
