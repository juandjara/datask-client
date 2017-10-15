import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'react-toolbox/lib/button/Button'
import FormFields from 'components/shared/FormFields'
import { connect } from 'react-redux'
import validators from 'services/formValidators'
import { 
  fetchSingleClient, 
  editClient, 
  getClientByID 
} from 'reducers/clients.reducer'
import BackButton from 'components/shared/BackButton'
import { browserHistory } from 'react-router'

const {required} = validators
const {renderInput, renderSelect} = FormFields
const statusOptions = [
  {value: "INTERNAL", label: "Interno"},
  {value: "CONTACT", label: "Contacto"},
]

class ClientForm extends Component {
  componentDidMount() {
    const {routeParams, fetchSingleClient} = this.props
    if(this.isEditMode()) {
      fetchSingleClient(routeParams._id)
    }
  }
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  onCancel() {
    browserHistory.push('/clients')
  }
  saveClient = (data) => {

  }
  render() {
    const {handleSubmit, submitting, loading} = this.props
    const editMode = this.isEditMode()    
    return (
      <form className="edit-form" onSubmit={handleSubmit(this.saveClient)}>
        <BackButton router={this.props.router} />
        <h2>{editMode ? 'Editar cliente':'Nuevo cliente'}</h2>
        <Field 
          name="name"
          label="Nombre"
          component={renderInput}
          validate={required}
        />
        <Field 
          icon="info"
          name="type"
          label="Tipo de cliente"
          className="select"
          options={statusOptions}
          component={renderSelect}
        />
        <Field 
          icon="location_on"
          name="address"
          label="Dirección"
          component={renderInput}
        />
        <div style={{marginTop: '1em'}}>
          <Button
            primary raised
            disabled={submitting || loading}
            className="edit-form-button"
            label="Guardar"
            type="submit"
          />
          <Button
            className="edit-form-button"
            label="Cancelar"
            onClick={this.onCancel}
          />
        </div>
      </form>
    )
  }
}

ClientForm = reduxForm({
  form: 'clientForm',
  enableReinitialize: true  
})(ClientForm)

ClientForm = connect(
  (state, props) => {
    const client = getClientByID(state, props.routeParams._id)
    return {
      loading: client.loading,
      initialValues: client
    }
  }, 
  {fetchSingleClient, editClient}
)(ClientForm)

export default ClientForm
