import React from 'react'
import { Link } from 'react-router'

const HelloWorld = () => {
  return (
    <div className="hello-world">
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <Link to="/material">Try material-ui</Link>
    </div>
  )
}

export default HelloWorld