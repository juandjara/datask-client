import { combineReducers } from 'redux'
import { reducer as responsive } from 'redux-mediaquery'

import sidenav from 'reducers/sidenav.reducer'
import form from 'reducers/form.reducer'
import auth from 'reducers/auth.reducer'
import users from 'reducers/users.reducer'
import profile from 'reducers/profile.reducer'
import clients from 'reducers/clients.reducer'
import projects from 'reducers/projects.reducer'

export default combineReducers({
  responsive,
  sidenav,
  auth,
  profile,
  projects,
  clients,
  users,
  ui: combineReducers({form})
})
