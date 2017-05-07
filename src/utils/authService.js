import axios from '../utils/axiosWrapper'

// key for storing the token in the browser localStorage
export const JWT_KEY = "__datask_jwt";

// checks if token is valid
// a token is valid when is not expired and not missing
export function tokenIsValid(tokenData) {
  if(!tokenData.exp) {
    return false;
  }
  const tokenTimestamp = tokenData.exp * 1000;
  return new Date(tokenTimestamp) > new Date();
}

// extracts json data encoded in the token
export function getTokenData(jwt) {
  if(!jwt) {
    return null
  }

  // 1. get second token section delimited by .
  // 2. transform from baes64 string to json string
  // 3. transform from json string to json object
  const sections = jwt.split('.')
  const decoded = atob(sections[1])
  const data = JSON.parse(decoded)
  return data;
}

// function that returns another function
// that serves as route interceptor for react-router
export const requireAuth = (store) => (nextState, replaceRoute) => {
  const tokenData = store.getState().auth;
  if(!tokenIsValid(tokenData)) {
    replaceRoute({
      pathname: '/login',
      query: { next: nextState.location.pathname }
    })
  }
}

export default { tokenIsValid, getTokenData, requireAuth }
