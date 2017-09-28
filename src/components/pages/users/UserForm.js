import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'

import { connect } from 'react-redux'
import {
  fetchSingleUser, editUser, getUserById
} from 'reducers/users.reducer'

import validators from 'services/formValidators'
import FormFields from 'components/shared/FormFields'

const ROLES = ['ADMIN', 'DEVELOPER', 'CUSTOMER']
.map(role => ({label: role, value: role}))

const {required, minLength, matchKey, email} = validators
const {renderCheckbox, renderInput, renderSelect} = FormFields

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
    return this.props.editUser(data, this.isEditMode())
  }
  render() {
    const {handleSubmit, submitting, loading} = this.props    
    const editMode = this.isEditMode()
    const passwordRequired = editMode ? () => undefined : required
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
          validate={[email, required]} 
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
            validate={[matchKey('repeat_password'), minLength(8), passwordRequired]} 
          />
          <Field 
            name="repeat_password" 
            label="Repeitr contraseña" 
            type="password" 
            component={renderInput} 
            validate={[matchKey('password'), minLength(8), passwordRequired]}
          />
        </div>
        <Field
          multi
          icon="lock_outline"
          name="roles"
          className="select"
          options={ROLES}
          placeholder="Roles"
          normalize={roles => roles.map(r => r.value)}
          component={renderSelect}
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
    return {
      loading: user.loading,
      initialValues: user
    }
  },
  {fetchSingleUser, editUser}
)(UserForm)

export default UserForm
