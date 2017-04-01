import config from '../config';
import fetchPost from './fetchPost'

export function userIsLogged(state) {
  if(!state.user) {
    return false;
  }
  const tokenTimestamp = state.user.exp * 1000;
  return new Date(tokenTimestamp) > new Date();
}
export function login(form) {
  const url = `${config.api}/authenticate`
  return fetchPost(url, form)
  .then(res => res.json())
}

export default { userIsLogged, login }
