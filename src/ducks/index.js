import { combineReducers } from 'redux'
import sidenav from './sidenav'
import { reducer as responsive } from 'redux-mediaquery'

export default combineReducers({
  responsive,
  sidenavOpen: sidenav
})