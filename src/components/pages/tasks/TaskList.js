import React, { Component } from 'react';
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import { fetchSingleProject, getProjectById } from 'reducers/projects.reducer'
import { 
  actions as taskActions, 
  selectors as taskSelectors 
} from 'reducers/tasks.reducer'
import {
  actions as timeActions,
  selectors as timeSelectors
} from 'reducers/time.reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskListItem from './TaskListItem'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import BackButton from 'components/shared/BackButton'
import styled from 'styled-components'
import moment from 'moment'

const TooltipButton = Tooltip(Button);
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

class TaskList extends Component {
  state = {
    editModes: {}
  }
  componentDidMount() {
    const id = this.props.routeParams.projectId
    const {tasks, project, fetchSingleProject} = this.props
    if(project.missing) {
      fetchSingleProject(id)
    }
    if(tasks.length < 1) {
      this.fetchTasks(0)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.activeTime && !this.timer) {
      this.timer = setInterval(
        () => nextProps.timeActions.tick(),
        1000
      )
    }
    if(!nextProps.activeTime) {
      clearInterval(this.timer)
      delete this.timer
    }
  }
  fetchTasks(page) {
    const id = this.props.routeParams.projectId    
    this.props.taskActions.fetchByProject(id, {page})
  }
  handleNameEdit = (data) => {
    this.props.taskActions.save(data, true)
    .then(() => {
      this.setState(state => ({
        ...state,
        editModes: {
          ...state.editModes,
          [data._id]: false
        }
      }))
    })
  }
  handleEditMode = (task, editMode) => {
    this.setState(state => ({
      ...state,
      editModes: {
        ...state.editModes,
        [task._id]: editMode
      }
    }))
  }
  createTask = () => {
    const newTask = {
      name: 'Nueva tarea',
      project: this.props.project._id
    }
    this.props.taskActions.save(newTask, false)
    .then(res => res.value)
    .then(task => {
      this.setState(state => ({
        ...state,
        editModes: {
          ...state.editModes,
          [task._id]: true
        }
      }))
    })
  }
  handleStartTime = (task) => {
    const time = {
      task: task._id,
      user: this.props.userId,
      project: this.props.routeParams.projectId
    }
    this.props.timeActions.save(time, false)
  }
  handleFinishTime = (task) => {
    const time = {
      _id: this.props.activeTime._id,
      task: task._id,
      user: this.props.userId,
      project: this.props.routeParams.projectId
    }
    this.props.timeActions.finish(time)
  }
  hasActiveTime(task) {
    return this.props.activeTime && 
      task._id === this.props.activeTime.task
  }
  getActiveTime() {
    if(!this.props.activeTime) {
      return 0
    }
    const start = new Date(this.props.activeTime.startTime)
    const now = new Date(this.props.tick)
    return moment.utc(new Date(now - start)).format("HH:MM:ss")
  }
  render () {
    const {editModes} = this.state
    const {
      loading, tasks, pageParams, project
    } = this.props
    return (
      <div className="list-container">
        <BackButton router={this.props.router} />
        <div className="list-title-container">
          <h2 className="list-title">
            {project.name}
          </h2>
          {loading && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <ProgressBar type='circular' mode='indeterminate' />
              <p className="color-primary" style={{marginLeft: '1rem'}}>
                Cargando ...
              </p>
            </div>
          )}
          {!loading && tasks.length < 1 ? (
            <p style={{textAlign: 'center'}}>
              No hay ninguna tarea para este proyecto todavía.
              <br/>
              Puedes crear una con el boton redondo naranja de arriba 
            </p>
          ) : null}
        </div>
        <TooltipButton
          icon="add"
          floating accent
          tooltip="Nueva tarea"
          tooltipPosition="left"
          className="list-corner-fab"
          onClick={this.createTask}
        />
        <List>
          {tasks.map(task => (
            <TaskListItem 
              onChange={this.handleNameEdit} 
              task={task} 
              editMode={editModes[task._id]}
              onEdit={this.handleEditMode}
              hasActiveTime={this.hasActiveTime(task)}
              time={this.getActiveTime()}
              onStartTime={this.handleStartTime}
              onFinishTime={this.handleFinishTime}
              key={task._id} />
          ))}
        </List>
        {pageParams.last === false && (
          <Button 
            icon="refresh" 
            raised primary
            disabled={loading}
            style={{margin: '2em 0'}}
            onClick={() => this.fetchTasks(pageParams.page + 1)}>
            Cargar más
          </Button>
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const projectId = props.routeParams.projectId
    const project = getProjectById(state, projectId)
    const {tasks, pageParams} = taskSelectors.getByProjectId(state, projectId)
    const loading = taskSelectors.getLoading(state)
    const tick = timeSelectors.getTick(state)
    return {
      project, 
      tasks, 
      pageParams, 
      loading,
      activeTime: state.profile.activeTime,
      userId: state.auth._id,
      tick
    }
  },
  (dispatch) => ({
    ...bindActionCreators({fetchSingleProject}, dispatch),
    taskActions: bindActionCreators(taskActions, dispatch),
    timeActions: bindActionCreators(timeActions, dispatch)
  })
)(TaskList)
