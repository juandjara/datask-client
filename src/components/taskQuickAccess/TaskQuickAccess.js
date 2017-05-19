import React from 'react'
import TaskCard from './TaskCard'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TaskQuickAccess.css'

const taskData = [
  {name: "Observatorio Empresarial"},
  {name: "Menciones"},
  {name: "Geex"}
]

const TaskQuickAccess = (props) => {
  return (
    <section>
      <p style={{margin: '.5em'}}>
        <Icon value="star" className="task-cards-star" />
        Tareas destacadas
      </p>
      <div {...props} className="task-cards-container">
        {taskData.map((d, i) => <TaskCard key={i} task={d} />)}
      </div>
    </section>
  )
}

export default TaskQuickAccess
