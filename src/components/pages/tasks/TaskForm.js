import React, { Component } from 'react';
import { selectors, actions } from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import {Link} from 'react-router'

import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import Initials from './Initials'
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
const TextArea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  resize: vertical;
  display: block;
  height: 120px;
  margin: 0;
  margin-bottom: 1em;
  flex: 1;
  overflow-x: hidden;
  width: 100%;
`

class TaskForm extends Component {
  state = {
    asignee: null,
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
      estimatedTime: task.estimatedTime || '',
      asignee: task.asignee && {
        value: task.asignee._id,
        label: task.asignee.full_name
      }
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
  editTimeAndAsignee() {
    const {task, actions} = this.props
    const {estimatedTime, asignee} = this.state
    const data = {
      ...task,
      estimatedTime,
      asignee: asignee.value
    }
    actions.save(data, true)
  }
  renderTaskForm () {
    const {asignee, estimatedTime, description, name, editModes} = this.state
    const {loading, task = {}} = this.props
    return (
      <section style={{margin: '1rem'}}>
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
            <h2 style={{flex: 1, color: '#333'}} 
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
          <TextArea
            id="description" 
            value={description}
            autoFocus
            onBlur={this.editDescription}
            onChange={this.handleChange("description")}
          />
        ) : (
          <p style={{marginTop: 0, marginBottom: '2rem'}}>{description}</p>
        )}
        <Input 
          icon="timer"
          type="text"
          label="Tiempo estimado"
          hint="00:00"
          pattern="[0-9]{2}:[0-9]{2}"
          value={estimatedTime}
          onChange={estimatedTime => this.setState({estimatedTime})} />
        <AsyncSelect 
          name="asignee"
          icon="person_outline"
          label="Asignado a"
          className="select"
          placeholder="Escribe para buscar"
          loadOptions={searchUsers}
          meta={{}}
          input={{
            value: asignee,
            onChange: asignee => this.setState({asignee})
          }}
          style={{flex: 1}}
        />
        <div style={{margin: '1rem 0'}}>
          <Button primary raised onClick={() => this.editTimeAndAsignee()}>
            Guardar
          </Button>
          <Link to={`/projects/${task.project}/tasks`}>
            <Button>Cancelar</Button>
          </Link>
        </div>
      </section>
    );
  }
  renderCommentsForm() {
    const {task, username=""} = this.props
    if(!task) {
      return null
    }
    const initials = username.split(' ').map(str => str[0])
    return (
      <section style={{margin: '1rem', marginTop: '2rem'}} className="comments-form">
        <header>
          <h2 style={{margin: '2rem 0', color: '#333', borderBottom: '1px solid #ccc'}}>Comentarios</h2>
          <p style={{fontSize: '18px', marginBottom: '.5em'}}>
            <Icon style={{margin: '0 4px', color: '#666', verticalAlign: 'middle'}} value="chat_bubble_outline" />
            <span style={{marginLeft: '.5rem'}}>Añadir comentario</span>
          </p>
        </header>
        <form>
          <div style={{display: 'flex'}}>
            <p style={{margin: 0, marginRight: 8}} ><Initials>{initials}</Initials></p>
            <TextArea />
          </div>
          <Button primary raised>
            Añadir
          </Button>
        </form>
      </section>
    )
  }
  render() {
    return (
      <div>
        {this.renderTaskForm()}
        {this.renderCommentsForm()}
      </div>
    )
  }
}

export default connect(
  (state, props) => {
    const id = props.routeParams._id
    const task = selectors.getOne(state, id)
    const loading = selectors.getLoading(state)
    const username = state.auth.full_name
    return {task, loading, username}
  },
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TaskForm)
