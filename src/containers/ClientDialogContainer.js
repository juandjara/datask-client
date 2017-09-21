import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setProperty, touchProperty, initForm, resetForm, setTouched } from '../reducers/form.reducer'
import validate, {isRequired} from '../components/Validate'
import { compose } from 'redux'
import { 
  fetchClientIfNeeded, 
  editClient, 
  getClientByID 
} from '../reducers/clients.reducer'
import ClientDialog from '../components/ClientDialog'

class ClientDialogContainer extends Component {
  onSubmit = (client) => {
    const {editClient, isValid, loading} = this.props
    if(!isValid || loading) {
      this.touchAll()
      return
    }
    editClient(client, this.isEditMode())
  }
  touchAll() {
    this.props.setTouched(['name'])
  }
  isEditMode() {
    return this.props.routeParams._id !== "new"
  }
  render() {
    return (
      <ClientDialog 
        id={this.props.routeParams._id}
        isEditMode={this.isEditMode()}
        onChange={this.props.setProperty}
        onSubmit={this.onSubmit}
        onBlur={this.props.touchProperty}
        {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const client = getClientByID(state, ownProps.routeParams._id)
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
  setProperty, touchProperty, resetForm, initForm, setTouched
}
export default compose(
  connect(mapStateToProps, actions),
  validate([isRequired('name')])
)(ClientDialogContainer)
