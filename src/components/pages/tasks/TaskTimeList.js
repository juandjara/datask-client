import React, { Component } from 'react';
import { 
  selectors as taskSelectors, 
  actions as taskActions 
} from 'reducers/tasks.reducer'
import { 
  selectors as timeSelectors, 
  actions as timeActions 
} from 'reducers/time.reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import BackButton from 'components/shared/BackButton'
import Button from 'react-toolbox/lib/button/Button'
import Tooltip from 'react-toolbox/lib/tooltip'
import styled from 'styled-components'
import moment from 'moment'
import ConfirmDeleteButton from 'components/shared/ConfirmDeleteButton'
import IconButton from 'react-toolbox/lib/button/IconButton'

const TooltipButton = Tooltip(Button);
const List = styled.ul`
  list-style: none;
  padding: 0;
  padding-left: 1em;
  margin: 0;
  li {
    display: flex;
    align-items: flex-end;
    padding: .5rem 0;
    border-bottom: 1px solid #ccc;
    .delete-button {
      margin: 6px;
    }
  }
`
const Duration = styled.p`
  font-size: 20px;
  margin-bottom: .5em;
`
const Time = styled.div`
  color: #666;
`

export class TaskTimeList extends Component {
  pageSize = 10;
  componentDidMount() {
    const {
      task, 
      times, 
      taskActions, 
      routeParams
    } = this.props
    if(!task) {
      taskActions.fetchOne(routeParams._id)
    }
    if(times.length < 1) {
      this.fetchTimes(0)
    }
  }
  fetchTimes(page) {
    const id = this.props.routeParams._id
    const params = {page, size: this.pageSize}
    this.props.timeActions.fetchByTask(id, params)
  }
  createTime = () => {
    const time = {
      startTime: new Date(),
      task: this.props.task._id,
      user: this.props.userId,
      project: this.props.task.project
    }
    this.props.timeActions.save(time, false)
    .then(() => {
      this.fetchTimes(this.props.pageParams.page)
    })
  }
  finishTime = (time) => {
    this.props.timeActions.finish(time)
  }
  deleteTime = (time) => {
    this.props.timeActions.delete(time)
  }
  formatDuration(time) {
    const {startTime, endTime} = time
    const start = moment(startTime)
    const end = endTime ? moment(endTime) : moment(this.props.tick)
    const duration = moment.duration(end.diff(start))
    const hours = parseInt(duration.asHours(), 10)
    const formatLess10 = n => n < 10 ? '0'+n : n
    const mins = formatLess10(duration.minutes())
    const secs = formatLess10(duration.seconds())
    return `${hours}:${mins}:${secs}`
  }
  formatTime(dateStr) {
    if(!dateStr) {
      return 'Ahora'
    }
    return new Date(dateStr).toLocaleString();
  }
  render() {
    const {task = {}, times, loading, pageParams} = this.props
    return (
      <div className="list-container">
        <BackButton router={this.props.router} />
        <div className="list-title-container">
          <h2 className="list-title">
            {task.name}
          </h2>
          {loading && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <ProgressBar type='circular' mode='indeterminate' />
              <p className="color-primary" style={{marginLeft: '1rem'}}>
                Cargando ...
              </p>
            </div>
          )}
        </div>
        <TooltipButton
          icon="add"
          floating accent
          tooltip="Nueva tarea"
          tooltipPosition="left"
          className="list-corner-fab"
          onClick={this.createTime}
        />
        <List>
          {times.map(time => (
            <li key={time._id}>
              <div>
                <Duration>{this.formatDuration(time)}</Duration>
                <Time>
                  {this.formatTime(time.startTime)}
                  {' - '}
                  {this.formatTime(time.endTime)}
                </Time>
              </div>
              <div style={{flex: 1}}></div>
              <p style={{margin: '.5rem 1rem'}}>
                {time.user.full_name}
              </p>
              {time.endTime ? (
                <ConfirmDeleteButton
                  tooltip="Borrar tiempo"
                  tooltipPosition="left"
                  dialogTitle={`Borrar tiempo`}
                  onDelete={() => {
                    this.deleteTime(time)
                  }}
                />
              ) : (
                <IconButton
                  onClick={() => this.finishTime(time)}
                  title="Parar tiempo"
                  icon="stop"
                  style={{
                    color: 'var(--palette-red-500)'
                  }} 
                />
              )}
            </li>
          ))}
        </List>
        {pageParams.last === false && (
          <Button 
            icon="refresh" 
            raised primary
            disabled={loading}
            style={{margin: '2em 0'}}
            onClick={() => this.fetchTimes(pageParams.page + 1)}>
            {loading ? 'Cargando...' : 'Cargar más'}
          </Button>
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const id = props.routeParams._id
    const task = taskSelectors.getOne(state, id)
    const {times, pageParams} = timeSelectors.getByTaskId(state, id)
    const tick = timeSelectors.getTick(state)
    const loading = taskSelectors.getLoading(state) || 
                    timeSelectors.getLoading(state)
    const userId = state.auth._id;
    return {task, tick, times, pageParams, loading, userId}
  },
  dispatch => ({
    taskActions: bindActionCreators(taskActions, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch)
  })
)(TaskTimeList)
