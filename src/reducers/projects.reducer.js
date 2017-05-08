import axios from '../utils/axiosWrapper'
import { browserHistory } from 'react-router'

// action types
export const PROJECTS_FETCH = "PROJECTS_FETCH"
export const PROJECTS_FETCH_SUCCESS = "PROJECTS_FETCH_SUCCESS"
export const PROJECTS_FETCH_ERROR = "PROJECTS_FETCH_ERROR"

export const PROJECT_FETCH = "PROJECT_FETCH"
export const PROJECT_FETCH_SUCCESS = "PROJECT_FETCH_SUCCESS"
export const PROJECT_FETCH_ERROR = "PROJECT_FETCH_ERROR"

export const PROJECT_RESET = "PROJECT_RESET"
export const PROJECT_UPDATE_FIELD = "PROJECT_UPDATE_FIELD"

export const PROJECT_UPDATE = "PROJECT_UPDATE"
export const PROJECT_UPDATE_SUCCESS = "PROJECT_UPDATE_SUCCESS"
export const PROJECT_UPDATE_ERROR = "PROJECT_UPDATE_ERROR"

export const PROJECT_CREATE = "PROJECT_CREATE"
export const PROJECT_CREATE_SUCCESS = "PROJECT_CREATE_SUCCESS"
export const PROJECT_CREATE_ERROR = "PROJECT_CREATE_ERROR"

export const PROJECT_DELETE = "PROJECT_DELETE"
export const PROJECT_DELETE_SUCCESS = "PROJECT_DELETE_SUCCESS"
export const PROJECT_DELETE_ERROR = "PROJECT_DELETE_ERROR"

// action creators

// receives pagination params
// and dispatches actions to fetch the list of projects
export function fetchProjects(params) {
  return (dispatch) => {
    dispatch({ type: PROJECTS_FETCH });
    axios.get('/projects', {params})
    .then(res => dispatch({ type: PROJECTS_FETCH_SUCCESS, projects: res.data }))
    .catch(err => dispatch({ type: PROJECTS_FETCH_ERROR, error: errorHandler(err) }))
  }
}

// receives project id
// and dispatches actions to fetch the project
export function fetchSingleProject(id) {
  return (dispatch) => {
    dispatch({ type: PROJECT_FETCH })
    axios.get(`/projects/${id}`)
    .then(res => dispatch({ type: PROJECT_FETCH_SUCCESS, project: res.data }))
    .catch(err => dispatch({ type: PROJECT_FETCH_ERROR, error: errorHandler(err) }))
  }
}

// resets active project back to null
// useful for creating a new project
export function resetProject() {
  return { type: PROJECT_RESET }
}

// updates form field when user types
export function updateProjectField(name, value) {
  return { name, value, type: PROJECT_UPDATE_FIELD }
}

// receives project, sends data to backend,
// and dispatch the related actions
export function saveProject(project) {
  return (dispatch) => {
    dispatch({ type: PROJECT_UPDATE })
    axios.put('/projects', project)
    .then(res => {
      dispatch({ type: PROJECT_UPDATE_SUCCESS, project: res.data })
      browserHistory.push('/projects')
    })
    .catch(err => dispatch({ type: PROJECT_UPDATE_ERROR, error: errorHandler(err) }))
  }
}

// receives project, sends data to backend,
// and dispatch the related actions
export function createProject(project) {
  return (dispatch) => {
    dispatch({ type: PROJECT_CREATE })
    axios.post('/projects', project)
    .then(res => {
      dispatch({ type: PROJECT_CREATE_SUCCESS, project: res.data })
      browserHistory.push('/projects')
    })
    .catch(err => dispatch({ type: PROJECT_CREATE_ERROR, error: errorHandler(err) }))
  }
}

// receives project, deletes data in backend,
// and dispatch the related actions
export function deleteProject(project) {
  return (dispatch) => {
    dispatch({ type: PROJECT_DELETE })
    axios.delete(`/projects/${project.id}`)
    .then(res => dispatch({ type: PROJECT_DELETE_SUCCESS, project }))
    .catch(err => dispatch({ type: PROJECT_DELETE_ERROR, error: errorHandler(err) }))
  }
}

const initialState = {currentPage: []}

// computes a slice of the state for the PROJECT_UPDATE_SUCCESS action
const updateSuccess = (state, action) => {
  const projects = state.currentPage.map(project => {
    return project.id === action.project.id ?
      action.project :
      project;
  });
  return {
    ...state,
    currentPage: projects,
    activeProject: action.project,
    loading: false
  }
}

// computes a slice of the state for the PROJECT_CREATE_SUCCESS action
const createSuccess = (state, action) => {
  const projects = state.currentPage.concat(action.project);
  return {
    ...state,
    currentPage: projects,
    activeProject: null,
    loading: false
  }
}

// gets error message from server response
const errorHandler = err => err.response.data.message;

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_FETCH:
    case PROJECT_FETCH:
    case PROJECT_UPDATE:
    case PROJECT_CREATE:
    case PROJECT_DELETE:
      return {
        ...state,
        loading: true
      }
    case PROJECTS_FETCH_SUCCESS:
      return {
        ...state,
        currentPage: action.projects,
        loading: false
      }
    case PROJECT_FETCH_SUCCESS:
      return {
        ...state,
        activeProject: action.project,
        loading: false
      }
    case PROJECT_UPDATE_SUCCESS:
      return updateSuccess(state, action)
    case PROJECT_CREATE_SUCCESS:
      return createSuccess(state, action)
    case PROJECT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPage: state.currentPage
          .filter(project => project.id !== action.project.id)
      }
    case PROJECT_RESET:
      return {
        ...state,
        activeProject: null
      }
    case PROJECT_UPDATE_FIELD:
      return {
        ...state,
        activeProject: {
          ...state.activeProject,
          [action.name]: action.value
        }
      }
    case PROJECTS_FETCH_ERROR:
    case PROJECT_FETCH_ERROR:
    case PROJECT_UPDATE_ERROR:
    case PROJECT_CREATE_ERROR:
    case PROJECT_DELETE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
