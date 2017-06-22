import axios from '../utils/axiosWrapper'
import { browserHistory } from 'react-router'

// action types
export const USERS_FETCH = "USERS_FETCH"
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS"
export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR"

export const USER_FETCH = "USER_FETCH"
export const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS"
export const USER_FETCH_ERROR = "USER_FETCH_ERROR"

export const USER_RESET = "USER_RESET"
export const USER_UPDATE_FIELD = "USER_UPDATE_FIELD"

export const USER_UPDATE = "USER_UPDATE"
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS"
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR"

export const USER_CREATE = "USER_CREATE"
export const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS"
export const USER_CREATE_ERROR = "USER_CREATE_ERROR"

export const USER_DELETE = "USER_DELETE"
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS"
export const USER_DELETE_ERROR = "USER_DELETE_ERROR"

// gets error message from server response
const errorHandler = err => err.response.data.message;
const endpoint = "/user";

// action creators

// receives pagination params
// and dispatches actions to fetch the list of users
export function fetchUsers(params) {
  return (dispatch) => {
    dispatch({ type: USERS_FETCH });
    axios.get(endpoint, {params})
    .then(res => dispatch({ type: USERS_FETCH_SUCCESS, users: res.data }))
    .catch(err => dispatch({ type: USERS_FETCH_ERROR, error: errorHandler(err) }))
  }
}

// receives project id
// and dispatches actions to fetch the user
export function fetchSingleUser(id) {
  return (dispatch) => {
    dispatch({ type: USER_FETCH })
    axios.get(`${endpoint}/id/${id}`)
    .then(res => dispatch({ type: USER_FETCH_SUCCESS, user: res.data }))
    .catch(err => dispatch({ type: USER_FETCH_ERROR, error: errorHandler(err) }))
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
  return (dispatch) => {
    dispatch({ type: USER_UPDATE })
    axios.put(`${endpoint}/id/${user.id}`, user)
    .then(res => {
      dispatch({ type: USER_UPDATE_SUCCESS, user: res.data })
      browserHistory.push('/users')
    })
    .catch(err => dispatch({ type: USER_UPDATE_ERROR, error: errorHandler(err) }))
  }
}

// receives user, sends data to backend,
// and dispatch the related actions
export function createUser(user) {
  return (dispatch) => {
    dispatch({ type: USER_CREATE })
    axios.post(endpoint, user)
    .then(res => {
      dispatch({ type: USER_CREATE_SUCCESS, user: res.data })
      browserHistory.push('/users')
    })
    .catch(err => dispatch({ type: USER_CREATE_ERROR, error: errorHandler(err) }))
  }
}

// receives client, deletes data in backend,
// and dispatch the related actions
export function deleteUser(user) {
  return (dispatch) => {
    dispatch({ type: USER_DELETE })
    axios.delete(`${endpoint}/id/${user.id}`)
    .then(res => dispatch({ type: USER_DELETE_SUCCESS, user }))
    .catch(err => dispatch({ type: USER_DELETE_ERROR, error: errorHandler(err) }))
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
    return user.id === action.user.id ?
      action.user :
      user;
  });
  return {
    ...state,
    currentPage: users,
    activeUser: action.user,
    loading: false
  }
}

// computes a slice of the state for the USER_CREATE_SUCCESS action
const createSuccess = (state, action) => {
  const users = state.currentPage.concat(action.user);
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
    case USERS_FETCH:
    case USER_FETCH:
    case USER_UPDATE:
    case USER_CREATE:
    case USER_DELETE:
      return {
        ...state,
        loading: true
      }
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        currentPage: action.users.content,
        loading: false
      }
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        activeUser: action.user,
        loading: false
      }
    case USER_UPDATE_SUCCESS:
      return updateSuccess(state, action)
    case USER_CREATE_SUCCESS:
      return createSuccess(state, action)
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPage: state.currentPage
          .filter(user => user.id !== action.user.id)
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
    case USERS_FETCH_ERROR:
    case USER_FETCH_ERROR:
    case USER_UPDATE_ERROR:
    case USER_CREATE_ERROR:
    case USER_DELETE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
