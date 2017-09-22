import React, {Component} from 'react'
import ProjectDialog from './ProjectDialog'
import { connect } from 'react-redux'
import {
  fetchProjectIfNeeded,
  editProject,
  getProjectById
} from 'reducers/projects.reducer'
import { 
  fetchClientsPage, getClientsSelect 
} from 'reducers/clients.reducer'
import { 
  setProperty, touchProperty, initForm, resetForm, setTouched 
} from 'reducers/form.reducer'
import validate, {isRequired} from 'components/shared/Validate'
import { compose } from 'redux'

class ProjectDialogContainer extends Component {
  onSubmit = (project) => {
    const {editProject, isValid, loading} = this.props
    if(!isValid || loading) {
      this.touchAll()
      return
    }
    editProject(project, this.isEditMode())
  }
  touchAll() {
    this.props.setTouched(['name'])
  }
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  render() {
    return (
      <ProjectDialog
        id={this.props.routeParams._id}
        isEditMode={this.isEditMode()} 
        onChange={this.props.setProperty}
        onBlur={this.props.touchProperty} 
        onSubmit={this.onSubmit}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const project = getProjectById(state, ownProps.routeParams._id)
  const companies = getClientsSelect(state)
  const {model, touched} = state.ui.form
  return {
    loading: project.loading,
    project,
    model,
    touched,
    companies
  }
}
const actions = {
  fetchProjectIfNeeded, editProject, fetchClientsPage,
  setProperty, touchProperty, resetForm, initForm, setTouched
}

export default compose(
  connect(mapStateToProps, actions),
  validate([
    isRequired('name')
  ])
)(ProjectDialogContainer);
