import React from 'react'
import PlayButton from './GreenPlayButton';

const TaskCard = ({task}) => {
  return (
    <div className="task-card shadow-z1">
      <PlayButton />
      <div>{task.name}</div>
      <div title="Borrar de tareas destacadas" className="mini-delete">&times;</div>
    </div>
  )
}

export default TaskCard