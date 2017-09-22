import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TimeCounters.css';

const timeData = [
  {time: "00:00:00", icon: "timer", tooltip: "Tiempo actual", label: "Ahora"},
  {time: "00:00:00", icon: "today", tooltip: "Tiempo del dia", label: "Hoy"},
  {time: "00:00:00", icon: "date_range", tooltip: "Tiempo de la semana", label: "Semana"},
  {time: "00:00:00", icon: "event_note", tooltip: "Tiempo del mes", label: "Mes"},
]

const Counter = ({time, tooltip, icon, label}) => (
  <div className="time-counters-item">
    <Icon value={icon} />
    <div>
      <div>{time}</div>
      <div style={{fontSize: 12}}>{tooltip}</div>
    </div>
  </div>
)

const TimeCounters = (props) => {
  return (
    <section {...props} className="time-counters">
      {timeData.map((timeItem, i) => (
        <Counter key={i} {...timeItem} />
      ))}
    </section>
  )
}

export default TimeCounters
