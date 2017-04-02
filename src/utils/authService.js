import config from '../config';
import fetchPost from './fetchPost'

export function tokenIsValid(tokenData) {
  if(!tokenData) {
    return false;
  }
  const tokenTimestamp = tokenData.exp * 1000;
  return new Date(tokenTimestamp) > new Date();
}
export function login(form) {
  const url = `${config.api}/authenticate`
  return fetchPost(url, form)
  .then(res => res.json())
}
export function processToken(jwt, shouldSaveToken) {
  if(!jwt) {
    return null
  }

  if(shouldSaveToken) {
    localStorage.setItem("jwt", jwt)
  }

  // get second token section delimited by . ,
  // then transform from baes64 string to json string
  // then transform from json string to json object
  const sections = jwt.split('.')
  const decoded = atob(sections[1])
  const data = JSON.parse(decoded)
  return data;
}

export const requireAuth = (store) => (nextState, replaceRoute) => {
  const tokenData = store.getState().auth;
  if(!tokenIsValid(tokenData)) {
    replaceRoute({
      pathname: '/login',
      query: { next: nextState.location.pathname }
    })
  }
}

export default { tokenIsValid, login, processToken, requireAuth }
