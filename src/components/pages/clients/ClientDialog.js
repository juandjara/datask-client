import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import { browserHistory } from 'react-router'

class ClientDialog extends Component {
  componentDidMount() {
    const {id, isEditMode, fetchClientIfNeeded} = this.props;
    if(isEditMode) {
      fetchClientIfNeeded(id)
    }
    this.initForm(this.props.client)
  }
  componentWillUnmount() {
    this.props.resetForm()
  }
  componentWillReceiveProps({client}) {
    if(client !== this.props.client) {
      this.initForm(client)
    }
  }
  initForm(client) {
    if(!client.loading && !client.missing) {
      this.props.initForm(client)
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
    const name = ev.target.name
    this.props.onBlur(name)
  }
  onCancel = () => {
    browserHistory.push('/clients')
  }

  render() {
    const statusOptions = [
      {value: "INTERNAL", label: "Interno"},
      {value: "CONTACT", label: "Contacto"},
    ]
    const {model, loading, isEditMode, validationErrors} = this.props
    return (
      <div className="edit-client">
        <Dialog
          active={true}
          className="edit-dialog"
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={isEditMode ? 'Editar cliente':'Nuevo cliente'}>
          {loading && (
            <p className="color-primary">Cargando ...</p>
          )}
          <form onSubmit={this.onSubmit}>
            <Input
              name="name"
              label="Nombre*"
              value={model.name || ''}
              error={validationErrors.name}
              onChange={this.onChange}
            />
            <Dropdown
              name="type"
              label="Tipo de cliente"
              icon="info"
              source={statusOptions}
              value={model.type || ''}
              onChange={this.onChange}
            />
            <Input
              icon="location_on"
              name="address"
              label="Dirección"
              value={model.address || ''}
              onChange={this.onChange}
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

export default ClientDialog
