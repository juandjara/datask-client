import { combineReducers } from 'redux'

export const INIT = 'FORM_INIT'
export const SET_PROP = 'FORM_SET_PROP'
export const TOUCH_PROP = 'FORM_TOUCH_PROP'
export const RESET = 'FORM_RESET'
export const SET_TOUCHED = 'FORM_SET_TOUCHED'

export const setProperty = (name, value) => ({type: SET_PROP, payload: {name, value}})
export const touchProperty = name => ({type: TOUCH_PROP, payload: {name}})
export const initForm = model => ({type: INIT, payload: model})
export const resetForm = () => ({type: RESET})
export const setTouched = touched => ({type: SET_TOUCHED, payload: touched})

function modelReducer(state = {}, action = {}) {
  const {type, payload} = action
  switch(type) {
    case SET_PROP:
      return {...state, [payload.name]: payload.value}
    case INIT:
      return payload
    case RESET:
      return {}
    default:
      return state
  }
}
function touchedReducer(state = {}, action = {}) {
  const {type, payload} = action
  switch(type) {
    case SET_PROP:
    case TOUCH_PROP:
      return {...state, [payload.name]: true}
    case SET_TOUCHED:
      return payload
    case INIT:
    case RESET:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  model: modelReducer,
  touched: touchedReducer
})
