import React, { Component } from 'react';
import { selectors, actions } from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import {Link} from 'react-router'

import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import IconButton from 'react-toolbox/lib/button/IconButton'
import Input from 'react-toolbox/lib/input/Input'
import Button from 'react-toolbox/lib/button/Button'
import Initials from './Initials'
import BackButton from 'components/shared/BackButton'
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
  overflow-x: hidden;
  padding: 8px;
  width: 100%;
`
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem;
  margin-top: 2rem;
  opacity: ${props => props.loading ? 0.5 : 1};
`
const CommentBody = styled.p`
  background: white;
  border: 1px solid #ccc;
  padding: 1em;
  margin-top: 8px;
  margin-bottom: 4px;
`
const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .material-icons {
    color: #666;
  }
  .icon-delete {
    cursor: pointer;
  }
  .icon-delete:hover {
    color: var(--palette-red-500);
  }
`

class TaskForm extends Component {
  state = {
    asignee: null,
    estimatedTime: '00:00',
    description: '',
    name: '',
    newComment: '',
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
    const data = {
      ...this.props.task,
      name: this.state.name
    }
    this.props.actions.save(data, true)
    .then(() => {
      this.setState({editModes: {name: false}})
    })
  }
  editDescription = () => {
    const data = {
      ...this.props.task,
      description: this.state.description
    }
    this.props.actions.save(data, true)
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
  addComment(ev) {
    ev.preventDefault()
    const newComment = {
      authorName: this.props.username,
      authorId: this.props.userid,
      body: this.state.newComment
    }
    const data = {
      ...this.props.task,
      comments: [
        ...this.props.task.comments,
        newComment
      ]
    }
    this.props.actions.save(data, true)
    .then(() => {
      this.setState({newComment: ''})
    })
  }
  deleteComment(index) {
    const {comments} = this.props.task
    const data = {
      ...this.props.task,
      comments: [
        ...comments.slice(0, index),
        ...comments.slice(index+1, comments.length)
      ]
    }
    this.props.actions.save(data, true)
  }
  getInitials(name) {
    return name.split(' ').map(str => str[0])
  }
  formatDate(dateString) {
    const time = new Date(dateString).toLocaleTimeString()
    const date = new Date(dateString).toLocaleDateString()
    return `el ${date} a las ${time}`
  }
  userOwnsComment(comment) {
    return this.props.userid === comment.authorId
  }
  renderTaskForm () {
    const {asignee, estimatedTime, description, name, editModes} = this.state
    const {task = {}} = this.props
    return (
      <section style={{margin: '1rem', marginTop: 0}}>
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
    const {username="", loading} = this.props
    return (
      <section style={{margin: '1rem'}} className="comments-form">
        <header>
          <h2 style={{marginTop: '2rem', marginBottom: '1rem', color: '#333', borderBottom: '1px solid #ccc'}}>Comentarios</h2>
        </header>
        <form style={{display: 'flex'}} onSubmit={ev => this.addComment(ev)}>
          <p style={{margin: 0, marginRight: '1em'}}>
            <Initials>{this.getInitials(username)}</Initials>
          </p>
          <div style={{flex: 1}}>
            <TextArea 
              placeholder="Escribe tu comentario aqui"
              value={this.state.newComment}
              onChange={this.handleChange("newComment")} />
            <Button style={{marginTop: '8px'}}
                    disabled={loading || !this.state.newComment}
                    type="submit" primary raised>
              {loading ? 'Cargando...':'Añadir'}
            </Button>
          </div>          
        </form>
      </section>
    )
  }
  renderCommentList() {
    const {comments = []} = this.props.task
    return (
      <List loading={this.props.loading}>
        {comments.map((comment, index) => (
          <li key={index} 
              style={{marginBottom: '2rem'}}>
            <SpaceBetween>
              <div>
                <Initials>
                  {this.getInitials(comment.authorName)}
                </Initials>
                <span style={{marginLeft: 8}}>
                  {comment.authorName}
                </span>
              </div>
              <div>
                {this.formatDate(comment.publishedAt)}
              </div>
            </SpaceBetween>
            <CommentBody>{comment.body}</CommentBody>
            <CommentActions>
              {this.userOwnsComment(comment) ? (
                <i className="material-icons icon-delete"
                   onClick={() => this.deleteComment(index)}
                   title="Borrar comentario">close</i>
              ) : null}            
            </CommentActions>
          </li>
        ))}
      </List>
    );
  }
  render() {
    const {loading, task} = this.props
    return (
      <div>
        <BackButton style={{margin: '.5em'}} router={this.props.router} />
        {loading && (
          <div style={{margin: '1rem', display: 'flex', alignItems: 'center'}}>
            <ProgressBar type='circular' mode='indeterminate' />
            <p className="color-primary" style={{marginLeft: '1rem'}}>
              Cargando ...
            </p>
          </div>
        )}
        {task && this.renderTaskForm()}
        {task && this.renderCommentsForm()}
        {task && this.renderCommentList()}
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
    const userid = state.auth._id
    return {task, loading, username, userid}
  },
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TaskForm)
