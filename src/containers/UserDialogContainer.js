import React, {Component} from 'react'
import UserDialog from './UserDialog'
import { connect } from 'react-redux'
import {
  fetchUserIfNeeded,
  editUser,
  getUserById
} from '../reducers/users.reducer'
import { setProperty, initForm, resetForm } from '../reducers/form.reducer'
import { fetchClients } from '../reducers/clients.reducer'
import validate from 'react-reformed/lib/validate'
import { compose } from 'redux'

class UserDialogContainer extends Component {
  onSubmit = (ev) => {
    ev.preventDefault()
    const { user, editUser } = this.props
    user.authorities = user.authorities.split(',').map(a => a.trim())
    editUser(user, this.isEditMode())
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.setProperty(name, text)
  }
  isEditMode() {
    return !isNaN(this.props.routeParams.id)
  }
  render() {
    return (
      <UserDialog
        id={this.props.routeParams.id}
        isEditMode={this.isEditMode()} 
        onChange={this.onChange} 
        onSubmit={this.onSubmit}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = getUserById(state, ownProps.routeParams.id)
  return {
    loading: user.loading,
    user,
    model: state.ui.form,
    companies: state.clients.currentPage.map(comp => ({
      id: comp.id,
      value: comp.id,
      label: comp.name
    }))
  }
}
const actions = {
  fetchUserIfNeeded, editUser, fetchClients,
  setProperty, resetForm, initForm
}
const isRequired = key => ([
  model => !!model[key],
  `${key} es un campo obligatorio`
])

export default compose(
  connect(mapStateToProps, actions),
  validate([
    isRequired('login'),
    isRequired('email')
  ])
)(UserDialogContainer);
