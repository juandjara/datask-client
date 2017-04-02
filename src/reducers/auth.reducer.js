import { login, processToken } from '../utils/authService'
import { browserHistory } from 'react-router';

// action types
export const LOG_IN = "AUTH_LOG_IN"
export const LOG_OUT = "AUTH_LOG_OUT"
export const LOGIN_ERROR = "AUTH_LOGIN_ERROR";
export const LOGIN_LOADING = "AUTH_LOGIN_LOADING"

// action creators
export function authenticate(credentials, rememberMe, nextLocation) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    login(credentials).then(json => {
      const tokenData = processToken(json.id_token, rememberMe);
      dispatch({
        type: LOG_IN,
        data: tokenData,
        token: json.id_token
      });
      browserHistory.push(nextLocation || '/');
    }).catch(res => {
      const errorMap = {
        401: 'Usuario o contraseña inválidos',
        400: 'Error de validación'
      }
      let msg = errorMap[res.status] || `${res.status} ${res.statusText}`;
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
      type: LOG_OUT
    })
  }
}

const storedToken = localStorage.getItem("jwt");
const initialState = processToken(storedToken);

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign(action.data, {token: action.token});
    case LOG_OUT:
      return null;
    case LOGIN_ERROR:
      return { error: action.error }
    case LOGIN_LOADING:
      return { loading: true }
    default:
      return state;
  }
}
