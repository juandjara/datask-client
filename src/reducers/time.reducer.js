import axios from 'services/axiosWrapper'
import { combineReducers } from 'redux'
import { uniqBy } from 'lodash'

const endpoint = '/time'

// TYPES
export const types = {
  FETCH_BY_TASK: 'TIME_FETCH_BY_TASK',
  FETCH_BY_USER: 'TIME_FETCH_BY_USER',
  FETCH_ONE: 'TIME_FETCH_ONE',
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
  saveAndFetch: (time, editMode) => (dispatch) => {
    dispatch(actions.save(time, editMode))
    .then(res => {
      return dispatch(actions.fetchOne(res.value._id))
    })
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
    const promise = axios.post(url, {
      ...time,
      user: time.user._id || time.user
    })
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
      url
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
    const slice = state.times.byUser[userId] || []
    const times = slice.map(id => state.times.entities[id])
                .filter(Boolean)
    return uniqBy(times, time => time.task._id)
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
  const hasTime = type.indexOf("TIME") !== -1
  const hasLoading = type.indexOf("LOADING") !== -1
  const hasSuccess = type.indexOf("SUCCESS") !== -1
  const hasError = type.indexOf("ERROR") !== -1
  if(hasTime && hasLoading) {
    return true
  }
  if(hasTime && (hasSuccess || hasError)) {
    return false
  }
  return state
}
const entitiesReducer = (state = {}, action = {}) => {
  const {type = "", payload = {}, meta = {}} = action
  switch(type) {
    case ok(types.FETCH_BY_TASK):
      return {
        ...state,
        ...normalizeArrayByKey(payload.docs)
      }
    case ok(types.FETCH_BY_USER):
      return {
        ...state,
        ...normalizeArrayByKey(payload)
      }
    case ok(types.FETCH_ONE):
      return {
        ...state,
        [payload._id]: payload
      }
    case ok(types.EDIT):
      return {
        ...state,
        [payload._id]: {
          ...state[payload._id],
          startTime: payload.startTime,
          endTime: payload.endTime          
        }
      }
    case ok(types.FINISH):
      return {
        ...state,
        [payload._id]: {
          ...state[payload._id],
          endTime: payload.endTime
        }
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
    const oldSlice = state[meta.taskId] || {ids: [], params: {}}
    const newIds = docs.map(time => time._id)
      .filter(id => oldSlice.ids.indexOf(id) === -1)
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
    const newIds = payload.map(time => time._id)
    return {
      ...state,
      [meta.userId]: newIds
    }
  }
  if(type === ok(types.CREATE)) {
    const oldSlice = state[payload.user] || []
    return {
      ...state,
      [payload.user]: [payload._id].concat(oldSlice)
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
