import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
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
    const id = parseInt(routeParams.id, 10);
    if(!isNaN(id)) {
      dispatch(fetchSingleUser(id))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(resetUser())
  }

  onCancel = () => {
    browserHistory.push('/users')
  }
  onSubmit = (ev) => {
    ev.preventDefault()
    const { user, dispatch, routeParams } = this.props
    let action = null
    if(isNaN(routeParams.id)) {
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
    const dialogActions = [
      {label: "Cancelar", onClick: this.onCancel},
      {label: "Guardar", primary: true, onClick: this.onSubmit}
    ]
    const {user, loading, error, routeParams} = this.props;
    return (
      <div className="edit-user">
        <Dialog
          className="edit-dialog"
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={isNaN(routeParams.id) ? 'Nuevo usuario':'Editar usuario'}
        >
          {loading && <p className="color-primary">Cargando ...</p>}
          {error && <p className="color-error">{error}</p>}
          <form 
            onSubmit={this.onSubmit}
            style={{
              display: loading ? 'none':'block',
            }}>
            <Input
              icon="person"
              name="login"
              type="text"
              label="Nombre de usuario"
              value={user.login || ''}
              onChange={this.onChange}
            />
            <div style={{display: 'flex'}} >
              <Input
                icon="lock"
                name="password"
                type="password"
                label="Contraseña"
                value={user.password || ''}
                onChange={this.onChange}
              />
              <Input
                name="password"
                type="password"
                label="Repetir contraseña"
                value={user.password || ''}
                onChange={this.onChange}
              />
            </div>
            <div style={{display: 'flex'}}>
              <Input
                name="name"
                label="Nombre"
                icon="person_outline"
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
    error: state.users.error,
    loading: state.users.loading,
    user: state.users.activeUser || {}
  }
}

export default connect(mapStateToProps)(EditUser);
