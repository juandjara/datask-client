import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import { browserHistory } from 'react-router'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ROLES = ['ADMIN', 'DEVELOPER', 'CUSTOMER']
.map(role => ({label: role, value: role}))

class UserDialog extends Component {
  componentDidMount() {
    const {
      id, user, isEditMode, companies,
      fetchUserIfNeeded, fetchClientsPage
    } = this.props
    if(isEditMode) {
      fetchUserIfNeeded(id)
    }
    if(!companies.length) {
      fetchClientsPage(0, 1000)
    }
    this.initForm(user)
  }
  componentWillUnmount = () => {
    this.props.resetForm()
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.user !== this.props.user) {
      this.initForm(nextProps.user)
    }
  }
  initForm = (user) => {
    if(!user.loading && !user.missing) {
      this.props.initForm({
        ...user
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
  onRoleSelect = (roles) => {
    this.props.onChange('roles', roles.map(r => r.value))
  }
  onBlur = (ev) => {
    const name = ev.target.name
    this.props.onBlur(name)
  }
  onCancel = () => {
    browserHistory.push('/users')
  }

  render() {
    const {model, loading, validationErrors, companies} = this.props
    const editMode = this.props.isEditMode
    return (
      <div className="edit-user">
        <Dialog
          className="edit-dialog"
          active={true}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={editMode ? 'Editar usuario':'Nuevo usuario'}
        >
          {loading && (
            <p style={{margin: '1em'}} className="color-primary">Cargando ...</p>
          )}
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
              icon="mail"
              name="email"
              type="email"
              label="Email*"
              value={model.email || ''}
              error={validationErrors.email}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />   
            <div style={{display: 'flex'}}>
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
            <div style={{display: 'flex'}}>
              <Input
                type="password"
                name="password"
                icon="lock"                  
                label="Contraseña*"
                value={model.password || ''}
                error={validationErrors.password}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
              <Input
                type="password"
                name="repeat_password"
                label="Repetir contraseña*"
                value={model.repeat_password || ''}
                error={validationErrors.repeat_password}
                onChange={this.onChange}
                onBlur={this.onBlur}
              />
            </div>
            <div style={{display: 'flex'}}>
              <label className="select-label" htmlFor="roles">
                <Icon>lock_outline</Icon>
              </label>
              <Select 
                multi
                name="roles"
                value={model.roles}
                className="select"
                options={ROLES}
                onChange={this.onRoleSelect}
              />
            </div>
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
              onClick={this.onCancel}
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default UserDialog
