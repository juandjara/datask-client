import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import { browserHistory } from 'react-router'
import ProjectForm from './ProjectForm'

export default class ProjectFormDialog extends Component {
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  onCancel() {
    browserHistory.push('/projects')
  }
  render() {
    const editMode = this.isEditMode()
    return (
      <div className="edit-project">
        <Dialog
          className="edit-dialog"
          active={true}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={editMode ? 'Editar proyecto':'Nuevo proyecto'}
        >
          <ProjectForm
            routeParams={this.props.routeParams}
            onCancel={this.onCancel}
          />
        </Dialog>
      </div>
    )
  }
}
