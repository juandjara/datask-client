import React from 'react'
import { browserHistory } from 'react-router'
import FlatButton from 'material-ui/FlatButton'

const NotFound = () => {
  return (
    <FlatButton onClick={() => browserHistory.goBack()}
                label="Volver atr&aacute;s" />
  )
}

export default NotFound