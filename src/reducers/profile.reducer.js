import config from '../config'
import { toast } from 'react-toastify';
import React from 'react';

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

function getAuthHeaders(state) {
  const token = state.auth.token;
  return {
    Authorization: `Bearer ${token}`
  }
}

// action creators
export function fetchProfile() {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_FETCH });
    const headers = getAuthHeaders(getState());
    const url = `${config.api}/account`;
    fetch(url, { headers })
    .then(res => res.json().then(json => Object.assign(res, {data: json})))
    .then(resWithData => {
      if(resWithData.ok) {
        dispatch({ type: PROFILE_FETCH_SUCCESS, profile: resWithData.data })
      } else {
        dispatch({ type: PROFILE_FETCH_ERROR, error: resWithData.data })
      }
    })
  }
}

export function updateProfileField(name, value) {
  return { name, value, type: PROFILE_UPDATE_FIELD }
}

export function saveProfile(profile) {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_UPDATE })
    let headers = getAuthHeaders(getState());
    headers['Content-Type'] = 'application/json'
    const url = `${config.api}/account`;
    fetch(url, {
      headers,
      body: JSON.stringify(profile),
      method: 'POST'
    })
    .then(res => {
      if(res.ok) {
        toast.success(<ToastBody text="Perfil guardado" />)
        dispatch({ type: PROFILE_UPDATE, profile })
      } else {
        const error = `${res.status} ${res.statusText}`;
        toast.error(<ToastBody text={error} />)
        dispatch({ type: PROFILE_UPDATE_ERROR, error })
      }
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
