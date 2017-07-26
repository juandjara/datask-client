import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchClientsPage, deleteClient, getClientsPage } from '../reducers/clients.reducer'
import PaginationFooter from '../components/PaginationFooter'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Clients extends Component {
  pageSize = 5;
  componentDidMount() {
    this.fetchPage(0)
  }
  fetchPage(page) {
    this.props.fetchClientsPage(page, this.pageSize)
  }
  renderListActions(client) {
    return [
      <Link
        to={`/clients/${client.id}`}
        key={`edit_client${client.id}`}
        style={{color: '#757575'}} >
        <TooltipIcon tooltip="Editar" value="edit" />
      </Link>,
      <ConfirmDeleteButton
        tooltip="Borrar cliente"
        title={`Borrar cliente ${client.name}`}
        key={`delete_client${client.id}`}
        onDelete={() => this.props.deleteClient(client)}
      />
    ]
  }
  render() {
    const {loading, clients, children, pageParams} = this.props;
    return (
      <div className="clients list-container">
        <div className="list-title-container">
          <h2 className="list-title">Clientes</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
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
            <Link key={i} className="link-reset"
                  to={`/clients/${client.id}`}>
              <ListItem
                caption={client.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(client)}
              />
            </Link>
          ))}
        </List>
        <PaginationFooter
          params={pageParams}
          onPageChange={page => this.fetchPage(page)}
        />
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {items, loading, params} = getClientsPage(state)
  return {
    pageParams: params,
    clients: items,
    loading
  }
}
const actions = {fetchClientsPage, deleteClient}

export default connect(mapStateToProps, actions)(Clients);
