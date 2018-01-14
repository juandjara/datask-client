import React, { Component } from 'react';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import styled from 'styled-components'
import {Link} from 'react-router'
import Initials from './Initials'

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Task = styled.li`
  padding: .5rem;
  margin: .8rem .5rem;
  background: white; 
  border: 1px solid #ccc;
  white-space: normal;
  box-shadow: 1px 1px 2px rgba(0,0,0, .5);
  .material-icons {
    vertical-align: middle;
  }
`

const TitleInput = styled.input`
  flex: 1;
  margin: 12px 0;
  padding: 4px 0;
  font-family: inherit;
  font-size: 1rem;
  background: rgb(250, 250, 250);
  border: 1px solid #ccc;
`
const EditContainer = styled.div`
  flex: 1;
  .edit-button {
    visibility: ${props => props.editMode ? 'visible':'hidden'}
  }
  &:hover .edit-button {
    visibility: visible;
  }
`

export default class TaskListItem extends Component {
  handleTitleBlur = () => {
    const {value} = this.titleInputNode
    const {onChange, task} = this.props
    onChange({
      ...task,
      name: value
    })
  }
  handleTitleKeyDown = (ev) => {
    const enterKeycode = 13
    const escapeKeycode = 27
    const keycode = ev.keyCode
    if(keycode === enterKeycode || keycode === escapeKeycode) {
      this.titleInputNode.blur()
    }
  }
  render () {
    const {
      task, editMode, onEdit, 
      hasActiveTime, onStartTime, onFinishTime
    } = this.props
    const user = task.asignee || {name: '', surname: '', full_name: ''}
    const initials = user.name[0] + user.surname[0]
    return (
      <Task>
        <SpaceBetween>
          <EditContainer editMode={editMode}>
            {editMode ? (
              <TitleInput
                onKeyDown={this.handleTitleKeyDown}
                innerRef={node => {this.titleInputNode = node}} 
                autoFocus
                type="text" 
                defaultValue={task.name} 
                onBlur={this.handleTitleBlur} />
            ) : (
              <span style={{marginRight: '.5rem'}}>
                {task.name}
              </span>
            )}
            <IconButton
              className="edit-button"
              style={{marginBottom: 8}}
              title={editMode ? 'Completar edicion':'Editar nombre de la tarea'} 
              icon={editMode ? 'done':'edit'}
              onClick={() => onEdit(task, !editMode)} />
          </EditContainer>
          <div>
            <Link to={`/tasks/${task._id}`} style={{color: 'inherit'}}>
              <IconButton tabIndex="-1" icon="edit" title="Editar tarea" />
            </Link>
            <Link to={`/tasks/${task._id}/times`} style={{color: 'inherit'}}>
              <IconButton tabIndex="-1" icon="timer" title="Tiempos de la tarea" />
            </Link>
          </div>
        </SpaceBetween>
        <SpaceBetween>
          <div style={{color: '#666'}} >
            {task.description && (
              <Icon title="Esta tarea tiene una descripcion" 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="sort" />
            )}
            <span style={{marginRight: 8, display: 'inline-block'}}>
              <Icon title={`${task.comments.length} comentarios`} 
                    style={{verticalAlign: 'middle', marginRight: 2}} 
                    value="chat_bubble_outline" />
              <span>{task.comments.length}</span>
            </span>
            {task.asignee ? (
              <Initials title={`Asignada a ${user.full_name}`}>{initials}</Initials>
            ) : null}
          </div>
          <div>
            {hasActiveTime ? (
              <div>
                <span>{this.props.time}</span>
                <IconButton
                onClick={() => onFinishTime(task)}
                title="Parar tiempo"
                icon="stop"
                style={{
                  color: 'var(--palette-red-500)'
                }} />
              </div>
            ) : (
              <IconButton 
                onClick={() => onStartTime(task)}
                title="Iniciar tiempo"
                icon="play_arrow"
                style={{
                  color: 'var(--palette-green-500)'
                }} />
            )}
          </div>
        </SpaceBetween>
      </Task>
    )
  }
}