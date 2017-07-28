import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setProperty, touchProperty, initForm, resetForm } from '../reducers/form.reducer'
import validate, {isRequired} from '../components/Validate'
import { compose } from 'redux'
import { 
  fetchClientIfNeeded, 
  editClient, 
  getClientByID 
} from '../reducers/clients.reducer'
import ClientDialog from './ClientDialog'

class ClientDialogContainer extends Component {
  onSubmit = (client) => {
    const {editClient} = this.props
    editClient(client, this.isEditMode())
  }
  isEditMode() {
    return !isNaN(this.props.routeParams.id)
  }
  render() {
    return (
      <ClientDialog 
        id={this.props.routeParams.id}
        isEditMode={this.isEditMode()}
        onChange={this.props.setProperty}
        onSubmit={this.props.touchProperty}
        onSubmit={this.onSubmit}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const client = getClientByID(state, ownProps.routeParams.id)
  const {model, touched} = state.ui.form
  return {
    loading: client.loading,
    client,
    model,
    touched
  }
}
const actions = {
  fetchClientIfNeeded, editClient,
  setProperty, touchProperty, resetForm, initForm
}
export default compose(
  connect(mapStateToProps, actions),
  validate([isRequired('name')])
)(ClientDialogContainer)
