import axios from '../utils/axiosWrapper'
import { browserHistory } from 'react-router'
import createPaginator from './createPaginator'
import { combineReducers } from 'redux'

const endpoint = "/company"
const paginator = createPaginator(endpoint)

// SELECTORS
export const getClientsPage = state => paginator.selectors.pageSelector(
  state.clients.pagination,
  state.clients.entities
)
export const getClientsSelect = state => {
  return getClientsPage(state).items.map(client => ({
    id: client._id,
    value: client._id,
    label: client.name
  }))
}
export const getClientByID = (state, id) => state.clients.entities[id] || {missing: true}

// ACTION TYPES
export const CLIENTS_FETCH = paginator.types.FETCH_PAGE
export const CLIENT_FETCH = "CLIENT_FETCH"
export const CLIENT_UPDATE = "CLIENT_UPDATE"
export const CLIENT_CREATE = "CLIENT_CREATE"
export const CLIENT_DELETE = "CLIENT_DELETE"

// ACTIONS CREATORS

// receives pagination params
// and dispatches actions to fetch the list of clients
export const fetchClientsPage = paginator.actions.fetchPage

// receives project id
// and dispatches actions to fetch the client
export function fetchSingleClient(id) {
  const promise = axios.get(`${endpoint}/${id}`).then(res => res.data)
  return {
    type: CLIENT_FETCH,
    payload: {data: {id}, promise}
  }
}

// checks if given client is loaded and dispatches action to load it if not
export const fetchClientIfNeeded = id => (dispatch, getState) => {
  const {clients} = getState()
  if(!clients.entities[id]) {
    return dispatch(fetchSingleClient(id))
  }
}

// receives client, sends data to backend,
// and dispatch the related actions
export function editClient(client, isEditMode) {
  const promise = axios({
    method: isEditMode ? 'put' : 'post',
    url: isEditMode ? `${endpoint}/${client._id}` : endpoint,
    data: client
  }).then(res => res.data)
  promise.then(() => browserHistory.push('/clients'))
  return {
    type: isEditMode ? CLIENT_UPDATE : CLIENT_CREATE,
    payload: {data: client, promise}
  }
}
export const saveClient = client => editClient(client, true)
export const createClient = client => editClient(client, false)

// receives client, deletes data in backend,
// and dispatch the related actions
export const deleteClient = (client) => (dispatch, getState) => {
  const {clients} = getState()
  const promise = axios.delete(`${endpoint}/${client._id}`).then(() => client)
  dispatch({
    type: CLIENT_DELETE,
    payload: {data: client, promise}
  })
  promise.then(() => {
    dispatch(fetchClientsPage(clients.pagination.page))
  })
}

// REDUCER
const clientsReducer = (state = {}, action = {}) => {
  const {type, payload = {}} = action
  switch (type) {
    case `${CLIENT_FETCH}_LOADING`:
    case `${CLIENT_UPDATE}_LOADING`:
    case `${CLIENT_CREATE}_LOADING`:
    case `${CLIENT_DELETE}_LOADING`:
      return {
        ...state,
        [payload._id]: {loading: true}
      }
    case `${CLIENT_FETCH}_SUCCESS`:
    case `${CLIENT_UPDATE}_SUCCESS`:
    case `${CLIENT_CREATE}_SUCCESS`:
      return {
        ...state,
        [payload._id]: payload
      }
    case `${CLIENT_DELETE}_SUCCESS`:
      const copy = {...state}
      delete copy[payload._id]
      return copy
    case `${CLIENT_FETCH}_ERROR`:
    case `${CLIENT_UPDATE}_ERROR`:
    case `${CLIENT_CREATE}_ERROR`:
    case `${CLIENT_DELETE}_ERROR`:
      return {
        ...state,
        [payload._id]: {loading: false, error: payload}
      }
    default:
      return paginator.reducers.items(state, action)
  }
}

export default combineReducers({
  entities: clientsReducer,
  pagination: paginator.reducers.pagination
})
