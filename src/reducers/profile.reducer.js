import { toast } from 'react-toastify';
import React from 'react';
import axios from '../utils/axiosWrapper';

// action types
export const PROFILE_FETCH = "PROFILE_FETCH"
export const PROFILE_FETCH_SUCCESS = "PROFILE_FETCH_SUCCESS"
export const PROFILE_FETCH_ERROR = "PROFILE_FETCH_ERROR"

export const PROFILE_UPDATE = "PROFILE_UPDATE"
export const PROFILE_UPDATE_SUCCESS = "PROFILE_UPDATE_SUCCESS"
export const PROFILE_UPDATE_ERROR = "PROFILE_UPDATE_ERROR"
export const PROFILE_UPDATE_FIELD = "PROFILE_UPDATE_FIELD"

const ToastBody = ({text}) => (
  <p style={{
    background: '#333',
    color: 'white'
  }}>{text}</p>
)

// action creators
export function fetchProfile() {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_FETCH });
    axios.get('/account')
    .then(res => dispatch({ type: PROFILE_FETCH_SUCCESS, profile: res.data }))
    .catch(res => dispatch({ type: PROFILE_FETCH_ERROR, error: res.data }))
  }
}

export function updateProfileField(name, value) {
  return { name, value, type: PROFILE_UPDATE_FIELD }
}

export function saveProfile(profile) {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_UPDATE })
    axios.post('/account', profile)
    .then(() => {
      toast.success(<ToastBody text="Perfil guardado" />)
      dispatch({ type: PROFILE_UPDATE_SUCCESS, profile })
    })
    .catch(res => {
      const error = `${res.status} ${res.statusText}`;
      toast.error(<ToastBody text={error} />)
      dispatch({ type: PROFILE_UPDATE_ERROR, error })
    })
  }
}

// reducer
export default (state = {loading: false}, action) => {
  switch (action.type) {
    case PROFILE_FETCH:
    case PROFILE_UPDATE:
      return Object.assign({}, state, {loading: true})
    case PROFILE_FETCH_SUCCESS:
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, action.profile, {loading: false})
    case PROFILE_FETCH_ERROR:
    case PROFILE_UPDATE_ERROR:
      return Object.assign({}, state, {error: action.error, loading: false})
    case PROFILE_UPDATE_FIELD:
      return Object.assign({}, state, {
        [action.name]: action.value
      })
    default:
      return state;
  }
}
