import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

const TaskCard = ({task}) => {
  return (
    <div className="task-card">
      <span className="task-card-text">{task.name}</span>
      <button title="Comenzar tiempo" className="task-card-button">
        <FontIcon className="task-card-icon play">play_arrow</FontIcon>
      </button>
      <button title="Borrar de tareas destacadas" className="task-card-button">
        <FontIcon className="task-card-icon clear">clear</FontIcon>
      </button>
    </div>
  )
}

export default TaskCard