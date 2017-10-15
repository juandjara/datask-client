import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'
import FormFields from 'components/shared/FormFields'
import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Flex from 'components/shared/Flex'

import { connect } from 'react-redux'
import validators from 'services/formValidators'
import { fetchProfile, saveProfile } from 'reducers/profile.reducer'
import styled from 'styled-components'

const {required, minLength, matchKey, email} = validators
const passwordRules   = [matchKey('repeat_password'), minLength(8)]
const passRepeatRules = [matchKey('password'), minLength(8)]
const emailRules = [email, required]

const {renderInput} = FormFields

const InputGroup = styled.div`
  display: flex;
  [data-react-toolbox="input"] {
    flex: 1;
  } 
`

export class ProfileForm extends Component {
  componentDidMount() {
    this.props.fetchProfile()    
  }
  render() {
    const {handleSubmit, submitting, loading} = this.props    
    return (
      <form className="edit-form" onSubmit={handleSubmit(this.props.saveProfile)}>
        <h2>Mi cuenta</h2>
        {loading && (
          <Flex align="center">
            <ProgressBar type='circular' mode='indeterminate' />
            <p className="color-primary" style={{marginLeft: '1rem'}}>
              Cargando ...
            </p>
          </Flex>
        )}
        <Field 
          name="email"
          type="email"
          icon="mail"
          label="Correo electrónico" 
          component={renderInput}
          validate={emailRules} 
        />
        <InputGroup>
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
        </InputGroup>
        <InputGroup>
          <Field 
            icon="lock" 
            name="password" 
            label="Contraseña" 
            type="password" 
            component={renderInput}
            validate={passwordRules} 
          />
          <Field 
            name="repeat_password" 
            label="Repeitr contraseña" 
            type="password" 
            component={renderInput} 
            validate={passRepeatRules}
          />
        </InputGroup>
        <Button
          primary raised
          disabled={submitting || loading}
          className="edit-form-button"
          label="Guardar"
          type="submit"
        />
      </form>
    )
  }
}

ProfileForm = reduxForm({
  form: 'profileForm',
  enableReinitialize: true
})(ProfileForm)

ProfileForm = connect(
  state => ({
    initialValues: state.profile,
    loading: state.profile.loading
  }),
  {fetchProfile, saveProfile}
)(ProfileForm)

export default ProfileForm
