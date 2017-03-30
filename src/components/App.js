import React, { Component } from 'react'
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import ReactTooltip from 'react-tooltip';
import Sidenav from './Sidenav';
import Header from './Header';
import TaskQuickAccess from './TaskQuickAccess'
import TimeCounters from './TimeCounters'
import { connect } from 'react-redux'
import { toggleSidenavOpen } from '../ducks/sidenav'

class App extends Component {
  handleToggle = () => this.props.dispatch(toggleSidenavOpen());
  render() {
    const { sidenav, children } = this.props;
    const containerStyle = {};
    if (sidenav.pinned && sidenav.open) {
      containerStyle.paddingLeft = 240
    }
    return (
      <Layout>
        <Sidenav />
        <Panel style={containerStyle}>
          <ReactTooltip place="right" effect="solid" />         
          <Header onToggleSidenav={this.handleToggle} />
          <div style={{marginTop: 56}}>
            <div style={{display: 'flex'}}>
              <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
                <p style={{display: 'flex', marginBottom: '.75rem', marginTop: '1.5rem'}} >
                  <Icon className="task-cards-star">star</Icon>
                  Tareas destacadas
                </p>
                <TaskQuickAccess />
              </section>
              <div style={{position: 'fixed', right: 0}}>
                <TimeCounters />
              </div>
            </div>
            <main className="main">{children}</main>
          </div>
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