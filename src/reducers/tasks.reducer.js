import axios from 'services/axiosWrapper'
import { combineReducers } from 'redux'

const endpoint = '/task'

// TYPES
export const types = {
  FETCH_BY_PROJECT: 'TASK_FETCH_BY_PROJECT',
  FETCH_BY_USER: 'TASK_FETCH_BY_USER',
  FETCH_ONE: 'TASK_FETCH_ONE',
  CREATE: 'TASK_CREATE',
  EDIT: 'TASK_EDIT',
  DELETE: 'TASK_DELETE'
}

// ACTIONS
export const actions = {
  fetchByProject: (projectId, params) => {
    const url = `${endpoint}/by_project/${projectId}`
    const promise = axios.get(url, {params})
    .then(res => res.data)
    return {
      type: types.FETCH_BY_PROJECT,
      payload: promise,
      meta: {projectId, params}
    }
  },
  fetchByUser: (userId, params) => {
    const url = `${endpoint}/by_user/${userId}`
    const promise = axios.get(url, {params})
    .then(res => res.data)
    return {
      type: types.FETCH_BY_USER,
      payload: promise,
      meta: {userId, params}
    }
  },
  fetchOne: (taskId) => {
    const url = [endpoint, taskId].join('/')
    const promise = axios.get(url)
    .then(res => res.data)
    return {
      type: types.FETCH_ONE,
      payload: promise,
      meta: {_id: taskId}
    }
  },
  save: (task, editMode) => {
    const method = editMode ? 'PUT':'POST'
    const url = editMode ? [endpoint, task._id].join('/') : endpoint
    const type = editMode ? types.EDIT : types.CREATE
    const promise = axios({
      method,
      url,
      data: task
    }).then(res => res.data)
    return {
      type,
      payload: promise,
      meta: task
    }
  },
  delete: (task) => {
    const url = `${endpoint}/${task._id}`
    const promise = axios.delete(url)
    .then(() => task)
    return {
      type: types.DELETE,
      payload: promise,
      meta: task
    }
  }
}

// SELECTORS
export const selectors = {
  getByProjectId: (state, projectId) => {
    const slice = state.tasks.byProject[projectId] || {
      ids: [],
      params: {}
    }
    const tasks = slice.ids.map(id => state.tasks.entities[id]).filter(Boolean)
    return {tasks, pageParams: slice.params}
  },
  getOne: (state, taskId) => {
    return state.tasks.entities[taskId]
  },
  getLoading: (state) => state.tasks.loading
}

/* task reducer state
entities: {
  id1: {},
  id2: {}
},
byProject: {
  projectId1: {
    ids: [id1, id2, id3],
    params: params
  }
},
byUser: {
  userId1: [id1, id2, id3]
},
loading: true
*/

// REDUCER
const normalizeArrayByKey = (arr, idKey = "_id") => {
  return arr.reduce((prev, next) => {
    prev[next[idKey]] = next
    return prev
  }, {})
}
const ok = type => `${type}_SUCCESS`

const loadingReducer = (state = false, action = {}) => {
  const {type = ""} = action
  if(type.indexOf("TASK") !== -1) {
    return type.indexOf("LOADING") !== -1
  }
  return state
}
const entitiesReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  switch(type) {
    case ok(types.FETCH_BY_PROJECT):
    case ok(types.FETCH_BY_USER):
      return {
        ...state,
        ...normalizeArrayByKey(payload.docs)
      }
    case ok(types.FETCH_ONE):
    case ok(types.CREATE):
    case ok(types.EDIT):
      return {
        ...state,
        [payload._id]: payload
      }
    case ok(types.DELETE): 
      const copy = {...state}
      delete copy[meta._id]
      return copy
    default:
      return state
  }
}
const byProjectReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  if(type === ok(types.FETCH_BY_PROJECT)) {
    const {page, last, docs} = payload
    const newIds = docs.map(task => task._id)
    const oldSlice = state[meta.projectId] || {ids: [], params: {}}
    return {
      ...state,
      [meta.projectId]: {
        ids: oldSlice.ids.concat(newIds),
        params: {page, last}
      }
    }
  }
  if(type === ok(types.CREATE)) {
    const oldSlice = state[payload.project] || {ids: [], params: {}}
    return {
      ...state,
      [payload.project]: {
        ...oldSlice,
        ids: oldSlice.ids.concat(payload._id)
      }
    }
  }
  return state
}

const reducer = combineReducers({
  loading: loadingReducer,
  entities: entitiesReducer,
  byProject: byProjectReducer
})

export default reducer
