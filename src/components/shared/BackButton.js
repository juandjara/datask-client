import React from 'react';
import Button from 'react-toolbox/lib/button/Button'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'

const backButton = ({router, style, ...props}) => {
  return (
    <Button style={{
        paddingLeft: '5px', 
        minWidth: 0, 
        textAlign: 'left', 
        textTransform: 'none',
        ...style
      }}
      onClick={() => router.goBack()}
      {...props}>
      <Icon>arrow_back</Icon> Volver
    </Button>
  );
}

export default backButton;