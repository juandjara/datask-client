import React from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import './TimeCounters.css';
import moment from 'moment'

const Counter = ({time, tooltip, icon, label}) => (
  <div className="time-counters-item">
    <Icon value={icon} />
    <div>
      <div>{time}</div>
      <div style={{fontSize: 12}}>{tooltip}</div>
    </div>
  </div>
)
function transformTimeData(timeStats, times, tick) {
  const activeTime = times.find(t => !t.endTime);
  return [
    {time: getActiveTime(activeTime, tick), icon: "timer", tooltip: "Tiempo actual", label: "Ahora"},
    {time: formatTime(timeStats.dayTotalTime, activeTime, tick), icon: "today", tooltip: "Tiempo del dia", label: "Hoy"},
    {time: formatTime(timeStats.weekTotalTime, activeTime, tick), icon: "date_range", tooltip: "Tiempo de la semana", label: "Semana"},
    {time: formatTime(timeStats.monthTotalTime, activeTime, tick), icon: "event_note", tooltip: "Tiempo del mes", label: "Mes"},
  ]
}
function formatTime(time, activeTime, tick) {
  if(activeTime) {
    time += moment(tick).diff(activeTime.startTime, 'seconds') || 0;
  }
  const hours = Math.floor(time/60/60)
  let minutes = Math.floor(time/60) - hours*60
  let seconds = time - minutes*60 - hours*60*60
  if(minutes < 10) {
    minutes = "0"+minutes
  }
  if(seconds < 10) {
    seconds = "0"+seconds
  }
  return `${hours}:${minutes}:${seconds}`
}
function getActiveTime(time, tick) {
  if(!time) {
    return '0:00:00';
  }
  const start = moment(time.startTime)
  const end = moment(tick)
  const duration = moment.duration(end.diff(start))
  const hours = parseInt(duration.asHours(), 10)
  const formatLess10 = n => n < 10 ? '0'+n : n
  const mins = formatLess10(duration.minutes())
  const secs = formatLess10(duration.seconds())
  return `${hours}:${mins}:${secs}`
}

const TimeCounters = ({timeStats, times, tick, ...props}) => {
  const timeData = transformTimeData(timeStats, times, tick)
  return (
    <section {...props} className="time-counters">
      {timeData.map((timeItem, i) => (
        <Counter key={i} {...timeItem} />
      ))}
    </section>
  )
}

export default TimeCounters
