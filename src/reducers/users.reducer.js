import axios from '../utils/axiosWrapper'
import { browserHistory } from 'react-router'

// action types
export const USERS_FETCH = "USERS_FETCH"
export const USER_FETCH = "USER_FETCH"
export const USER_UPDATE = "USER_UPDATE"
export const USER_CREATE = "USER_CREATE"
export const USER_DELETE = "USER_DELETE"

export const USER_RESET = "USER_RESET"
export const USER_UPDATE_FIELD = "USER_UPDATE_FIELD"

// gets error message from server response
const errorHandler = err => err.response.data.message;
const endpoint = "/user";

// action creators

// receives pagination params
// and dispatches actions to fetch the list of users
export function fetchUsers(params) {
  return {
    type: USERS_FETCH,
    payload: axios.get(endpoint, {params}).then(res => res.data)
  }
}

// receives project id
// and dispatches actions to fetch the user
export function fetchSingleUser(id) {
  return {
    type: USER_FETCH,
    payload: axios.get(`${endpoint}/id/${id}`)
      .then(res => res.data)
  }
}

// resets active client back to null
// useful for creating a new user
export function resetUser() {
  return { type: USER_RESET }
}

// updates form field when user types
export function updateUserField(name, value) {
  return { name, value, type: USER_UPDATE_FIELD }
}

// receives user, sends data to backend,
// and dispatch the related actions
export function saveUser(user) {
  const promise = axios.put(`${endpoint}/id/${user.id}`, user)
    .then(res => res.data)
  promise.then(() => {
    browserHistory.push('/users')
  })
  return {
    type: USER_UPDATE,
    payload: promise
  }
}

// receives user, sends data to backend,
// and dispatch the related actions
export function createUser(user) {
  const promise = axios.post(endpoint, user)
    .then(res => res.data)
  promise.then(() => {
    browserHistory.push('/users')
  })
  return {
    type: USER_CREATE,
    payload: promise
  }
}

// receives client, deletes data in backend,
// and dispatch the related actions
export function deleteUser(user) {
  return {
    type: USER_DELETE,
    payload: axios.delete(`${endpoint}/id/${user.id}`)
      .then(res => res.data)
  }
}

const initialUser = {
  activated: true
}
const initialState = {
  currentPage: [],
  activeUser: {...initialUser}
}

// computes a slice of the state for the USER_UPDATE_SUCCESS action
const updateSuccess = (state, action) => {
  const users = state.currentPage.map(user => {
    return user.id === action.payload.id ?
      action.payload :
      user;
  });
  return {
    ...state,
    currentPage: users,
    activeUser: action.payload,
    loading: false
  }
}

// computes a slice of the state for the USER_CREATE_SUCCESS action
const createSuccess = (state, action) => {
  const users = state.currentPage.concat(action.payload);
  return {
    ...state,
    currentPage: users,
    activeUser: {...initialUser},
    loading: false
  }
}


// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case `${USERS_FETCH}_LOADING`:
    case `${USER_FETCH}_LOADING`:
    case `${USER_UPDATE}_LOADING`:
    case `${USER_CREATE}_LOADING`:
    case `${USER_DELETE}_LOADING`:
      return {
        ...state,
        loading: true
      }
    case `${USERS_FETCH}_SUCCESS`:
      return {
        ...state,
        currentPage: action.payload.content,
        loading: false
      }
    case `${USER_FETCH}_SUCCESS`:
      return {
        ...state,
        activeUser: action.payload,
        loading: false
      }
    case `${USER_UPDATE}_SUCCESS`:
      return updateSuccess(state, action)
    case `${USER_CREATE}_SUCCESS`:
      return createSuccess(state, action)
    case `${USER_DELETE}_SUCCESS`:
      return {
        ...state,
        loading: false,
        currentPage: state.currentPage
          .filter(user => user.id !== action.payload.id)
      }
    case USER_RESET:
      return {
        ...state,
        activeUser: {...initialUser}
      }
    case USER_UPDATE_FIELD:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          [action.name]: action.value
        }
      }
    case `${USERS_FETCH}_ERROR`:
    case `${USER_FETCH}_ERROR`:
    case `${USER_UPDATE}_ERROR`:
    case `${USER_CREATE}_ERROR`:
    case `${USER_DELETE}_ERROR`:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
