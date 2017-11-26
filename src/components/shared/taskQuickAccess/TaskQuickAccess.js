import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TaskQuickAccess.css'

function renderTaskCard(time) {
  return (
    <div key={time._id} className="task-card">
      <div title={time.task.name} className="task-card-text truncate-line">
        <div style={{fontWeight: 'bold', fontSize: '110%'}}>{time.task.name}</div>
        <div style={{marginTop: 4, color: '#666'}}>{time.project.name}</div>
      </div>
      <div style={{flex: 1}} ></div>
      {time.endTime ? (
        <button title="Comenzar tiempo" className="task-card-button">
          <Icon className="task-card-icon play" value="timer" />
        </button>
      ) : (
        <button title="Parar tiempo" className="task-card-button">
          <Icon className="task-card-icon clear" value="stop" />
        </button>
      )}
    </div>
  )
}

const TaskQuickAccess = ({style, times}) => {
  return (
    <section>
      <p style={{margin: '.5em'}}>
        <Icon value="star" className="task-cards-star" />
        Tareas destacadas
      </p>
      <div style={style} className="task-cards-container">
        {times.map(renderTaskCard)}
      </div>
    </section>
  )
}

export default TaskQuickAccess
