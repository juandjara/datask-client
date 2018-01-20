import React from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

/*
[
  {
    projectName: "",
    values: [
      {day: "YYYY-MM-DD", totalTime: 2345}
    ]
  }
]
*/

function formatTime(time) {
  const hours = Math.floor(time/60/60)
  let minutes = Math.floor(time/60) - hours*60
  return `${hours}h ${minutes}m`
}

function transform(data) {
  if(!data.length) {
    return [];
  }
  const values = data.map(group => {
    const label = group.projectName;
    const values = group.values.map(v => v.totalTime);
    return [label, ...values];
  })
  const dates = data[0].values.map(v => v.day);
  return [['x', ...dates], ...values];
}

const BarChart = ({data, options}) => {
  return data.length === 0 ? null : (
    <C3Chart
      axis={{
        x: {
          type: 'timeseries', 
          tick: {
            format: '%d/%m/%Y'
          }
        },
        y: {
          tick: {
            format: formatTime
          }
        }
      }} 
      data={{
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: transform(data),
        type: 'bar'
      }} />
  )
}

export default BarChart;
