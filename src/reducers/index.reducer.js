import { combineReducers } from 'redux'
import sidenav from './sidenav.reducer'
import auth from './auth.reducer'
import profile from './profile.reducer'
import projects from './projects.reducer'
import clients from './clients.reducer'
import { reducer as responsive } from 'redux-mediaquery'

export default combineReducers({
  responsive,
  sidenav,
  auth,
  profile,
  projects,
  clients
})
