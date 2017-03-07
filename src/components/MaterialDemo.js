import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: ".5em"
}

const MaterialDemo = () => {
  return (
    <div className="material-demo">
      <RaisedButton style={buttonStyle} label="Default" />
      <RaisedButton style={buttonStyle} primary={true} label="Primary" />        
      <RaisedButton style={buttonStyle} secondary={true} label="Secondary" />
    </div>
  )
}

export default MaterialDemo