import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchProjects, deleteProject } from '../reducers/projects.reducer'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Projects extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProjects());
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
        key={`action${i}_project${project.id}`}
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
        key={`delete_project_${project.id}`}
        onDelete={() => this.deleteProject(project)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, error, projects, children} = this.props;
    return (
      <div className="projects list-container">
        <div className="list-title-container">
          <h2 className="list-title">Proyectos</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
          {error && <p className="color-error">{error}</p>}
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
        <List className="list">
          {projects.map((project, i) => (
            <Link
              key={i}
              className="link-reset"
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
