import { combineReducers } from 'redux'
import sidenav from './sidenav.reducer'
import user from './user.reducer'
import { reducer as responsive } from 'redux-mediaquery'

export default combineReducers({
  responsive,
  sidenav,
  user
})
