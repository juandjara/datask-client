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
import { toggleSidenavOpen } from '../reducers/sidenav.reducer'
import { fetchProfile } from '../reducers/profile.reducer';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

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
          <div className="below-navbar">
            <div style={{display: 'flex'}}>
              <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
                <p style={{display: 'flex', margin: '.75rem 0'}} >
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
