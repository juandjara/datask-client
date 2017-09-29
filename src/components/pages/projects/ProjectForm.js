import React from 'react'
import { Field, reduxForm } from 'redux-form'

import Button from 'react-toolbox/lib/button/Button'
import FormFields from 'components/shared/FormFields'

import { connect } from 'react-redux'
import validators from 'services/formValidators'
import {
  fetchSingleProject, editProject, getProjectById
} from 'reducers/projects.reducer'
import {searchCompanies} from 'services/selectHelpers'

const statusOptions = [
  {value: "ACTIVE", label: "Activo"},
  {value: "PAUSED", label: "En pausa"},
  {value: "FINISHED", label: "Completado"}
]

const {required} = validators
const {renderInput, renderSelect, renderAsyncSelect} = FormFields

class ProjectForm extends React.Component {
  componentDidMount() {
    const {routeParams, fetchSingleProject} = this.props
    if(this.isEditMode()) {
      fetchSingleProject(routeParams._id)
    }
  }
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  saveProject(data) {
    data.status  = data.status && data.status.value
    data.company = data.status && data.company.value
    const editMode = this.isEditMode()
    return this.props.editProject(data, editMode)
  }
  render() {
    const {handleSubmit, submitting, loading} = this.props    
    return (
      <form onSubmit={handleSubmit(this.saveProject.bind(this))}>
        <Field
          name="name"
          label="Nombre"
          component={renderInput}
          validate={required}
        />
        <h2>Estado</h2>
        <Field
          name="status"
          label="Estado"
          icon="info"
          options={statusOptions}
          component={renderSelect}
          className="select"
          placeholder="Estado"
        />
        <Field
          icon="business"
          name="company"
          className="select select-outer-top"
          placeholder="Escribe para buscar"
          loadOptions={searchCompanies}
          component={renderAsyncSelect}
        />
        <Field
          icon="lightbulb_outline"
          name="completedEstimated"
          type="number"
          min="0" max="100"
          label="% completado estimado"
          component={renderInput}
        />
        <h2>Presupuesto</h2>
        <Field
          type="number"
          min="0"
          icon="timer"
          label="Importe propio"
          name="budget.ownAmount"
          component={renderInput}
        />
        <Field
          type="number"
          min="0"
          icon="euro_symbol"
          label="Horas"
          name="budget.hours"
          component={renderInput}
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

ProjectForm = reduxForm({
  form: 'projectForm',
  enableReinitialize: true
})(ProjectForm)

ProjectForm = connect(
  (state, props) => {
    const project = getProjectById(state, props.routeParams._id)
    return {
      loading: project.loading,
      initialValues: project
    }
  },
  {fetchSingleProject, editProject}
)(ProjectForm)

export default ProjectForm
