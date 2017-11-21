import axios from 'services/axiosWrapper'
import { combineReducers } from 'redux'

const endpoint = '/time'

// TYPES
export const types = {
  FETCH_BY_TASK: 'TIME_FETCH_BY_TASK',
  FETCH_BY_USER: 'TIME_FETCH_BY_USER',
  CREATE: 'TIME_CREATE',
  FINISH: 'TIME_FINISH',
  EDIT: 'TIME_EDIT',
  DELETE: 'TIME_DELETE',
  TICK: 'TIME_TICK'
}

// ACTIONS
export const actions = {
  fetchByTask(taskId, params) {
    const url = `${endpoint}/by_task/${taskId}`
    const promise = axios.get(url, {params})
    .then(res => res.data)
    return {
      type: types.FETCH_BY_TASK,
      payload: promise,
      meta: {taskId, params}
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
  fetchOne: (timeId) => {
    const url = `${endpoint}/${timeId}`;
    const promise = axios.get(url)
    .then(res => res.data)
    return {
      type: types.FETCH_ONE,
      payload: promise,
      meta: {_id: timeId}
    }
  },
  save: (time, editMode) => {
    const method = editMode ? 'PUT':'POST'
    const url = editMode ? `${endpoint}/${time._id}` : endpoint
    const type = editMode ? types.EDIT : types.CREATE
    const promise = axios({
      method,
      url,
      data: time
    }).then(res => res.data)
    return {
      type,
      payload: promise,
      meta: time
    }
  },
  finish(time) {
    const url = `${endpoint}/${time._id}/finish`
    const promise = axios.post(url, time)
    .then(res => res.data)
    return {
      type: types.FINISH,
      payload: promise,
      meta: time
    }
  },
  delete: (time) => {
    const url = `${endpoint}/${time._id}`
    const promise = axios({
      method: 'DELETE',
      url,
      data: time
    }).then(() => time)
    return {
      type: types.DELETE,
      payload: promise,
      meta: time
    }
  },
  tick() {
    return { type: types.TICK }
  }
}

// SELECTORS
export const selectors = {
  getByTaskId(state, taskId) {
    const slice = state.times.byTask[taskId] || {
      ids: [],
      params: {}
    }
    const times = slice.ids.map(id => state.times.entities[id]).filter(Boolean)
    return {times, pageParams: slice.params}
  },
  getByUserId(state, userId) {
    const slice = state.times.byUser[userId] || {
      ids: [],
      params: {}
    }
    const times = slice.ids.map(id => state.times.entities[id]).filter(Boolean)
    return {times, pageParams: slice.params}
  },
  getOne(state, taskId) {
    return state.times.entities[taskId]
  },
  getLoading(state) {
    return state.times.loading
  },
  getTick(state) {
    return state.times.tick
  }
}

/*
entities: {
  id1: {},
  id2: {}
},
byTask: {
  taskId1: {
    ids: [],
    params: {}
  }
},
byUser: {
  userId1: {
    ids: [],
    params: {}
  }
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
  if(type.indexOf("TIME") !== -1) {
    return type.indexOf("LOADING") !== -1
  }
  return state
}
const entitiesReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  switch(type) {
    case ok(types.FETCH_BY_TASK):
    case ok(types.FETCH_BY_USER):
      return {
        ...state,
        ...normalizeArrayByKey(payload.docs)
      }
    case ok(types.CREATE):
    case ok(types.EDIT):
    case ok(types.FINISH):
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
const byTaskReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  if(type === ok(types.FETCH_BY_TASK)) {
    const {page, last, docs} = payload
    const newIds = docs.map(time => time._id)    
    const oldSlice = state[meta.taskId] || {ids: [], params: {}}
    return {
      ...state,
      [meta.taskId]: {
        ids: oldSlice.ids.concat(newIds),
        params: {page, last}
      }
    }    
  }
  if(type === ok(types.CREATE)) {
    const oldSlice = state[payload.task] || {ids: [], params: {}}
    return {
      ...state,
      [payload.task]: {
        ...oldSlice,
        ids: [payload._id].concat(oldSlice.ids)
      }
    }
  }
  return state
}
const byUserReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  if(type === ok(types.FETCH_BY_USER)) {
    const {page, last, docs} = payload
    const newIds = docs.map(time => time._id)    
    const oldSlice = state[meta.userId] || {ids: [], params: {}}
    return {
      ...state,
      [meta.userId]: {
        ids: oldSlice.ids.concat(newIds),
        params: {page, last}
      }
    }    
  }
  if(type === ok(types.CREATE)) {
    const oldSlice = state[payload.task] || {ids: [], params: {}}
    return {
      ...state,
      [payload.task]: {
        ...oldSlice,
        ids: oldSlice.ids.concat(payload._id)
      }
    }
  }
  return state
}
const tickReducer = (state = Date.now(), action = {}) => {
  if(action.type === types.TICK) {
    return Date.now()
  }
  return state
}

const reducer = combineReducers({
  loading: loadingReducer,
  entities: entitiesReducer,
  byUser: byUserReducer,
  byTask: byTaskReducer,
  tick: tickReducer
})

export default reducer