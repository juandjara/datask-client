import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { 
  fetchProjectsPage, deleteProject, getProjectsPage
} from '../reducers/projects.reducer'
import PaginationFooter from '../components/PaginationFooter'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Projects extends Component {
  pageSize = 5;
  componentDidMount() {
    this.fetchPage(0)
  }
  fetchPage(page) {
    this.props.fetchProjectsPage(page, this.pageSize)
  }
  renderListActions(project) {
    const actionsData = [
      {link: `/tasks/${project.id}`, icon: 'timer', tooltip: 'Tareas'},
      {link: `/requests/${project.id}`, icon: 'record_voice_over', tooltip: 'Solicitudes'}
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
        onDelete={() => this.props.deleteProject(project)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, projects, children, pageParams} = this.props;
    return (
      <div className="projects list-container">
        <div className="list-title-container">
          <h2 className="list-title">Proyectos</h2>
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
        <List selectable className="list">
          {projects.map((project, i) => (
            <Link key={i} className="link-reset"
                  title="Editar proyecto" to={`/projects/${project.id}`}>
              <ListItem
                selectable
                caption={project.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(project)}
              />
            </Link>
          ))}
        </List>
        <PaginationFooter
          params={pageParams}
          onPageChange={page => this.fetchPage(page)}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {items, loading, params} = getProjectsPage(state)
  return {
    pageParams: params,
    projects: items,
    loading
  }
}
const actions = {fetchProjectsPage, deleteProject}

export default connect(mapStateToProps, actions)(Projects);
