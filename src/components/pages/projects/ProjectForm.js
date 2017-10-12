import React from 'react'
import { Field, reduxForm } from 'redux-form'

import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Button from 'react-toolbox/lib/button/Button'
import IconButton from 'react-toolbox/lib/button/IconButton'
import FormFields from 'components/shared/FormFields'

import { connect } from 'react-redux'
import validators from 'services/formValidators'
import {
  fetchSingleProject,
  editProject, 
  getProjectById
} from 'reducers/projects.reducer'
import {searchCompanies, searchUsers} from 'services/selectHelpers'

const statusOptions = [
  {value: "ACTIVE", label: "Activo"},
  {value: "PAUSED", label: "En pausa"},
  {value: "FINISHED", label: "Completado"}
]

const {required} = validators
const {
  renderInput, 
  renderSelect, 
  renderAsyncSelect, 
  renderDatepicker
} = FormFields

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
    data.company = data.company && data.company.value
    data.manager = data.manager && data.manager.value
    const editMode = this.isEditMode()
    return this.props.editProject(data, editMode)
  }
  render() {
    const {handleSubmit, submitting, loading} = this.props
    return (
      <form onSubmit={handleSubmit(this.saveProject.bind(this))}>
        <h2>Proyecto</h2>
        <Field
          name="name"
          label="Nombre"
          component={renderInput}
          validate={required}
        />
        <Field 
          name="manager"
          icon="person_outline"
          label="Responsable"
          className="select"
          placeholder="Escribe para buscar"
          loadOptions={searchUsers}
          component={renderAsyncSelect}
        />
        <Field
          name="status"
          label="Estado"
          icon="info"
          options={statusOptions}
          component={renderSelect}
          className="select"
        />
        <Field
          icon="business"
          name="company"
          className="select"
          label="Cliente"
          placeholder="Escribe para buscar"
          loadOptions={searchCompanies}
          component={renderAsyncSelect}
        />
        <Field
          icon="lightbulb_outline"
          name="completedEstimated"
          type="number"
          min="0" max="100" step="0.01"
          label="% completado estimado"
          component={renderInput}
        />
        <h2>Presupuesto</h2>
        <Field
          type="number"
          min="0" step="0.01"
          icon="euro_symbol"
          label="Importe propio"
          name="budget.ownAmount"
          component={renderInput}
        />
        <Field
          type="number"
          min="0" step="0.01"
          icon="timer"
          label="Horas"
          name="budget.hours"
          component={renderInput}
        />
        <Field
          icon="date_range"
          label="Fecha contratación"
          name="budget.billingDate"
          locale="es"
          autoOk
          component={renderDatepicker}
        />
        <Field
          icon="date_range"
          label="Fecha inicion"
          name="budget.startDate"
          locale="es"
          autoOk
          component={renderDatepicker}
        />
        <Field
          icon="date_range"
          label="Fecha fin"
          name="budget.endDate"
          locale="es"
          autoOk
          component={renderDatepicker}
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
    if(project.budget) {
      project.budget.billingDate = new Date(project.budget.billingDate)
      project.budget.startDate = new Date(project.budget.startDate)
      project.budget.endDate = new Date(project.budget.endDate)      
    }
    if(project.company && project.company._id) {
      project.company = {
        value: project.company._id,
        label: project.company.name
      }
    }
    return {
      loading: project.loading,
      project: project,
      initialValues: project
    }
  },
  {fetchSingleProject, editProject}
)(ProjectForm)

export default ProjectForm
