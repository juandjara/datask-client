import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import TaskQuickAccess from '../shared/taskQuickAccess/TaskQuickAccess'
import ShowOnMedia from '../shared/ShowOnMedia'

const HelloWorld = () => {
  return (
    <div className="projects"
         style={{padding: ".5em"}}>
      <h2 style={{margin: "1rem"}}>Proyectos</h2>
      <ShowOnMedia mediaKey="small">
        <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
          <p style={{display: 'flex', margin: '.75rem 0'}} >
            <Icon className="task-cards-star">star</Icon>
            Tareas destacadas
          </p>
          <TaskQuickAccess />
        </section>
      </ShowOnMedia>
    </div>
  )
}

export default HelloWorld
