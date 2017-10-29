import React, { Component } from 'react';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import styled from 'styled-components'

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
`
const Initials = styled.span`
  display: inline-block; 
  padding: 3px 6px; 
  background: #eee;
  color: #333;
  border: 1px solid #ccc;
`
const TitleInput = styled.input`
  flex: 1;
  margin: 12px 0;
  padding: 4px 0;
  font-family: inherit;
  font-size: 1rem;
  background: white;
  border: 1px solid #ccc;
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
    const {task, editMode, onEdit} = this.props
    const user = task.asignee || {name: '', surname: '', full_name: ''}
    const initials = user.name[0] + user.surname[0]
    return (
      <Task>
        <SpaceBetween>
          {editMode ? (
            <TitleInput
              onKeyDown={this.handleTitleKeyDown}
              innerRef={node => {this.titleInputNode = node}} 
              autoFocus
              type="text" 
              defaultValue={task.name} 
              onBlur={this.handleTitleBlur} />
          ) : (
            <p onClick={() => onEdit(task, true)}
               style={{flex: 1}}>{task.name}</p>
          )}
          <IconButton 
            title={editMode ? 'Completar edicion':'Editar nombre de la tarea'} 
            icon={editMode ? 'done':'edit'}
            onClick={() => onEdit(task, !editMode)} />
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
            <IconButton 
              title="Iniciar tiempo"
              icon="timer"
              style={{
                color: 'var(--palette-green-500)'
              }} />
            <IconButton 
              title="Parar tiempo"
              icon="stop"
              style={{
                color: 'var(--palette-red-500)'
              }} />
              
          </div>
        </SpaceBetween>
      </Task>
    )
  }
}