import React, { Component } from 'react';
import { selectors, actions } from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import {bindActionCreators} from 'redux'

import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Button from 'react-toolbox/lib/button/Button'
import IconButton from 'react-toolbox/lib/button/IconButton'
import styled from 'styled-components'

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NameInput = styled.input`
  flex: 1;
  font-size: 1.5em;
  margin: 1rem 0;
`

class TaskForm extends Component {
  state = {
    description: '',
    name: '',
    editModes: {
      description: true,
      name: false
    }
  }
  componentDidMount() {
    const {task, actions, routeParams} = this.props
    if(!task) {
      actions.fetchOne(routeParams._id)
      .then(res => res.value)
      .then(task => {
        this.setState({
          name: task.name,
          description: task.description
        })
      })
    }
  }
  handleChange = name => (ev) => {
    const {value} = ev.target
    this.setState({ [name]: value })
  }
  handleNameKeyDown = (ev) => {
    const enterKeycode = 13
    const escapeKeycode = 27
    const keycode = ev.keyCode
    if(keycode === enterKeycode || keycode === escapeKeycode) {
      this.editName()
    }
  }
  editName = () => {
    const {task, actions} = this.props
    const data = {
      ...task,
      name: this.state.name
    }
    actions.save(data, true)
    .then(() => {
      this.setState({editModes: {name: false}})
    })
  }
  render () {
    const {description, name, editModes} = this.state
    const {loading, task = {}} = this.props
    return (
      <div style={{margin: '1rem'}}>
        {loading && (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <ProgressBar type='circular' mode='indeterminate' />
            <p className="color-primary" style={{marginLeft: '1rem'}}>
              Cargando ...
            </p>
          </div>
        )}
        <SpaceBetween>          
          {editModes.name ? (
            <NameInput 
              type="text" 
              value={name}
              autoFocus
              onKeyDown={this.handleNameKeyDown}
              onBlur={this.editName}
              onChange={this.handleChange("name")} />
          ) : (
            <h2 style={{flex: 1}} 
                onClick={() => this.setState({editModes: {name: true}})}>
              {task.name}
            </h2>
          )}
          <IconButton
            onClick={() => this.setState({
              editModes: {name: !editModes.name}
            })}
            title={editModes.name ? 'Completar edicion':'Editar nombre de la tarea'} 
            icon={editModes.name ? 'done':'edit'} />
        </SpaceBetween>
        <p style={{marginBottom: '.5rem', color: '#666'}}>Descripci&oacute;n</p>
        <form style={{marginRight: '3em'}} onSubmit={ev => ev.preventDefault()}>
          <textarea
            id="description" 
            value={description}
            onChange={this.handleChange("description")}
            style={{resize: 'vertical', width: '100%'}} 
            rows="6" />
          <Button raised primary type="submit">
            Guardar
          </Button>
          <IconButton title="Descartar cambios" icon="close" />
        </form>
      </div>
    );
  }
}

export default connect(
  (state, props) => {
    const id = props.routeParams._id
    const task = selectors.getOne(state, id)
    const loading = selectors.getLoading(state)
    return {task, loading}
  },
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TaskForm)
