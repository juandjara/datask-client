import { combineReducers } from 'redux'
import { reducer as responsive } from 'redux-mediaquery'
import { reducer as form } from 'redux-form'

import sidenav from 'reducers/sidenav.reducer'
import auth from 'reducers/auth.reducer'
import users from 'reducers/users.reducer'
import profile from 'reducers/profile.reducer'
import clients from 'reducers/clients.reducer'
import projects from 'reducers/projects.reducer'
import tasks from 'reducers/tasks.reducer'

export default combineReducers({
  responsive,
  sidenav,
  auth,
  profile,
  projects,
  clients,
  users,
  form,
  tasks
})
