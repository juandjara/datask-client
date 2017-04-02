import { combineReducers } from 'redux'
import sidenav from './sidenav.reducer'
import auth from './auth.reducer'
import { reducer as responsive } from 'redux-mediaquery'

export default combineReducers({
  responsive,
  sidenav,
  auth
})
