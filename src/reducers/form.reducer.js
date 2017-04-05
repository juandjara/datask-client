// action types
export const FORM_SET_ALL = "FORM_SET_ALL"
export const FORM_SET_VALUE = "FORM_SET_VALUE"
export const FORM_RESET = "FORM_RESET"

// action creators
export function setAll(values) {
  return { type: FORM_SET_ALL, values }
}
export function setValue(name, value) {
  return { type: FORM_SET_VALUE, name,value }
}
export function reset() {
  return { type: FORM_RESET }
}

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case FORM_SET_VALUE:
      return Object.assign({}, state, { [action.name]:action.value })
    case FORM_SET_ALL:
      return Object.assign({}, state, action.values)
    case FORM_RESET:
      return {}
    default:
      return state;
  }
}
