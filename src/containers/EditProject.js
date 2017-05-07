import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchSingleProject, resetProject, updateProjectField, saveProject
} from '../reducers/projects.reducer'

class EditProject extends Component {
  state = {
    active: true
  }
  componentDidMount() {
    const { routeParams, dispatch } = this.props;
    const id = parseInt(routeParams.id, 10);
    if(!isNaN(id)) {
      dispatch(fetchSingleProject(id))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(resetProject())
  }

  onCancel = () => {
    browserHistory.push('/projects')
  }
  onSubmit = (ev) => {
    ev.preventDefault();
    const { project, dispatch } = this.props;
    dispatch(saveProject(project))
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.dispatch(updateProjectField(name, text))
  }
  render() {
    const statusOptions = [
      {value: "ACTIVE", label: "Activo"},
      {value: "PAUSED", label: "En pausa"},
      {value: "COMPLETED", label: "Completado"}
    ]
    const dialogActions = [
      {label: "Cancelar", onClick: this.onCancel},
      {label: "Guardar", primary: true, onClick: this.onSubmit}
    ]
    const {project, loading, error} = this.props;
    return (
      <div className="edit-project">
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          actions={dialogActions}
        >
          {loading && <p className="color-primary">Cargando ...</p>}
          {error && <p className="color-error">Error !!</p>}
          <form onSubmit={this.onSubmit}>
            <Input
              name="name"
              label="Nombre"
              value={project.name || ''}
              onChange={this.onChange}
            />
            <Dropdown
              name="status"
              label="Estado"
              icon="info"
              source={statusOptions}
              value={project.status || ''}
              onChange={this.onChange}
            />
            <Input
              icon="lightbulb_outline"
              name="completedEstimated"
              type="number"
              min="0"
              max="100"
              value={project.completedEstimated || 0}
              onChange={this.onChange}
              label="% completado estimado"
            />
            <input hidden type="submit" onClick={this.onCancel} />
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.projects.error,
    loading: state.projects.loading,
    project: state.projects.activeProject || {name: 'Nuevo proyecto'}
  }
}

export default connect(mapStateToProps)(EditProject);
