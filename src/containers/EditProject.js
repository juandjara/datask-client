import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchSingleProject,
  resetProject,
  updateProjectField,
  saveProject,
  createProject
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
    ev.preventDefault()
    const { project, dispatch, routeParams } = this.props
    let action = null
    if(isNaN(routeParams.id)) {
      action = createProject
    } else {
      action = saveProject
    }
    dispatch(action(project))
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
    const {project, loading, error, routeParams} = this.props;
    return (
      <div className="edit-project">
        <Dialog
          className="edit-dialog"
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={isNaN(routeParams.id) ? 'Nuevo proyecto':'Editar proyecto'}
        >
          {loading && <p className="color-primary">Cargando ...</p>}
          {error && <p className="color-error">{error}</p>}
          <form onSubmit={this.onSubmit}
                style={{
                  display: loading ? 'none':'block'
                }}>
            <Input
              name="name"
              label="Nombre"
              value={project.name || ''}
              onChange={this.onChange}
            />
            <h2>Estado</h2>
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
            <Button
              primary raised
              label="Guardar"
              type="submit"
            />
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
    project: state.projects.activeProject || {}
  }
}

export default connect(mapStateToProps)(EditProject);
