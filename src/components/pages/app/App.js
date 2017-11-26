import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {Header} from 'components/shared/header'
import {Sidenav} from 'components/shared/sidenav';
import ShowOnMedia from 'components/shared/ShowOnMedia'
import {TaskQuickAccess} from 'components/shared/taskQuickAccess'

import {fetchProfile} from 'reducers/profile.reducer'
import {actions as timeActions} from 'reducers/time.reducer'
import {toggleSidenavOpen} from 'reducers/sidenav.reducer'
import {logout} from 'reducers/auth.reducer'

import './App.css';

export class App extends Component {
  componentDidMount() {
    this.props.actions.fetchProfile()
    this.timer = setInterval(
      () => this.props.actions.tick(),
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { profile, sidenav, actions, children } = this.props;
    const containerStyle = {
      minHeight: '100vh'
    };
    if (sidenav.pinned) {
      containerStyle.paddingLeft = 256
    }
    return (
      <Layout>
        <Sidenav
          actions={actions}
          profile={profile}
          sidenav={sidenav}
        />
        <Panel style={containerStyle}>
          <ToastContainer autoClose={3000} position="bottom-right" />
          <Header toggleSidenav={actions.toggleSidenavOpen} />
          <ShowOnMedia mediaKey="small">
            <TaskQuickAccess />
          </ShowOnMedia>
          <main className="main">{children}</main>
        </Panel>
      </Layout>
    )
  }
}

const mapStateToProps = ({sidenav, profile}) => ({
  sidenav,
  profile
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout, 
    fetchProfile, 
    toggleSidenavOpen, 
    ...timeActions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
