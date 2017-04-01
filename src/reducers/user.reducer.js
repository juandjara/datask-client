import { login, processToken } from '../utils/authService'
import { browserHistory } from 'react-router';

// action types
export const USER_LOG_IN = "USER_LOG_IN"
export const USER_LOG_OUT = "USER_LOG_OUT"
export const LOGIN_ERROR = "USER_LOGIN_ERROR";
export const LOGIN_LOADING = "USER_LOGIN_LOADING"

// action creators
export function authenticate(form, rememberMe) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_LOADING
    });

    login(form).then(json => {
      const tokenData = processToken(json.id_token, rememberMe);
      dispatch({
        type: USER_LOG_IN,
        user: tokenData
      });
      browserHistory.push('/');
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
