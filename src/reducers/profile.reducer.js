import config from '../config'
import { toast } from 'react-toastify';
import React from 'react';

// action types
export const PROFILE_LOADING = "PROFILE_LOADING"
export const PROFILE_SUCCESS = "PROFILE_SUCCESS"
export const PROFILE_ERROR = "PROFILE_ERROR"
export const PROFILE_UPDATE = "PROFILE_UPDATE"

function getAuthHeaders(state) {
  const token = state.auth.token;
  return {
    Authorization: `Bearer ${token}`
  }
}

// action creators
export function fetchProfile() {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING });
    const headers = getAuthHeaders(getState());
    const url = `${config.api}/account`;
    fetch(url, { headers })
    .then(res => res.json().then(json => Object.assign(res, {data: json})))
    .then(resWithData => {
      if(resWithData.ok) {
        dispatch({ type: PROFILE_SUCCESS, profile: resWithData.data })
      } else {
        dispatch({ type: PROFILE_ERROR, error: resWithData.data })
      }
    })
  }
}

const ToastBody = ({text}) => (
  <p style={{
    background: '#333',
    color: 'white'
  }}>{text}</p>
)

export function saveProfile(profile) {
  return (dispatch, getState) => {
    dispatch({ type: PROFILE_LOADING })
    let headers = getAuthHeaders(getState());
    Object.assign(headers, {
      'Content-Type': 'application/json'
    })
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
        dispatch({ type: PROFILE_ERROR, error })
      }
    })
  }
}

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return Object.assign({}, state, {loading: true})
    case PROFILE_SUCCESS:
      return action.profile;
    case PROFILE_UPDATE:
      return Object.assign({}, state, action.profile, {loading: false})
    case PROFILE_ERROR:
      return Object.assign({}, state, {error: action.error, loading: false})
    default:
      return state;
  }
}
