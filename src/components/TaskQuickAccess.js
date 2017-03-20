import React from 'react'
import TaskCard from './TaskCard'
import './TaskQuickAccess.css' 

const taskData = [
  {name: "Tarea importante 1"},
  {name: "Tarea importante 2"},
  {name: "Tarea importante 3"}
]

const TaskQuickAccess = () => {
  return (
    <div className="task-cards-container">
      {taskData.map((d, i) => <TaskCard key={i} task={d} />)}
    </div>
  )
}

export default TaskQuickAccess