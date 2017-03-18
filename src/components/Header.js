import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton';
import PlayButton from './GreenPlayButton';
import ShowOnMedia from './ShowOnMedia'
import './Header.css'

const Header = (props) => {
  /*
  return (
    <header className="header">
      <ShowOnMedia queryKey="small">
        <IconButton icon="menu" onClick={props.onToggleSidenav} />
      </ShowOnMedia>
      <input type="text" placeholder="Empieza una nueva tarea..." className="header-input" />
      <PlayButton />
    </header>
  )
  */
  return (
    <ShowOnMedia queryKey="small">
      <IconButton style={{float: "left"}} icon="menu" onClick={props.onToggleSidenav} />
    </ShowOnMedia>
  )
}

export default Header