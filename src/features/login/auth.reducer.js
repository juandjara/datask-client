import { getTokenData, JWT_KEY } from '../../helpers/authService'
import { browserHistory } from 'react-router';
import axios from 'axios'
import config from '../../index.config'

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

    axios.post(`${config.api}/user/authenticate`, credentials)
    .then(res => {
      const token = res.data.token
      const tokenData = getTokenData(token);
      if(rememberMe) {
        localStorage.setItem(JWT_KEY, token);
      }
      dispatch({
        type: LOG_IN,
        data: tokenData,
        token
      });
      browserHistory.push(nextLocation || '/');
    }).catch(res => {
      const data = res.response;
      const errorMap = {
        401: 'Usuario o contraseña inválidos',
        400: 'Error de validación'
      }
      let msg = errorMap[data.status] || `${data.error} ${data.message}`;
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
    localStorage.removeItem(JWT_KEY)
    browserHistory.push('/login')
    dispatch({
      type: LOG_OUT
    })
  }
}

const storedToken = localStorage.getItem(JWT_KEY);
const initialData = getTokenData(storedToken)
const initialState = {
  token: storedToken, 
  ...initialData
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        token: action.token, 
        ...action.data
      }
    case LOG_OUT:
      return {}
    case LOGIN_ERROR:
      return { error: action.error }
    case LOGIN_LOADING:
      return { loading: true }
    default:
      return state;
  }
}
