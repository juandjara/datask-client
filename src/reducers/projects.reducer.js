import axios from '../utils/axiosWrapper'

// action types
export const PROJECTS_LOADING = "PROJECTS_LOADING"
export const PROJECTS_SUCCESS = "PROJECTS_SUCCESS"
export const PROJECTS_ERROR = "PROJECTS_ERROR"

function getAuthHeaders(state) {
  const token = state.auth.token;
  return {
    Authorization: `Bearer ${token}`
  }
}

// action creators
export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch({ type: PROJECTS_LOADING });
    axios.get('/projects')
    .then(res => dispatch({ type: PROJECTS_SUCCESS, projects: res.data }))
    .catch(res => dispatch({ type: PROJECTS_ERROR, error: res.data }))
  }
}

const initialState = {data: []}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_LOADING:
      return Object.assign({}, state, {loading: true})
    case PROJECTS_SUCCESS:
      return {data: action.projects};
    case PROJECTS_ERROR:
      return Object.assign({}, state, {error: action.error, loading: false})
    default:
      return state;
  }
}
