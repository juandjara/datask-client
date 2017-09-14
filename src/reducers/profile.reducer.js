import axios from '../utils/axiosWrapper';
import toast from '../utils/toastWrapper'

// action types
export const PROFILE_FETCH = "PROFILE_FETCH"

export const PROFILE_UPDATE = "PROFILE_UPDATE"
export const PROFILE_UPDATE_FIELD = "PROFILE_UPDATE_FIELD"

const errMapper = res => res.data && res.data.error.message

// action creators
export function fetchProfile() {
  const payload = axios.get('/user/me')
  .then(res => res.data)
  return { type: PROFILE_FETCH, payload }
}

export function updateProfileField(name, value) {
  return { name, value, type: PROFILE_UPDATE_FIELD }
}

export function saveProfile(profile) {
  const promise = axios.put('/user/me', profile);
  promise.then(() => toast('success', 'Perfil guardado'))
  return { type: PROFILE_UPDATE, payload: promise }
}

// reducer
export default (state = {loading: false}, action) => {
  switch (action.type) {
    case `${PROFILE_FETCH}_LOADING`:
    case `${PROFILE_UPDATE}_LOADING`:
      return { ...state, loading: true }
    case `${PROFILE_FETCH}_SUCCESS`:
    case `${PROFILE_UPDATE}_SUCCESS`:
      return { ...state, ...action.payload, loading: false }
    case `${PROFILE_FETCH}_ERROR`:
    case `${PROFILE_UPDATE}_ERROR`:
      return { ...state, error: errMapper(action.payload), loading: false }
    case PROFILE_UPDATE_FIELD:
      return { ...state, [action.name]: action.value }
    default:
      return state;
  }
}
