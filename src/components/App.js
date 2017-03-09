import React, { Component } from 'react'

import Sidenav from './Sidenav';
import Header from './Header';

class App extends Component {
  constructor() {
    super()
    this.state = { sidenavOpen: true }
  }
  handleToggle = () => this.setState({sidenavOpen: !this.state.sidenavOpen});
  getStyles() {
    return {
      container: this.state.sidenavOpen ? {paddingLeft: 240}:{}
    }
  }
  render() {
    const containerStyle = this.state.sidenavOpen ? 
      {paddingLeft: 240}:{}
    return (
      <div style={containerStyle}>
        <Sidenav open={this.state.sidenavOpen} />
        <Header onToggleSidenav={this.handleToggle}></Header>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App