import React, {Component} from 'react'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from 'components/shared/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { 
  fetchUsersPage, deleteUser, getUsersPage 
} from 'reducers/users.reducer'
import PaginationFooter from 'components/shared/PaginationFooter'

const TooltipButton = Tooltip(Button);

class Users extends Component {
  pageSize = 5;
  componentDidMount() {
    this.fetchPage(0);
  }
  fetchPage(page) {
    this.props.fetchUsersPage(page, this.pageSize);
  }
  renderListActions(user) {
    return [
      <ConfirmDeleteButton
        tooltip="Borrar"
        title={`Borrar usuario ${user.name}`}
        key={`delete_user${user._id}`}
        onDelete={() => this.props.deleteUser(user)}
      />
    ]
  }
  render() {
    const {loading, children, pageParams} = this.props;
    const users = this.props.users || [];
    return (
      <div className="users list-container">
        <div className="list-title-container">
          <h2 className="list-title">Usuarios</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
        <Link to="/users/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo usuario"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List selectable className="list">
          {users.map((user, i) => (
            <Link key={i} className="link-reset" 
                  title="Editar usuario" to={`/users/${user._id}`}>
              <ListItem
                selectable
                caption={user.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(user)}
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
  const {items, loading, params} = getUsersPage(state)
  return {
    pageParams: params,
    users: items,
    loading
  }
}
const actions = {fetchUsersPage, deleteUser}

export default connect(mapStateToProps, actions)(Users);
