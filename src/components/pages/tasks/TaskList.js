import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import { Link } from 'react-router'
import { fetchSingleProject, getProjectById } from 'reducers/projects.reducer'
import { connect } from 'react-redux'
import axios from 'services/axiosWrapper'
import './Tasks.css'

const TooltipButton = Tooltip(Button);

class TaskList extends Component {
  state = {
    loading: false,
    tasks: [],
    pageParams: {}
  }
  componentDidMount() {
    const id = this.props.routeParams.projectId
    this.props.fetchSingleProject(id)
    this.fetchTasks(0)
  }
  fetchTasks(page) {
    this.setState({ loading: true })
    const id = this.props.routeParams.projectId    
    axios.get(`/task/${id}?page=${page}`)
    .then(res => res.data)
    .then(json => {
      const {last, page, docs} = json
      this.setState(prevState => ({
        loading: false,
        pageParams: {page, last},
        tasks: prevState.tasks.concat(docs)
      }))
    })
  }
  renderTask(task) {
    const initials = task.asignee.name[0] + task.asignee.surname[0]
    return (
      <div style={{
        width: '100%',
        padding: '.5rem',
        background: 'white', 
        border: '1px solid #ccc',
        whiteSpace: 'normal',
        boxShadow: '1px 1px 2px rgba(0,0,0, .5)'
      }}>
        <p>{task.name}</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{color: '#666'}} >
            <Icon title="Esta tarea tiene una descripcion" 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="sort" />
            <Icon title={`${task.comments.length} comentarios`} 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="chat_bubble_outline" />
            <span title={`Asignada a ${task.asignee.full_name}`} 
                  style={{
                    display: 'inline-block', 
                    padding: '3px 6px', 
                    background: '#eee',
                    color: '#333'
                  }}>
              {initials}
            </span>
          </div>
          <div>
            <IconButton 
              title="Iniciar tiempo"
              icon="timer"
              style={{
                color: 'var(--palette-green-500)'
              }} />
            <IconButton 
              title="Parar tiempo"
              icon="stop"
              style={{
                color: 'var(--palette-red-500)'
              }} />
              
          </div>
        </div>
      </div>
    )
  } 
  render () {
    const {loading, tasks, pageParams} = this.state
    const {project} = this.props
    return (
      <div className="list-container">
        <div className="list-title-container">
          <h2 className="list-title">
            {project.name}
          </h2>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
        <Link to="/projects/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo proyecto"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List style={{padding: 0}} >
          {tasks.map(task => (
            <li key={task._id}  >
              {this.renderTask(task)}
            </li>
          ))}
        </List>
        {pageParams.last === false && (
          <Button icon="refresh" raised disabled={loading}>
            Cargar más
          </Button>
        )}
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const project = getProjectById(state, props.routeParams.projectId)
    return {project}
  },
  {fetchSingleProject}
)(TaskList)
