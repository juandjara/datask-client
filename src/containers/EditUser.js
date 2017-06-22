import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchSingleUser,
  resetUser,
  updateUserField,
  saveUser,
  createUser
} from '../reducers/users.reducer'

class EditUser extends Component {
  state = {
    active: true
  }
  componentDidMount() {
    const { routeParams, dispatch } = this.props;
    if(this.isEditMode()) {
      dispatch(fetchSingleUser(routeParams.id))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(resetUser())
  }

  onCancel = () => {
    browserHistory.push('/users')
  }
  isEditMode() {
    return !isNaN(this.props.routeParams.id)
  }
  onSubmit = (ev) => {
    ev.preventDefault()
    const { user, dispatch } = this.props
    if(user.password !== user.repeat_password) {
      dispatch({
        type: 'USER_UPDATE_ERROR',
        error: 'Las contraseñas no coinciden'
      })
      return
    }
    let action = null
    if(this.isEditMode()) {
      action = createUser 
    } else {
      action = saveUser
    }
    dispatch(action(user))
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.dispatch(updateUserField(name, text))
  }
  render() {
    const statusOptions = [
      {value: "INTERNAL", label: "Interno"},
      {value: "CONTACT", label: "Contacto"},
    ]
    const {user, loading, error} = this.props;
    const editMode = this.isEditMode();
    return (
      <div className="edit-user">
        <Dialog
          className="edit-dialog"
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={editMode ? 'Editar usuario':'Nuevo usuario'}
        >
          {error && (
            <p style={{margin: '1em'}} className="color-error">{error}</p>
          )}
          {loading ? (
            <p style={{margin: '1em'}} className="color-primary">Cargando ...</p>
          ) : (
            <form onSubmit={this.onSubmit}>
              <Checkbox
                className="edit-dialog-active"
                name="activated"
                checked={user.activated}
                onChange={this.onChange}
                label="Activado"
              />
              <Input
                icon="person_outline"
                disabled={editMode}
                name="login"
                label="Nombre de usuario"
                value={user.login || ''}
                onChange={this.onChange}
              />                
              {editMode ? null : (
                <div style={{display: 'flex'}} >
                  <Input
                    type="password"
                    name="password"
                    icon="lock"                  
                    label="Contraseña"
                    value={user.password || ''}
                    onChange={this.onChange}
                  />
                  <Input
                    type="password"
                    name="repeat_password"
                    label="Repetir contraseña"
                    value={user.repeat_password || ''}
                    onChange={this.onChange}
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
                  value={user.name || ''}
                  onChange={this.onChange}
                />
                <Input
                  name="surname"
                  label="Apellidos"
                  value={user.surname || ''}
                  onChange={this.onChange}
                />
              </div>
              <Dropdown
                name="typeUser"
                label="Tipo de usuario"
                icon="info"
                source={statusOptions}
                value={user.typeUser || ''}
                onChange={this.onChange}
              />
              <Input
                icon="mail"
                name="email"
                type="email"
                label="Email"
                value={user.email || ''}
                onChange={this.onChange}
              />
              <Input
                icon="phone"
                name="officePhone"
                type="number"
                label="Teléfono"
                value={user.officePhone || ''}
                onChange={this.onChange}
              />
              <Button
                primary raised
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

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.users.error,
    loading: state.users.loading,
    user: state.users.activeUser
  }
}

export default connect(mapStateToProps)(EditUser);
