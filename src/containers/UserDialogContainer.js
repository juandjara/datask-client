import React, {Component} from 'react'
import UserDialog from '../components/UserDialog'
import { connect } from 'react-redux'
import {
  fetchUserIfNeeded,
  editUser,
  getUserById
} from '../reducers/users.reducer'
import { setProperty, touchProperty, initForm, resetForm } from '../reducers/form.reducer'
import { fetchClientsPage, getClientsPage } from '../reducers/clients.reducer'
import validate, {isRequired, passwordMatch} from '../components/Validate'
import { compose } from 'redux'

class UserDialogContainer extends Component {
  onSubmit = (user) => {
    const { editUser } = this.props
    user.authorities = user.authorities.split(',').map(a => a.trim())
    editUser(user, this.isEditMode())
  }
  isEditMode() {
    return !isNaN(this.props.routeParams.id)
  }
  render() {
    return (
      <UserDialog
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
  const user = getUserById(state, ownProps.routeParams.id)
  const companies = getClientsPage(state).items
  const {model, touched} = state.ui.form
  return {
    loading: user.loading,
    user,
    model,
    touched,
    companies: companies.map(comp => ({
      id: comp.id,
      value: comp.id,
      label: comp.name
    }))
  }
}
const actions = {
  fetchUserIfNeeded, editUser, fetchClientsPage,
  setProperty, touchProperty, resetForm, initForm
}

export default compose(
  connect(mapStateToProps, actions),
  validate([
    isRequired('login'),
    isRequired('email'),
    isRequired('password'),
    isRequired('repeat_password'),
    passwordMatch('password', 'repeat_password'),
    passwordMatch('repeat_password', 'password')
  ])
)(UserDialogContainer);
