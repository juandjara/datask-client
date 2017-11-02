import React, { Component } from 'react';
import { selectors, actions } from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import {bindActionCreators} from 'redux'

import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Input from 'react-toolbox/lib/input/Input'
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
const DescriptionInput = styled.textarea`
  resize: vertical;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  padding: 4px;
`

class TaskForm extends Component {
  state = {
    estimatedTime: '00:00',
    description: '',
    name: '',
    editModes: {
      description: false,
      name: false
    }
  }
  componentDidMount() {
    const {task, actions, routeParams} = this.props
    if(!task) {
      actions.fetchOne(routeParams._id)
      .then(res => res.value)
      .then(task => this.resetTask(task))
    } else {
      this.resetTask(task)
    }
  }
  resetTask(task) {
    this.setState({
      name: task.name || '',
      description: task.description || '',
      estimatedTime: task.estimatedTime || ''
    })
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
  editDescription = () => {
    const {task, actions} = this.props
    const data = {
      ...task,
      description: this.state.description
    }
    actions.save(data, true)
    .then(() => {
      this.setState({editModes: {description: false}})
    })
  }
  render () {
    const {estimatedTime, description, name, editModes} = this.state
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
        <SpaceBetween>
          <p style={{margin: '.5rem 0', color: '#666'}}>
            Descripci&oacute;n
          </p>
          <IconButton
            onClick={() => this.setState({
              editModes: {description: !editModes.description}
            })}
            icon={editModes.description ? 'done':'edit'}
            title={editModes.description ? 'Completar edición':'Editar descripcion'} />
        </SpaceBetween>
        {editModes.description ? (
          <DescriptionInput
            id="description" 
            value={description}
            autoFocus
            onBlur={this.editDescription}
            onChange={this.handleChange("description")}
            style={{resize: 'vertical', width: '100%'}} 
            rows="6" />
        ) : (
          <p style={{marginTop: 0, marginBottom: '.5rem'}}>{description}</p>
        )}
        <Input 
          icon="timer"
          type="text"
          label="Tiempo estimado"
          hint="00:00"
          pattern="[0-9]{2}:[0-9]{2}"
          value={estimatedTime}
          onChange={estimatedTime => this.setState({estimatedTime})} />
        
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
