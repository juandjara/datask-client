import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import MakeTooltip from 'react-toolbox/lib/tooltip'
import './TimeCounters.css';

const IconWithTooltip = MakeTooltip(Icon)

const TimeCounters = (props) => {
  return (
    <section {...props} className="time-counters">
      <div>
        <IconWithTooltip tooltip="Tiempo actual" value="timer" />
        <span>00:00:00</span>
      </div>      
      <div>
        <IconWithTooltip tooltip="Tiempo de hoy" value="today" />
        <span>00:00:00</span>
      </div>
      <div>
        <IconWithTooltip tooltip="Tiempo de la semana" value="date_range" />
        <span>00:00:00</span>
      </div>
      <div>
        <IconWithTooltip tooltip="Tiempo del mes" value="event_note" />
        <span>00:00:00</span>
      </div>
    </section>
  )
}

export default TimeCounters