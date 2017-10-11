import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from 'components/shared/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { 
  fetchProjectsPage, deleteProject, getProjectsPage
} from 'reducers/projects.reducer'
import PaginationFooter from 'components/shared/PaginationFooter'

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
      {link: `/tasks/${project._id}`, icon: 'timer', tooltip: 'Tareas'},
      {link: `/projects/${project._id}`, icon: 'edit', tooltip: 'Editar'}
    ]
    const actions = actionsData.map((data, i) => (
      <Link
        to={data.link}
        key={`action${i}_project${project._id}`}
        style={{color: '#757575'}} >
        <TooltipIcon
          tooltipPosition="left"
          tooltip={data.tooltip}
          value={data.icon} />
      </Link>
    ))
    actions.push((
      <ConfirmDeleteButton
        tooltip="Borrar proyecto"
        tooltipPosition="left"
        title={`Borrar proyecto ${project.name}`}
        key={`delete_project_${project._id}`}
        onDelete={() => this.props.deleteProject(project)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, projects, children, pageParams, responsive} = this.props;
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
        <List className="list">
          {projects.map((project, i) => (
            <ListItem
              key={i}
              leftIcon={!responsive.mobile && 'work'}
              caption={project.name}
              className="list-item"
              rightActions={this.renderListActions(project)}
            />
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
    responsive: state.responsive,
    pageParams: params,
    projects: items,
    loading
  }
}
const actions = {fetchProjectsPage, deleteProject}

export default connect(mapStateToProps, actions)(Projects);
