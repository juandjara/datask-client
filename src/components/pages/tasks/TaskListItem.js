import React, { Component } from 'react';
import Icon from 'react-toolbox/lib/font_icon/FontIcon'
import IconButton from 'react-toolbox/lib/button/IconButton'
import styled from 'styled-components'

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`
const Task = styled.li`
  width: 100%;
  padding: .5rem;
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

export default class TaskListItem extends Component {
  render () {
    const {task} = this.props
    const initials = task.asignee.name[0] + task.asignee.surname[0]
    return (
      <Task>
        <SpaceBetween>
          <p>{task.name}</p>
          <IconButton title="Editar titulo" icon="edit" />
        </SpaceBetween>
        <SpaceBetween>
          <div style={{color: '#666'}} >
            <Icon title="Esta tarea tiene una descripcion" 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="sort" />
            <Icon title={`${task.comments.length} comentarios`} 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="chat_bubble_outline" />
            <Initials title={`Asignada a ${task.asignee.full_name}`} >
              {initials}
            </Initials>
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