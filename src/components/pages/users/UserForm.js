import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'
import FormFields from 'components/shared/FormFields'

import { connect } from 'react-redux'
import {
  fetchSingleUser, editUser, getUserById
} from 'reducers/users.reducer'
import validators from 'services/formValidators'
import {searchCompanies} from 'services/selectHelpers'

const ROLES = ['ADMIN', 'DEVELOPER', 'CUSTOMER']
.map(role => ({label: role, value: role}))

const {required, minLength, matchKey, email} = validators
const {renderCheckbox, renderInput, renderSelect, renderAsyncSelect} = FormFields

const passwordRules = [
  matchKey('repeat_password'),
  minLength(8)
]
const passRepeatRules = [
  matchKey('password'),
  minLength(8)
]
const emailValidators = [
  email, 
  required
]

class UserForm extends React.Component {
  componentDidMount() {
    const {routeParams, fetchSingleUser} = this.props
    if(this.isEditMode()) {
      fetchSingleUser(routeParams._id)
    }
  }
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  saveUser(data) {
    data.company = data.company.value
    const editMode = this.isEditMode()
    return this.props.editUser(data, editMode)
  }
  render() {
    const {handleSubmit, submitting, loading} = this.props    
    const editMode = this.isEditMode()
    let passRepeatValidators = passRepeatRules
    let passwordValidators   = passwordRules
    if(!editMode) {
      passwordValidators   = passwordRules.concat(required)
      passRepeatValidators = passRepeatRules.concat(required)
    }
    return (
      <form onSubmit={handleSubmit(this.saveUser.bind(this))}>
        <Field
          className="edit-dialog-active"
          name="activated"
          label="Activado"
          component={renderCheckbox}
        />
        <Field 
          name="email"
          type="email"
          icon="mail"
          label="Correo electrónico" 
          component={renderInput}
          validate={emailValidators} 
        />
        <div style={{display: 'flex'}}>
          <Field 
            name="name" 
            type="text"
            icon="person" 
            label="Nombre"
            component={renderInput} 
          />
          <Field 
            name="surname" 
            label="Apellidos"
            type="text" 
            component={renderInput} 
          />
        </div>
        <div style={{display: 'flex'}}>
          <Field 
            icon="lock" 
            name="password" 
            label="Contraseña" 
            type="password" 
            component={renderInput}
            validate={passwordValidators} 
          />
          <Field 
            name="repeat_password" 
            label="Repeitr contraseña" 
            type="password" 
            component={renderInput} 
            validate={passRepeatValidators}
          />
        </div>
        <Field
          multi
          icon="lock_outline"
          name="roles"
          className="select"
          options={ROLES}
          label="Roles"
          normalize={roles => roles.map(r => r.value)}
          component={renderSelect}
        />
        <Field
          icon="business"
          name="company"
          label="Cliente"
          className="select select-outer-top"
          placeholder="Escribe para buscar"
          loadOptions={searchCompanies}
          component={renderAsyncSelect}
        />
        <div style={{marginTop: '2em'}}>
          <Button
            primary raised
            disabled={submitting || loading}
            className="edit-dialog-button"
            label="Guardar"
            type="submit"
          />
          <Button
            className="edit-dialog-button"
            label="Cancelar"
            onClick={this.props.onCancel}
          />
        </div>
      </form>
    )
  }
}

UserForm = reduxForm({
  form: 'userForm',
  enableReinitialize: true
})(UserForm)

UserForm = connect(
  (state, props) => {
    const user = getUserById(state, props.routeParams._id)
    if(user.missing) {
      user.activated = true
    }
    if(user.company && user.company._id) {
      user.company = {
        value: user.company._id,
        label: user.company.name
      }
    }
    return {
      loading: user.loading,
      initialValues: user
    }
  },
  {fetchSingleUser, editUser}
)(UserForm)

export default UserForm
