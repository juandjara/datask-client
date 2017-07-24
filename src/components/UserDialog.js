import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import { browserHistory } from 'react-router'

class UserDialog extends Component {
  state = {
    active: true
  }
  componentDidMount() {
    const {id, isEditMode, fetchUserIfNeeded, fetchClients, companies} = this.props
    if(isEditMode) {
      fetchUserIfNeeded(id)
    }
    if(!companies.length) {
      fetchClients()
    }
  }
  componentWillUnmount = () => {
    this.props.resetForm()
  }
  componentWillReceiveProps = ({user}) => {
    if(user !== this.props.user && !user.loading && !user.missing) {
      this.props.initForm({
        ...user,
        authorities: user.authorities.join(', ')
      })
    }
  }
  onSubmit = (ev) => {
    ev.preventDefault()
    this.props.onSubmit(this.props.model)
  }
  onChange = (text, ev) => {
    const name = ev.target.name
    this.props.onChange(name, text)
  }
  onBlur = (ev) => {
    const name = ev.target.name
    this.props.onBlur(name)
  }
  onCancel = () => {
    browserHistory.push('/users')
  }

  render() {
    const statusOptions = [
      {value: "INTERNAL", label: "Interno"},
      {value: "CONTACT", label: "Contacto"},
    ]
    const {model, loading, isValid, validationErrors, companies} = this.props
    const editMode = this.props.isEditMode
    return (
      <div className="edit-user">
        <Dialog
          className="edit-dialog"
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={editMode ? 'Editar usuario':'Nuevo usuario'}
        >
          {loading ? (
            <p style={{margin: '1em'}} className="color-primary">Cargando ...</p>
          ) : (
            <form onSubmit={this.onSubmit}>
              <Checkbox
                className="edit-dialog-active"
                name="activated"
                checked={model.activated}
                onChange={this.onChange}
                onBlur={this.onBlur}
                label="Activado"
              />
              <Input
                icon="person_outline"
                disabled={editMode}
                name="login"
                label="Nombre de usuario"
                value={model.login || ''}
                error={validationErrors.login}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />                
              {editMode ? null : (
                <div style={{display: 'flex'}} >
                  <Input
                    type="password"
                    name="password"
                    icon="lock"                  
                    label="Contraseña"
                    value={model.password || ''}
                    error={validationErrors.password}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                  <Input
                    type="password"
                    name="repeat_password"
                    label="Repetir contraseña"
                    value={model.repeat_password || ''}
                    error={validationErrors.repeat_password}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </div>
              )}                
              <div style={{
                display: 'flex',
              }}>
                <Input
                  name="name"
                  label="Nombre"
                  icon="person"
                  value={model.name || ''}
                  error={validationErrors.name}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                />
                <Input
                  name="surname"
                  label="Apellidos"
                  value={model.surname || ''}
                  error={validationErrors.surname}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                />
              </div>
              <Dropdown
                name="typeUser"
                label="Tipo de usuario"
                icon="info"
                source={statusOptions}
                value={model.typeUser || ''}
                error={validationErrors.typeUser}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Input
                icon="mail"
                name="email"
                type="email"
                label="Email"
                value={model.email || ''}
                error={validationErrors.email}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Input
                icon="phone"
                name="officePhone"
                type="number"
                label="Teléfono"
                value={model.officePhone || ''}
                error={validationErrors.officePhone}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Input
                icon="lock"
                name="authorities"
                type="text"
                label="Roles"
                value={model.authorities || ''}
                error={validationErrors.authorities}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Dropdown
                name="companyId"
                label="Empresa"
                icon="business"
                source={companies}
                value={model.companyId}
                error={validationErrors.companyId}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Button
                primary raised
                disabled={!isValid || loading}
                className="edit-dialog-button"
                label="Guardar"
                type="submit"
              />
              <Button 
                className="edit-dialog-button"
                label="Cancelar"
                onClick={this.onCancel} />
            </form>
          )}
        </Dialog>
      </div>
    );
  }
}

export default UserDialog
