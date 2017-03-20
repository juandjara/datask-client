import React from 'react'
import IconButton from 'react-toolbox/lib/button/IconButton';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import ShowOnMedia from './ShowOnMedia'
import TaskQuickAccess from './TaskQuickAccess'
import './Header.css'

const Header = (props) => {
  return (
    <header className="Header">
      <ShowOnMedia queryKey="small">
        <IconButton icon="menu" onClick={props.onToggleSidenav} />
      </ShowOnMedia>
      <Icon title="Tareas destacadas" className="task-cards-star">star</Icon>        
      <TaskQuickAccess />
    </header>
  )
}

export default Header