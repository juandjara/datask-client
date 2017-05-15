import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import { Link } from 'react-router'
import TaskQuickAccess from '../components/taskQuickAccess/TaskQuickAccess'
import ShowOnMedia from '../components/ShowOnMedia'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { connect } from 'react-redux'
import { fetchProjects, deleteProject } from '../reducers/projects.reducer'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Projects extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
  }
  parsePercent(percent) {
    percent = parseFloat(percent) || 0;
    const num = (percent * 100).toFixed(2)
    return `${num} %`;
  }
  deleteProject = (project) => {
    this.props.dispatch(deleteProject(project))
  }
  renderListActions(project) {
    const actionsData = [
      {link: `/tasks/${project.id}`, icon: 'timer', tooltip: 'Tareas'},
      {link: `/requests/${project.id}`, icon: 'record_voice_over', tooltip: 'Solicitudes'},
      {link: `/projects/${project.id}`, icon: 'edit', tooltip: 'Editar'}
    ]
    const actions = actionsData.map((data, i) => (
      <Link
        to={data.link}
        key={`action${i}project${project.id}`}
        style={{color: '#757575'}} >
        <TooltipIcon
          tooltip={data.tooltip}
          value={data.icon} />
      </Link>
    ))
    actions.push((
      <ConfirmDeleteButton
        tooltip="Borrar proyecto"
        title={`Borrar proyecto ${project.name}`}
        key={`action4project${project.id}`}
        onDelete={() => this.deleteProject(project)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, error, projects, children} = this.props;
    return (
      <div className="projects"
           style={{padding: ".5em"}}>
        <div style={{margin: '1rem'}}>
          <h2 style={{margin: '1rem 0'}}>Proyectos</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
          {error && <p className="color-error">{error}</p>}
        </div>
        {/* <ShowOnMedia mediaKey="small">
          <section style={{flex: 1, marginRight: '2px', marginBottom: '.5rem'}}>
            <p style={{display: 'flex', margin: '.75rem 0'}} >
              <Icon className="task-cards-star">star</Icon>
              Tareas destacadas
            </p>
            <TaskQuickAccess />
          </section>
        </ShowOnMedia> */}
        <Link to="/projects/new">
          <TooltipButton
            floating
            accent
            tooltip="Nuevo proyecto"
            tooltipPosition="left"
            icon="add"
            style={{
              position: 'absolute',
              top: '.75em',
              right: '1em'
            }}
          />
        </Link>
        <List className="list">
          {projects.map((project, i) => (
            <Link
              key={i}
              style={{textDecoration: 'none', color: 'inherit'}}
              to={`/projects/${project.id}`}
            >
              <ListItem
                caption={project.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(project)}
              />
            </Link>
          ))}
        </List>
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.projects.currentPage,
  loading: state.projects.loading,
  error: state.projects.error
});

export default connect(mapStateToProps)(Projects);
