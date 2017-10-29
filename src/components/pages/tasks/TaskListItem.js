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
  state = {
    editMode: false
  }
  handleTitleBlur = () => {
    const {value} = this.titleInputNode
    const {onChange, task} = this.props
    onChange({
      name: value,
      _id: task._id
    }).then(() => {
      this.setState({editMode: false})    
    })
  }
  handleTitleKeypress = (ev) => {
    const enterKeycode = 13
    const escapeKeycode = 27
    const keycode = ev.which
    if(keycode === enterKeycode || keycode === escapeKeycode) {
      this.titleInputNode.blur()
    }
  }
  render () {
    const {editMode} = this.state
    const {task} = this.props
    const initials = task.asignee.name[0] + task.asignee.surname[0]
    return (
      <Task>
        <SpaceBetween>
          {editMode ? (
            <TitleInput
              onKeyPress={this.handleTitleKeypress}
              innerRef={node => {this.titleInputNode = node}} 
              autoFocus
              type="text" 
              defaultValue={task.name} 
              onBlur={this.handleTitleBlur} />
          ) : (
            <p onClick={() => this.setState({editMode: true})}
               style={{flex: 1}}>{task.name}</p>
          )}
          <IconButton 
            title={editMode ? 'Completar edicion':'Editar nombre de la tarea'} 
            icon={editMode ? 'done':'edit'}
            onClick={() => this.setState(state => ({editMode: !state.editMode}))} />
        </SpaceBetween>
        <SpaceBetween>
          <div style={{color: '#666'}} >
            <Icon title="Esta tarea tiene una descripcion" 
                  style={{verticalAlign: 'middle', marginRight: 8}} 
                  value="sort" />
            <span style={{marginRight: 8, display: 'inline-block'}}>
              <Icon title={`${task.comments.length} comentarios`} 
                    style={{verticalAlign: 'middle', marginRight: 2}} 
                    value="chat_bubble_outline" />
              <span>{task.comments.length}</span>
            </span>
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