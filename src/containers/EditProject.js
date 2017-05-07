import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchProjects } from '../reducers/projects.reducer'

class EditProject extends Component {
  state = {
    active: true
  }
  onCancel = () => {
    browserHistory.push('/projects')
  }
  componentDidMount() {
    const {project, dispatch} = this.props;
    if(project.needsReload) {
      dispatch(fetchProjects())
    }
  }

  render() {
    const {project, loading} = this.props;
    return (
      <div className="edit-project">
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={project.name || "Cargando ..."}
        >
          <h2>Hola, esto es el proyecto</h2>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.routeParams.id);
  if(isNaN(id)) {
    return {
      loading: false,
      project: {name: 'Nuevo proyecto'}
    }
  }
  const foundProjects = state.projects.data
    .filter(project => project.id === id);
  return {
    loading: state.projects.loading,
    project: foundProjects[0] || {needsReload: true}
  }
}

export default connect(mapStateToProps)(EditProject);
