import { login } from '../utils/authService'
import { browserHistory } from 'react-router';

// action types
export const USER_LOG_IN = "USER_LOG_IN"
export const USER_LOG_OUT = "USER_LOG_OUT"
export const LOGIN_ERROR = "USER_LOGIN_ERROR";
export const LOGIN_LOADING = "USER_LOGIN_LOADING"

// action creators
export function processToken(jwt) {
  if(!jwt) {
    return {
      type: USER_LOG_IN,
      user: null
    }
  }

  localStorage.setItem("jwt", jwt)
  const sections = jwt.split('.')
  const data = JSON.parse(atob(sections[1]))
  return {
    type: USER_LOG_IN,
    user: data
  }
}

export function authenticate(form) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    login(form)
    .then(data => {
      dispatch(processToken(data.id_token));
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
  // borrar localStorage
  localStorage.removeItem("jwt")
  return {
    type: USER_LOG_OUT,
    user: null
  }
}

const storedToken = localStorage.getItem("jwt");
const initialState = processToken(storedToken).user;

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
