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
    if(user !== this.props.user && user && !user.loading && !user.missing) {
      this.props.initForm({
        ...user,
        authorities: user.authorities.join(', ')
      })
    }
  }
  
  onCancel = () => {
    browserHistory.push('/users')
  }

  render() {
    const statusOptions = [
      {value: "INTERNAL", label: "Interno"},
      {value: "CONTACT", label: "Contacto"},
    ]
    const {model, loading, validationErrors, companies} = this.props
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
          {validationErrors.map(msg => (
            <p className="color-error">{msg}</p>
          ))}
          {loading ? (
            <p style={{margin: '1em'}} className="color-primary">Cargando ...</p>
          ) : (
            <form onSubmit={this.props.onSubmit}>
              <Checkbox
                className="edit-dialog-active"
                name="activated"
                checked={model.activated}
                onChange={this.props.onChange}
                label="Activado"
              />
              <Input
                icon="person_outline"
                disabled={editMode}
                name="login"
                label="Nombre de usuario"
                value={model.login || ''}
                onChange={this.props.onChange}
              />                
              {editMode ? null : (
                <div style={{display: 'flex'}} >
                  <Input
                    type="password"
                    name="password"
                    icon="lock"                  
                    label="Contraseña"
                    value={model.password || ''}
                    onChange={this.props.onChange}
                  />
                  <Input
                    type="password"
                    name="repeat_password"
                    label="Repetir contraseña"
                    value={model.repeat_password || ''}
                    onChange={this.props.onChange}
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
                  onChange={this.props.onChange}
                />
                <Input
                  name="surname"
                  label="Apellidos"
                  value={model.surname || ''}
                  onChange={this.props.onChange}
                />
              </div>
              <Dropdown
                name="typeUser"
                label="Tipo de usuario"
                icon="info"
                source={statusOptions}
                value={model.typeUser || ''}
                onChange={this.props.onChange}
              />
              <Input
                icon="mail"
                name="email"
                type="email"
                label="Email"
                value={model.email || ''}
                onChange={this.props.onChange}
              />
              <Input
                icon="phone"
                name="officePhone"
                type="number"
                label="Teléfono"
                value={model.officePhone || ''}
                onChange={this.props.onChange}
              />
              <Input
                icon="lock"
                name="authorities"
                type="text"
                label="Roles"
                value={model.authorities || ''}
                onChange={this.props.onChange}
              />
              <Dropdown
                name="companyId"
                label="Empresa"
                icon="business"
                source={companies}
                value={model.companyId}
                onChange={this.props.onChange}
              />
              <Button
                primary raised
                disabled={loading}
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
