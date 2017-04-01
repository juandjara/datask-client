import { login } from '../utils/authService'
import { browserHistory } from 'react-router';

// action types
export const USER_LOG_IN = "USER_LOG_IN"
export const USER_LOG_OUT = "USER_LOG_OUT"
export const LOGIN_ERROR = "USER_LOGIN_ERROR";
export const LOGIN_LOADING = "USER_LOGIN_LOADING"

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

// action creators
export function authenticate(form, rememberMe) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    login(form)
    .then(data => {
      const tokenData = processToken(data.id_token, rememberMe);
      dispatch({
        type: USER_LOG_IN,
        user: tokenData
      });
      browserHistory.push('/');
    })
    .catch(res => {
      const errorMap = {
        401: 'Usuario o contraseña inválidos',
        400: 'Error de validación'
      }
      let msg = errorMap[res.status];
      if(!msg) {
        msg = `${res.status} ${res.statusText}`;
      }
      if(res.status >= 500) {
        msg = "Fallo del servidor";
      }
      dispatch({
        type: LOGIN_ERROR,
        error: msg
      });
    })
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("jwt")
    browserHistory.push('/login')
    dispatch({
      type: USER_LOG_OUT,
      user: null
    })
  }
}

const storedToken = localStorage.getItem("jwt");
const initialState = processToken(storedToken);

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOG_IN:
    case USER_LOG_OUT:
      return action.user;
    case LOGIN_ERROR:
      return { error: action.error }
    case LOGIN_LOADING:
      return { loading: true }
    default:
      return state;
  }
}
