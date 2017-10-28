import React, { Component } from 'react';
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button/Button'
import { Link } from 'react-router'
 
const TooltipButton = Tooltip(Button);

export default class TaskList extends Component {
  state = {
    loading: false,
    tasks: [],
    pageParams: {}
  }
  componentDidMount() {
    
  }
  render () {
    const {loading, tasks, pageParams} = this.state
    return (
      <div className="list-container">
        <div className="list-title-container">
          <h2 className="list-title">
            {/* nombre del proyecto */}
          </h2>
          {loading && <p className="color-primary">Cargando ... </p>}
        </div>
        <Link to="/projects/new">
          <TooltipButton
            icon="add"
            floating accent
            tooltip="Nuevo proyecto"
            tooltipPosition="left"
            className="list-corner-fab"
          />
        </Link>
        <List className="list">
          {tasks.map(task => (
            <ListItem key={task._id} caption={task.name}>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}