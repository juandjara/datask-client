import React from 'react'
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

const TaskCard = ({task}) => {
  return (
    <div className="task-card">
      <span title={task.name} className="task-card-text truncate-line">{task.name}</span>
      <span style={{flex: 1}} ></span>
      <button title="Comenzar tiempo" className="task-card-button">
        <FontIcon className="task-card-icon play">timer</FontIcon>
      </button>
    </div>
  )
}

export default TaskCard