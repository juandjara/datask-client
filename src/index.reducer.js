import { combineReducers } from 'redux'
import { reducer as responsive } from 'redux-mediaquery'

import { reducer as sidenav } from './components/sidenav'
import { reducer as form } from './components/formValidation'

import { reducer as auth } from './features/login'
import { reducer as profile } from './features/profile'
import { reducer as projects } from './features/projects'
import { reducer as clients } from './features/clients'
import { reducer as users } from './features/users'

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
