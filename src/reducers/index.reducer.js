import { combineReducers } from 'redux'
import sidenav from './sidenav.reducer'
import auth from './auth.reducer'
import profile from './profile.reducer'
import form from './form.reducer'
import projects from './projects.reducer'
import { reducer as responsive } from 'redux-mediaquery'

export default combineReducers({
  responsive,
  sidenav,
  auth,
  profile,
  form,
  projects
})
