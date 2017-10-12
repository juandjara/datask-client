import React, { Component } from 'react';
import axios from 'services/axiosWrapper'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Button from 'react-toolbox/lib/button/Button'
import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import ConfirmDeleteButton from 'components/shared/ConfirmDeleteButton'

export default class ProjectUsers extends Component {
  state = {
    loading: true,
    project: {},
    newUser: null,
    error: ""
  }
  componentDidMount() {
    const id = this.getProjectId()
    const url = `/project/${id}`
    axios.get(url)
    .then(res => res.data)
    .then(json => this.setState({ loading: false, project: json }))
    .catch(err => this.setState({error: err.message, loading: false}))    
  }
  getProjectId() {
    return this.props.routeParams && this.props.routeParams._id
  }
  addUser() {
    this.setState({loading: true})
    const {newUser} = this.state
    const id = this.getProjectId()
    const url = `/project/${id}/user/${newUser.value}`
    axios.put(url)
    .then(() => {
      this.setState(prevState => ({
        loading: false,
        project: {
          ...prevState.project,
          users: prevState.project.users.concat({
            _id: newUser.value,
            name: newUser.label
          })
        }
      }))
    })
    .catch(err => {
      this.setState({error: err.message, loading: false})
    })
  }
  deleteUser(userToDelete) {
    this.setState({loading: true})
    const id = this.getProjectId()
    const url = `/project/${id}/user/${userToDelete._id}`
    axios.delete(url)
    .then(() => this.setState(prevState => ({
      loading: false,
      project: {
        ...prevState.project,
        users: prevState.project.users
          .filter(user => user._id !== userToDelete._id)
      }
    })))
    .catch(err => {
      this.setState({error: err.message, loading: false})
    })
  }
  renderListActions(user) {
    return [
      <ConfirmDeleteButton
        tooltip="Borrar"
        tooltipPosition="left"
        dialogTitle={`Borrar miembro ${user.name}`}
        key={`delete_user_${user._id}`}
        onDelete={() => this.deleteUser(user)}
      />
    ]
  }
  render () {
    const {project, error, loading} = this.state
    const {users = [], name} = project
    const inputProps = {
      value: this.state.newUser,
      onChange: newUser => this.setState({newUser})
    }
    return (
      <div className="project-users">
        <h2>Editar miembros de {name}</h2>
        {loading && <p className="color-primary">Cargando ... </p>}
        {error && <p className="color-error">{error}</p>}
        <List>
          {users.map((user, i) => (
            <ListItem
              key={user._id}
              caption={user.name}
              leftIcon="person"
              rightActions={this.renderListActions(user)}
            />
          ))}
        </List>
        <div className="project-add-user-form">
          <AsyncSelect 
            name="newUser"
            icon="person_outline"
            label="Nuevo miembro"
            className="select select-outer-top"
            placeholder="Escribe para buscar"
            loadOptions={searchUsers}
            meta={{}}
            input={inputProps}
            style={{flex: 1}}
          />
          <Button 
            primary raised 
            label="Añadir" icon="add" 
            onClick={() => this.addUser()}
          />
        </div>
      </div> 
    )
  }
}