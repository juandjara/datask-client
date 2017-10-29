import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import { fetchSingleProject, getProjectById } from 'reducers/projects.reducer'
import { 
  actions as taskActions, 
  selectors as taskSelectors 
} from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskListItem from './TaskListItem'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'

const TooltipButton = Tooltip(Button);

class TaskList extends Component {
  state = {
    editModes: {}
  }
  componentDidMount() {
    const id = this.props.routeParams.projectId
    this.props.fetchSingleProject(id)
    this.fetchTasks(0)
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
  render () {
    const {editModes} = this.state
    const {loading, tasks, pageParams, project, children} = this.props
    return (
      <div className="list-container">
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
          tooltip="Nuevo proyecto"
          tooltipPosition="left"
          className="list-corner-fab"
          onClick={this.createTask}
        />
        <List style={{padding: '1em 0'}} >
          {tasks.map(task => (
            <TaskListItem 
              onChange={this.handleNameEdit} 
              task={task} 
              editMode={editModes[task._id]}
              onEdit={this.handleEditMode}
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
        {children}
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
    return {
      project, 
      tasks, 
      pageParams, 
      loading
    }
  },
  (dispatch) => ({
    ...bindActionCreators({fetchSingleProject}, dispatch),
    taskActions: bindActionCreators(taskActions, dispatch)
  })
)(TaskList)
