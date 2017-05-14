import React from 'react'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button/Button';

const NotFound = () => {
  return (
    <Button
      primary
      onClick={() => browserHistory.goBack()}
      label="Volver atr&aacute;s" />
  )
}

export default NotFound
