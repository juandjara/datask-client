import React from 'react'
import TaskCard from './TaskCard'
import './TaskQuickAccess.css'

const taskData = [
  {name: "Observatorio Empresarial"},
  {name: "Menciones"},
  {name: "Geex"}
]

const TaskQuickAccess = (props) => {
  return (
    <div {...props} className="task-cards-container">
      {taskData.map((d, i) => <TaskCard key={i} task={d} />)}
    </div>
  )
}

export default TaskQuickAccess
