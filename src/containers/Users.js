import React, {Component} from 'react'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import ConfirmDeleteButton from '../components/ConfirmDeleteButton'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchUsers, deleteUser } from '../reducers/users.reducer'

const TooltipIcon = Tooltip(Icon);
const TooltipButton = Tooltip(Button);

class Users extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }
  deleteUser = (user) => {
    this.props.dispatch(deleteUser(user));
  }
  renderListActions(user) {
    const actionsData = [
      {link: `/users/${user.id}`, icon: 'edit', tooltip: 'Editar'}
    ]
    const actions = actionsData.map((action, i) => (
      <Link
        to={action.link}
        key={`action${i}_user${user.id}`}
        style={{color: '#757575'}} >
        <TooltipIcon
          tooltip={action.tooltip}
          value={action.icon} />
      </Link>
    ))
    actions.push((
      <ConfirmDeleteButton
        tooltip="Borrar usuario"
        title={`Borrar usuario ${user.name}`}
        key={`delete_user${user.id}`}
        onDelete={() => this.deleteUser(user)}
      />
    ))
    return actions;
  }
  render() {
    const {loading, error, children} = this.props;
    const users = this.props.users || [];
    return (
      <div className="users list-container">
        <div className="list-title-container">
          <h2 className="list-title">Usuarios</h2>
          {loading && <p className="color-primary">Cargando ... </p>}
          {error && <p className="color-error">{error}</p>}
        </div>
        <Link to="/projects/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo usuario"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List className="list">
          {users.map((user, i) => (
            <Link
              key={i}
              className="link-reset"
              to={`/users/${user.id}`}
            >
              <ListItem
                caption={user.name}
                leftIcon="work"
                className="list-item"
                rightActions={this.renderListActions(user)}
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
  users: state.users.currentPage,
  loading: state.users.loading,
  error: state.users.error
});

export default connect(mapStateToProps)(Users);
