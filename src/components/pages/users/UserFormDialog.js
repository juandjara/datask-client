import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import UserForm from './UserForm'
import { browserHistory } from 'react-router'

export default class UserFormDialog extends Component {
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  onCancel() {
    browserHistory.push('/users')    
  }
  render() {
    const editMode = this.isEditMode()
    return (
      <div className="edit-user">
        <Dialog
          className="edit-dialog"
          active={true}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={editMode ? 'Editar usuario':'Nuevo usuario'}
        >
          <UserForm 
            routeParams={this.props.routeParams}
            onCancel={this.onCancel}
          />
        </Dialog>
      </div>
    )
  }
}
