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
export const PROJECT_UPDATE_ERROR = "PROJECT_UPDATE_ERROR";

// action creators

// receives pagination params
// and dispatches actions to fetch the list of projects
export function fetchProjects(params) {
  return (dispatch) => {
    dispatch({ type: PROJECTS_FETCH });
    axios.get('/projects', {params})
    .then(res => dispatch({ type: PROJECTS_FETCH_SUCCESS, projects: res.data }))
    .catch(res => dispatch({ type: PROJECTS_FETCH_ERROR, error: res.data }))
  }
}

// receives project id
// and dispatches actions to fetch the project
export function fetchSingleProject(id) {
  return (dispatch) => {
    dispatch({ type: PROJECT_FETCH })
    axios.get(`/projects/${id}`)
    .then(res => dispatch({ type: PROJECT_FETCH_SUCCESS, project: res.data }))
    .catch(res => dispatch({ type: PROJECT_FETCH_ERROR, error: res.data }))
  }
}

// resets active project back to null
// useful for creating a new project
export function resetProject() {
  return { type: PROJECT_RESET }
}

export function updateProjectField(name, value) {
  return { name, value, type: PROJECT_UPDATE_FIELD }
}

export function saveProject(project) {
  return (dispatch) => {
    dispatch({ type: PROJECT_UPDATE })
    axios.put('/projects', project)
    .then(res => {
      dispatch({ type: PROJECT_UPDATE_SUCCESS, project: res.data })
      browserHistory.push('/projects')
    })
    .catch(res => dispatch({ type: PROJECT_UPDATE_ERROR, error: res.data }))
  }
}

const initialState = {currentPage: []}

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

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_FETCH:
    case PROJECT_FETCH:
    case PROJECT_UPDATE:
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
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
