import axios from '../utils/axiosWrapper'
import { browserHistory } from 'react-router'

// action types
export const CLIENTS_FETCH = "CLIENTS_FETCH"
export const CLIENTS_FETCH_SUCCESS = "CLIENTS_FETCH_SUCCESS"
export const CLIENTS_FETCH_ERROR = "CLIENTS_FETCH_ERROR"

export const CLIENT_FETCH = "CLIENT_FETCH"
export const CLIENT_FETCH_SUCCESS = "CLIENT_FETCH_SUCCESS"
export const CLIENT_FETCH_ERROR = "CLIENT_FETCH_ERROR"

export const CLIENT_RESET = "CLIENT_RESET"
export const CLIENT_UPDATE_FIELD = "CLIENT_UPDATE_FIELD"

export const CLIENT_UPDATE = "CLIENT_UPDATE"
export const CLIENT_UPDATE_SUCCESS = "CLIENT_UPDATE_SUCCESS"
export const CLIENT_UPDATE_ERROR = "CLIENT_UPDATE_ERROR"

export const CLIENT_CREATE = "CLIENT_CREATE"
export const CLIENT_CREATE_SUCCESS = "CLIENT_CREATE_SUCCESS"
export const CLIENT_CREATE_ERROR = "CLIENT_CREATE_ERROR"

export const CLIENT_DELETE = "CLIENT_DELETE"
export const CLIENT_DELETE_SUCCESS = "CLIENT_DELETE_SUCCESS"
export const CLIENT_DELETE_ERROR = "CLIENT_DELETE_ERROR"

// gets error message from server response
const errorHandler = err => err.message || err.response.data.message
const endpoint = "/company"

// action creators

// receives pagination params
// and dispatches actions to fetch the list of clients
export function fetchClients(params) {
  return (dispatch) => {
    dispatch({ type: CLIENTS_FETCH });
    axios.get(endpoint, {params})
    .then(res => dispatch({ type: CLIENTS_FETCH_SUCCESS, clients: res.data }))
    .catch(err => dispatch({ type: CLIENTS_FETCH_ERROR, error: errorHandler(err) }))
  }
}

// receives project id
// and dispatches actions to fetch the client
export function fetchSingleClient(id) {
  return {
    type: CLIENT_FETCH,
    payload: axios.get(`${endpoint}/id/${id}`).then(res => res.data)
  }
}

// resets active client back to null
// useful for creating a new client
export function resetClient() {
  return { type: CLIENT_RESET }
}

// updates form field when user types
export function updateClientField(name, value) {
  return { name, value, type: CLIENT_UPDATE_FIELD }
}

// receives client, sends data to backend,
// and dispatch the related actions
export function editClient(client, isEditMode) {
  const promise = axios({
    method: isEditMode ? 'put' : 'post',
    url: isEditMode ? `${endpoint}/id/${client.id}` : endpoint,
    data: client
  }).then(res => res.data)
  promise.then(() => browserHistory.push('/clients'))
  return {
    type: isEditMode ? CLIENT_UPDATE : CLIENT_CREATE,
    payload: promise
  }
}
export const saveClient = client => editClient(client, true)
export const createClient = client => editClient(client, false)

// receives client, deletes data in backend,
// and dispatch the related actions
export function deleteClient(client) {
  return {
    type: CLIENT_DELETE,
    payload: axios.delete(`${endpoint}/id/${client.id}`).then(res => res.data)
  }
}

const initialState = {currentPage: []}

// computes a slice of the state for the CLIENT_UPDATE_SUCCESS action
const updateSuccess = (state, action) => {
  const clients = state.currentPage.map(client => {
    return client.id === action.client.id ?
      action.client :
      client;
  });
  return {
    ...state,
    currentPage: clients,
    activeClient: action.client,
    loading: false
  }
}

// computes a slice of the state for the CLIENT_CREATE_SUCCESS action
const createSuccess = (state, action) => {
  const clients = state.currentPage.concat(action.client);
  return {
    ...state,
    currentPage: clients,
    activeClient: null,
    loading: false
  }
}


// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case CLIENTS_FETCH:
    case CLIENT_FETCH:
    case CLIENT_UPDATE:
    case CLIENT_CREATE:
    case CLIENT_DELETE:
      return {
        ...state,
        loading: true
      }
    case CLIENTS_FETCH_SUCCESS:
      return {
        ...state,
        currentPage: action.clients.content,
        loading: false
      }
    case CLIENT_FETCH_SUCCESS:
      return {
        ...state,
        activeClient: action.client,
        loading: false
      }
    case CLIENT_UPDATE_SUCCESS:
      return updateSuccess(state, action)
    case CLIENT_CREATE_SUCCESS:
      return createSuccess(state, action)
    case CLIENT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPage: state.currentPage
          .filter(client => client.id !== action.client.id)
      }
    case CLIENT_RESET:
      return {
        ...state,
        activeClient: null
      }
    case CLIENT_UPDATE_FIELD:
      return {
        ...state,
        activeClient: {
          ...state.activeClient,
          [action.name]: action.value
        }
      }
    case CLIENTS_FETCH_ERROR:
    case CLIENT_FETCH_ERROR:
    case CLIENT_UPDATE_ERROR:
    case CLIENT_CREATE_ERROR:
    case CLIENT_DELETE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
