import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import Input from 'react-toolbox/lib/input/Input'
import ShowOnMedia from './ShowOnMedia'
import './Header.css'

const Header = (props) => {
  return (
    <div className="header">
      <ShowOnMedia queryKey="small">
        <IconButton icon="menu" onClick={props.onToggleSidenav} />
      </ShowOnMedia>
      <IconButton icon={<FontIcon className="green-500">play_arrow</FontIcon>} />
      <input type="text" placeholder="Empieza una nueva tarea..." className="header-input" />
    </div>
  )
}

export default Header