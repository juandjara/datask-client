import React, {Component} from 'react'

export default class Dashboard extends Component {
  render() {
    const loading = true;
    return  (
      <div className="list-container">
        <div className="list-title-container">
          <h2 className="list-title">Dashboard</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
      </div>
    )
  }
}