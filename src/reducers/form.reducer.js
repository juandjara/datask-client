export const INIT = 'FORM_INIT'
export const SET_PROP = 'FORM_SET_PROP'
export const RESET = 'FORM_RESET'

export const setProperty = (name, value) => ({type: SET_PROP, payload: {name, value}})
export const initForm = user => ({type: INIT, payload: user})
export const resetForm = () => ({type: RESET})

export default function formReducer(state = {}, action = {}) {
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