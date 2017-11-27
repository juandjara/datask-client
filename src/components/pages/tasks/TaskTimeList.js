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
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import DatePicker from 'react-toolbox/lib/date_picker/DatePicker';
import Input from 'react-toolbox/lib/input/Input';

const TooltipButton = Tooltip(Button);
const TooltipIconButton = Tooltip(IconButton);
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
      height: 24px;
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
const TimeGroup = styled.div`
  display: flex;
  div {
    flex: 1;
    margin-right: 1em;
  }
`

export class TaskTimeList extends Component {
  pageSize = 10;
  state = {
    editingTime: null
  }
  componentDidMount() {
    const {
      task, 
      taskActions, 
      routeParams
    } = this.props
    if(!task) {
      taskActions.fetchOne(routeParams._id)
    }
    this.fetchTimes(0)
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
  editTime(time) {
    time.startTime.setHours(time.startHour)
    time.startTime.setMinutes(time.startMinutes)
    if(time.endTime) {
      time.endTime.setHours(time.endHour)
      time.endTime.setMinutes(time.endMinutes)
    }
    this.props.timeActions.save(time, true)
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
    return moment(dateStr).format('DD/MM/YYYY HH:mm');
  }
  renderTimeActions(time) {
    if(!this.props.isAdmin && time.user._id !== this.props.userId) {
      return null
    }
    const editButton = time.endTime ? (
      <ConfirmDeleteButton
        key="delete-time"
        tooltip="Borrar tiempo"
        tooltipPosition="left"
        dialogTitle={`Borrar tiempo`}
        onDelete={() => {
          this.deleteTime(time)
        }}
      />
    ) : (
      <IconButton
        key="stop-time"
        onClick={() => this.finishTime(time)}
        title="Parar tiempo"
        icon="stop"
        style={{
          color: 'var(--palette-red-500)'
        }} 
      />
    )
    return [
      <TooltipIconButton
        key="edit-time"
        tooltip="Editar tiempo"
        tooltipPosition="left"
        icon="edit"
        style={{color: '#666'}}
        onClick={() => this.openEditDialog(time)}
      />,
      editButton
    ]
  }
  closeEditDialog() {
    this.setState({editingTime: null})
  }
  openEditDialog(time) {
    const start = time.startTime && new Date(time.startTime)
    const end   = time.endTime && new Date(time.endTime)
    this.setState({editingTime: {
      ...time,
      startTime: start,
      startHour: start.getHours(),
      startMinutes: start.getMinutes(),
      endTime: end,
      endHour: end && end.getHours(),
      endMinutes: end && end.getMinutes()
    }})
  }
  handleEditChange = name => value => {
    this.setState({editingTime: {
      ...this.state.editingTime,
      [name]: value 
    }})
  }
  renderEditDialog() {
    const time = this.state.editingTime || {}
    return (
      <Dialog 
        active={!!time.startTime}
        onEscKeyDown={() => this.closeEditDialog()}
        onOverlayClick={() => this.closeEditDialog()}
        title="Editar registro de tiempo"
        actions={[
          {label: 'Guardar', raised: true, primary: true, onClick: () => {
            this.editTime(time)
            this.closeEditDialog()
          }},
          {label: 'Cancelar', onClick: () => this.closeEditDialog()}
        ]}>
        <TimeGroup>
          <DatePicker 
            locale="es"
            autoOk={true}
            onChange={this.handleEditChange("startTime")} 
            value={time.startTime}
            label="Fecha inicio"/>
          <Input
            type="number" min="0" max="23"
            onChange={this.handleEditChange("startHour")} 
            value={time.startHour || 0}
            label="Hora inicio" />
          <Input
            type="number" min="0" max="59"
            onChange={this.handleEditChange("startMinutes")} 
            value={time.startMinutes || 0}
            label="Minuto inicio" />
        </TimeGroup>
        {time.endTime && (<TimeGroup>
          <DatePicker
            locale="es"
            autoOk={true}
            label="Fecha fin"
            onChange={this.handleEditChange("endTime")}
            value={time.endTime} />
          <Input
            type="number" min="0" max="23"
            onChange={this.handleEditChange("endHour")} 
            value={time.endHour || 0}
            label="Hora fin" />
          <Input
            type="number" min="0" max="59"
            onChange={this.handleEditChange("endMinutes")} 
            value={time.endMinutes || 0}
            label="Minuto fin" />
        </TimeGroup>)}
      </Dialog>
    )
  }
  render() {
    const {task = {}, times, loading, pageParams} = this.props
    return (
      <div className="list-container">
        <BackButton router={this.props.router} />
        <div className="list-title-container">
          <h2 className="list-title">
            {task.name && `Tiempos para ${task.name}`}
          </h2>
          {loading && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <ProgressBar type='circular' mode='indeterminate' />
              <p className="color-primary" style={{marginLeft: '1rem'}}>
                Cargando ...
              </p>
            </div>
          )}
          {!loading && times.length < 1 ? (
            <p style={{textAlign: 'center', marginTop: '2rem'}}>
              No hay ningun tiempo registrado para este tarea todavía.
              <br/>
              Puedes crear uno con el boton redondo naranja de arriba 
            </p>
          ) : null}
        </div>
        <TooltipButton
          icon="add"
          floating accent
          tooltip="Nuevo tiempo"
          tooltipPosition="left"
          className="list-corner-fab"
          onClick={this.createTime}
        />
        <List style={{
          opacity: loading ? 0.5 : 1,
          marginBottom: '2rem'
        }}>
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
              {this.renderTimeActions(time)}
            </li>
          ))}
        </List>
        {pageParams.last === false && (
          <Button 
            icon="refresh" 
            raised primary
            disabled={loading}
            style={{margin: '1rem 0'}}
            onClick={() => this.fetchTimes(pageParams.page + 1)}>
            {loading ? 'Cargando...' : 'Cargar más'}
          </Button>
        )}
        {this.renderEditDialog()}
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
    const isAdmin = state.auth.roles.indexOf("ADMIN") !== -1
    const userId = state.auth._id;
    return {task, tick, times, pageParams, loading, userId, isAdmin}
  },
  dispatch => ({
    taskActions: bindActionCreators(taskActions, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch)
  })
)(TaskTimeList)
