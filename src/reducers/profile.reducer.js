import config from '../config'

// action types
export const PROFILE_LOADING = "PROFILE_LOADING"
export const PROFILE_SUCCESS = "PROFILE_SUCCESS"
export const PROFILE_ERROR = "PROFILE_ERROR"

function getAuthHeaders(state) {
  const token = state.auth.token;
  return {
    Authorization: `Bearer ${token}`
  }
}

// action creators
export function fetchProfile() {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING });
    const headers = getAuthHeaders(getState());
    const url = `${config.api}/account`;
    fetch(url, { headers })
    .then(res => res.json().then(json => Object.assign(res, {data: json})))
    .then(resWithData => {
      if(resWithData.ok) {
        dispatch({ type: PROFILE_SUCCESS, profile: resWithData.data })
      } else {
        dispatch({ type: PROFILE_ERROR, error: resWithData.data })
      }
    })
  }
}

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {loading: true}
    case PROFILE_SUCCESS:
      return action.profile;
    case PROFILE_ERROR:
      return {error: action.error}
    default:
      return state;
  }
}
