import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import IconButton from 'react-toolbox/lib/button/IconButton';

const GreenPlayButton = (props) => {
  return (
    <IconButton {...props} icon={<FontIcon className="green-500">play_arrow</FontIcon>} />
  )
}

export default GreenPlayButton