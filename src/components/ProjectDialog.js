import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import { browserHistory } from 'react-router'

class EditProject extends Component {
  state = {
    active: true
  }
  componentDidMount() {
    const {id, project, isEditMode, fetchProjectIfNeeded} = this.props
    if(isEditMode) {
      fetchProjectIfNeeded(id)
    }
    this.initForm(project)
  }
  componentWillUnmount() {
    this.props.resetForm()
  }
  componentWillReceiveProps = ({project}) => {
    if(project !== this.props.project) {
      this.initForm(project)
    }
  }
  initForm(project) {
    if(!project.loading && !project.missing) {
      this.props.initForm(project)
    }
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    this.props.onSubmit(this.props.model)
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.onChange(name, text)
  }
  onBlur = (ev) => {
    const name = ev.target.name;
    this.props.onBlur(name)    
  }
  onCancel = () => {
    browserHistory.push('/projects')
  }

  render() {
    const statusOptions = [
      {value: "ACTIVE", label: "Activo"},
      {value: "PAUSED", label: "En pausa"},
      {value: "COMPLETED", label: "Completado"}
    ]
    const {model, loading, isEditMode, validationErrors} = this.props;
    return (
      <div className="edit-project">
        <Dialog
          className="edit-dialog"
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={isEditMode ? 'Editar proyecto':'Nuevo proyecto'}
        >
          {loading && <p className="color-primary">Cargando ...</p>}
          <form onSubmit={this.onSubmit}
                style={{ display: loading ? 'none':'block'}}>
            <Input
              name="name"
              label="Nombre"
              error={validationErrors.name}
              value={model.name || ''}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
            <h2>Estado</h2>
            <Dropdown
              name="status"
              label="Estado"
              icon="info"
              source={statusOptions}
              value={model.status || ''}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
            <Input
              icon="lightbulb_outline"
              name="completedEstimated"
              type="number"
              min="0"
              max="100"
              value={model.completedEstimated || 0}
              onChange={this.onChange}
              label="% completado estimado"
              onBlur={this.onBlur}
            />
            <Button
              primary raised
              disabled={loading}
              className="edit-dialog-button"
              label="Guardar"
              type="submit"
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default EditProject
