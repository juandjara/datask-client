import React, {Component} from 'react'
import Dialog from 'react-toolbox/lib/dialog/Dialog'
import Input from 'react-toolbox/lib/input/Input'
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown'
import Button from 'react-toolbox/lib/button/Button'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {
  fetchSingleClient,
  resetClient,
  updateClientField,
  saveClient,
  createClient
} from '../reducers/clients.reducer'

class EditClient extends Component {
  state = {
    active: true
  }
  componentDidMount() {
    const { routeParams, dispatch } = this.props;
    const id = parseInt(routeParams.id, 10);
    if(!isNaN(id)) {
      dispatch(fetchSingleClient(id))
    }
  }
  componentWillUnmount() {
    this.props.dispatch(resetClient())
  }

  onCancel = () => {
    browserHistory.push('/clients')
  }
  onSubmit = (ev) => {
    ev.preventDefault()
    const { client, dispatch, routeParams } = this.props
    let action = null
    if(isNaN(routeParams.id)) {
      action = createClient
    } else {
      action = saveClient
    }
    dispatch(action(client))
  }
  onChange = (text, ev) => {
    const name = ev.target.name;
    this.props.dispatch(updateClientField(name, text))
  }
  render() {
    const statusOptions = [
      {value: "INTERNAL", label: "Interno"},
      {value: "CONTACT", label: "Contacto"},
    ]
    const dialogActions = [
      {label: "Cancelar", onClick: this.onCancel},
      {label: "Guardar", primary: true, onClick: this.onSubmit}
    ]
    const {client, loading, error, routeParams} = this.props;
    return (
      <div className="edit-client">
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.onCancel}
          onOverlayClick={this.onCancel}
          title={isNaN(routeParams.id) ? 'Nuevo cliente':'Editar cliente'}
        >
          {loading && <p className="color-primary">Cargando ...</p>}
          {error && <p className="color-error">{error}</p>}
          <form onSubmit={this.onSubmit}
                style={{
                  display: loading ? 'none':'block'
                }}>
            <Input
              name="name"
              label="Nombre"
              value={client.name || ''}
              onChange={this.onChange}
            />
            <Dropdown
              name="typeCompany"
              label="Tipo de cliente"
              icon="info"
              source={statusOptions}
              value={client.typeCompany || ''}
              onChange={this.onChange}
            />
            <Input
              icon="location_on"
              name="address"
              label="Dirección"
              value={client.address || ''}
              onChange={this.onChange}
            />
            <Button
              primary raised
              label="Guardar"
              type="submit"
            />
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.clients.error,
    loading: state.clients.loading,
    client: state.clients.activeClient || {}
  }
}

export default connect(mapStateToProps)(EditClient);
