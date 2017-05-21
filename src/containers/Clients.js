import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchClients, deleteClient } from '../reducers/clients.reducer'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Clients extends Component {
  componentDidMount() {
    this.props.dispatch(fetchClients());
  }
  deleteClient = (client) => {
    this.props.dispatch(deleteClient(client));
  }
  renderListActions(client) {
    const actionsData = [
      {link: `/clients/${client.id}`, icon: 'edit', tooltip: 'Editar'}
    ]
    const actions = actionsData.map((action, i) => (
      <Link
        to={action.link}
        key={`action${i}_client${client.id}`}
        style={{color: '#757575'}} >
        <TooltipIcon
          tooltip={action.tooltip}
          value={action.icon} />
      </Link>
    ))
    actions.push((
      <ConfirmDeleteButton
        tooltip="Borrar cliente"
        title={`Borrar cliente ${client.name}`}
        key={`delete_client${client.id}`}
        onDelete={() => this.deleteClient(client)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, error, children} = this.props;
    const clients = this.props.clients || [];
    return (
      <div className="clients list-container">
        <div className="list-title-container">
          <h2 className="list-title">Clientes</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
          {error && <p className="color-error">{error}</p>}
        </div>
        <Link to="/clients/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo cliente"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List className="list">
          {clients.map((client, i) => (
            <Link
              key={i}
              className="link-reset"
              to={`/clients/${client.id}`}
            >
              <ListItem
                caption={client.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(client)}
              />
            </Link>
          ))}
        </List>
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clients: state.clients.currentPage,
  loading: state.clients.loading,
  error: state.clients.error
});

export default connect(mapStateToProps)(Clients);
