import { browserHistory } from 'react-router'
import { combineReducers } from 'redux'
import axios from 'services/axiosWrapper'
import createPaginator from 'services/createPaginator'

const endpoint = "/user";
const paginator = createPaginator(endpoint)

// SELECTORS
export const getUsersPage = state => paginator.selectors.pageSelector(
  state.users.pagination,
  state.users.entities
)
export const getUserById = (state, id) => state.users.entities[id] || {missing: true}

// ACTION TYPES
export const USERS_FETCH = paginator.types.FETCH_PAGE
export const USER_FETCH = "USER_FETCH"
export const USER_UPDATE = "USER_UPDATE"
export const USER_CREATE = "USER_CREATE"
export const USER_DELETE = "USER_DELETE"

// ACTION CREATORS

// receives page and page size
// and dispatches actions to fetch a page from the list of users
export const fetchUsersPage = paginator.actions.fetchPage

// receives project id
// and dispatches actions to fetch the user
export function fetchSingleUser(id) {
  const promise = axios.get(`${endpoint}/${id}`).then(res => res.data)
  return {
    type: USER_FETCH,
    payload: {data: {id}, promise}
  }
}

// checks if given user is loaded and dispatches action to load it if not
export const fetchUserIfNeeded = id => (dispatch, getState) => {
  const {users} = getState()
  if(!users.entities[id]) {
    return dispatch(fetchSingleUser(id))
  }
}

// receives user, sends data to backend,
// and dispatch the related actions
export function editUser(user, isEditMode) {
  const promise = axios({
    method: isEditMode ? 'put' : 'post',
    url: isEditMode ? `${endpoint}/${user._id}` : endpoint,
    data: user
  }).then(res => res.data)
  promise.then(() => {
    browserHistory.push('/users')
  })
  return {
    type: isEditMode ? USER_UPDATE : USER_CREATE,
    payload: {data: user, promise}
  }
}
export const saveUser = user => editUser(user, true)
export const createUser = user => editUser(user, false)

// receives client, deletes data in backend,
// and dispatch the related actions
export const deleteUser = (user) => (dispatch, getState) => {
  const {users} = getState()
  const promise = axios.delete(`${endpoint}/${user._id}`).then(() => user)
  dispatch({
    type: USER_DELETE,
    payload: {data: user, promise}
  })
  promise.then(() => {
    dispatch(fetchUsersPage(users.pagination.page))
  })
}

// REDUCER
const usersReducer = (state = {}, action = {}) => {
  const {type, payload = {}} = action
  switch (type) {
    case `${USER_FETCH}_LOADING`:
    case `${USER_UPDATE}_LOADING`:
    case `${USER_CREATE}_LOADING`:
    case `${USER_DELETE}_LOADING`:
      return {
        ...state,
        [payload._id]: {loading: true}
      }
    case `${USER_FETCH}_SUCCESS`:
    case `${USER_UPDATE}_SUCCESS`:
    case `${USER_CREATE}_SUCCESS`:
      return {
        ...state,
        [payload._id]: payload
      }
    case `${USER_DELETE}_SUCCESS`:
      const copy = {...state}
      delete copy[payload._id]
      return copy
    case `${USER_FETCH}_ERROR`:
    case `${USER_UPDATE}_ERROR`:
    case `${USER_CREATE}_ERROR`:
    case `${USER_DELETE}_ERROR`:
      return {
        ...state,
        [payload._id]: {loading: false, error: payload}
      }
    default:
      return paginator.reducers.items(state, action);
  }
}

export default combineReducers({
  entities: usersReducer,
  pagination: paginator.reducers.pagination
})