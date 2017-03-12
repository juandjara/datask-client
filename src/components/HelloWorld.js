import React from 'react'
import Paper from 'material-ui/Paper';

const HelloWorld = () => {
  return (
    <div className="hello-world">
      <Paper zDepth={1} style={{padding: ".5em"}}>
        Welcome to Open Crono!
      </Paper>
    </div>
  )
}

export default HelloWorld