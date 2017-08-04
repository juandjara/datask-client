import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import Tooltip from 'react-toolbox/lib/tooltip'
import './TimeCounters.css';

const TooltipText = Tooltip(({children, theme, ...props}) => 
  <span {...props}>{children}</span>)

const timeData = [
  {time: "00:00:00", icon: "timer", tooltip: "Tiempo actual", label: "Ahora"},
  {time: "00:00:00", icon: "today", tooltip: "Tiempo del dia", label: "Hoy"},
  {time: "00:00:00", icon: "date_range", tooltip: "Tiempo de la semana", label: "Semana"},
  {time: "00:00:00", icon: "event_note", tooltip: "Tiempo del mes", label: "Mes"},
]

const Counter = ({time, tooltip, icon, label}) => (
  <div className="time-counters-item">
    <Icon value={icon} />
    <TooltipText tooltip={tooltip}>{time}</TooltipText>
    <span style={{padding: '0 10px'}}>{label}</span>
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
