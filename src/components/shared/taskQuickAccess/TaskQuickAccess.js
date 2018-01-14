import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TaskQuickAccess.css'
import moment from 'moment';

function renderTaskCard(time, tick, actions) {
  return (
    <div key={time._id} className="task-card">
      <div title={time.task.name} className="task-card-text truncate-line">
        <div>{time.task.name}</div>
        <small style={{marginTop: 4, color: '#666'}}>
          {time.project.name}
        </small>
      </div>
      <div style={{flex: 1}} ></div>
      {time.endTime ? (
        <button onClick={() => handleStartTime(time, actions)} title="Comenzar tiempo" className="task-card-button">
          <Icon className="task-card-icon play" value="timer" />
        </button>
      ) : (
        [
          <span key={1}>
            {getActiveTime(time, tick)}
          </span>,
          <button key={2} 
            onClick={() => handleEndTime(time, actions)} 
            title="Parar tiempo"
            style={{marginLeft: 6}} 
            className="task-card-button">
            <Icon className="task-card-icon clear" value="stop" />
          </button>
        ]
      )}
    </div>
  )
}

const handleStartTime = (time, actions) => {
  const data = {
    startTime: new Date(),
    user: time.user._id,
    project: time.project._id,
    task: time.task._id
  }
  actions.saveAndFetch(data, false);
}
const handleEndTime = (time, actions) => {
  const data = {
    _id: time._id,
    user: time.user._id,
    project: time.project._id,
    task: time.task._id
  }
  actions.finish(data);
}
const getActiveTime = (time, tick) => {
  const start = moment(time.startTime)
  const end = moment(tick)
  const duration = moment.duration(end.diff(start))
  const hours = parseInt(duration.asHours(), 10)
  const formatLess10 = n => n < 10 ? '0'+n : n
  const mins = formatLess10(duration.minutes())
  const secs = formatLess10(duration.seconds())
  return `${hours}:${mins}:${secs}`
}

const TaskQuickAccess = ({style, times, tick, actions}) => {
  return (
    <section>
      <p style={{margin: '.5em'}}>
        <Icon value="star" className="task-cards-star" />
        Tareas destacadas
      </p>
      <div style={style} className="task-cards-container">
        {times.map(time => renderTaskCard(time, tick, actions))}
      </div>
    </section>
  )
}

export default TaskQuickAccess
