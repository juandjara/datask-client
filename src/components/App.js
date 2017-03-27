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
                <p style={{display: 'flex', margin: '.5rem 0', marginTop: '1em'}} >
                  <Icon className="task-cards-star">star</Icon>
                  Tareas destacadas
                </p>
                <TaskQuickAccess />
              </section>
              <section style={{flex: 0, height: 80}}>
                <TimeCounters 
                  className="sidenav-times"
                  style={{
                    background: 'white',
                    border: '1px solid #ccc', 
                    marginRight: '0',
                    padding: '1em'
                  }} />
              </section>
            </div>
            <h2 style={{margin: "1rem", marginTop: 0}}>Proyectos</h2>
            <main className="main">
              {children}
            </main>

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