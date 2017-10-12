import React, { Component } from 'react';
import axios from 'services/axiosWrapper'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'

export default class ProjectUsers extends Component {
  state = {
    loading: true,
    project: {}
  }
  componentDidMount() {
    const id = this.getId()
    const url = `/project/${id}`
    axios.get(url)
    .then(res => res.data)
    .then(json => {
      this.setState({ loading: false, project: json })
    })
  }
  getId() {
    return this.props.routeParams && this.props.routeParams._id
  }
  render () {
    const {users = [], name} = this.state.project
    return (
      <div className="project-users">
        <h2>Editar usuarios de {name}</h2>
        {this.state.loading && <p className="color-primary">Cargando ... </p>}
        <List>
          {users.map((user, i) => (
            <ListItem
              key={user._id}
              caption={user.name}
              leftIcon="person"
            />
          ))}
        </List>
        
      </div> 
    )
  }
}