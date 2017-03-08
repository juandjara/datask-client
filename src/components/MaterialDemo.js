import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import GoBack from './GoBack'

const buttonStyle = {
  margin: ".5em"
}

const MaterialDemo = () => {
  return (
    <div className="material-demo">
      <div>
        <RaisedButton style={buttonStyle} label="Button" />
        <RaisedButton style={buttonStyle} primary={true} label="Button" />        
        <RaisedButton style={buttonStyle} secondary={true} label="Button" />
      </div>
      <GoBack/>
    </div>
  )
}

export default MaterialDemo