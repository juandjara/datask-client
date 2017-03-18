import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import TaskCard from './TaskCard'
import './TaskQuickAccess.css' 

const taskData = [
  {name: "Tarea importante 1"},
  {name: "Tarea importante 2"},
  {name: "Tarea importante 3"}
]

const TaskQuickAccess = () => {
  return (
    <section className="task-quick-access">
      <p style={{margin: "0.8em 0"}} className="subheader">
        <Icon style={{fontSize: "1em"}}>star</Icon>
        {' '}
        <span>Tareas destacadas</span>
      </p>
      <div className="task-cards-container">
        {taskData.map((d, i) => <TaskCard key={i} task={d} />)}
      </div>
    </section>
  )
}

export default TaskQuickAccess