import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import { Link } from 'react-router'
import { fetchSingleProject, getProjectById } from 'reducers/projects.reducer'
import { connect } from 'react-redux'
import axios from 'services/axiosWrapper'
import TaskListItem from './TaskListItem'

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
    axios.get(`/task/by_project/${id}?page=${page}`)
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
  render () {
    const {loading, tasks, pageParams} = this.state
    const {project, children} = this.props
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
            <TaskListItem task={task} key={task._id} />
          ))}
        </List>
        {pageParams.last === false && (
          <Button icon="refresh" raised disabled={loading}>
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
    const project = getProjectById(state, props.routeParams.projectId)
    return {project}
  },
  {fetchSingleProject}
)(TaskList)
