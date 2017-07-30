import React, {Component} from 'react'
import ProjectDialog from '../components/ProjectDialog'
import { connect } from 'react-redux'
import {
  fetchProjectIfNeeded,
  editProject,
  getProjectById
} from '../reducers/projects.reducer'
import { setProperty, touchProperty, initForm, resetForm, setTouched } from '../reducers/form.reducer'
import validate, {isRequired} from '../components/Validate'
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
    const touched = 'name'
      .split(',')
      .reduce((prev, next) => {
        prev[next] = true
        return prev
      }, {})
    this.props.setTouched(touched)
  }
  isEditMode() {
    return !isNaN(this.props.routeParams.id)
  }
  render() {
    return (
      <ProjectDialog
        id={this.props.routeParams.id}
        isEditMode={this.isEditMode()} 
        onChange={this.props.setProperty}
        onBlur={this.props.touchProperty} 
        onSubmit={this.onSubmit}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const project = getProjectById(state, ownProps.routeParams.id)
  const {model, touched} = state.ui.form
  return {
    loading: project.loading,
    project,
    model,
    touched
  }
}
const actions = {
  fetchProjectIfNeeded, editProject,
  setProperty, touchProperty, resetForm, initForm, setTouched
}

export default compose(
  connect(mapStateToProps, actions),
  validate([
    isRequired('name')
  ])
)(ProjectDialogContainer);
