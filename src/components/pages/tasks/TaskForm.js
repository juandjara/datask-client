import React, { Component } from 'react';
import { selectors, actions } from 'reducers/tasks.reducer'
import { connect } from 'react-redux'
import {renderAsyncSelect as AsyncSelect} from 'components/shared/FormFields'
import {searchUsers} from 'services/selectHelpers'
import {bindActionCreators} from 'redux'

import ProgressBar from 'react-toolbox/lib/progress_bar/ProgressBar'
import Button from 'react-toolbox/lib/button/Button'
import IconButton from 'react-toolbox/lib/button/IconButton'

class TaskForm extends Component {
  state = {
    description: ''
  }
  componentDidMount() {
    const {task, actions, routeParams} = this.props
    if(!task) {
      actions.fetchOne(routeParams._id)
    }
  }
  handleDescriptionChange = (ev) => {
    const {value} = ev.target
    this.setState({ description: value })
  }
  render () {
    const {loading, task = {}} = this.props
    return (
      <div style={{margin: '1rem'}}>
        <h2>{task.name}</h2>
        {loading && (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <ProgressBar type='circular' mode='indeterminate' />
            <p className="color-primary" style={{marginLeft: '1rem'}}>
              Cargando ...
            </p>
          </div>
        )}
        <p style={{marginBottom: '.5rem', color: '#666'}}>Descripci&oacute;n</p>
        <form style={{marginRight: '3em'}} onSubmit={ev => ev.preventDefault()}>
          <textarea
            id="description" 
            defaultValue={task.description}
            value={this.state.description}
            onChange={this.handleDescriptionChange}
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
