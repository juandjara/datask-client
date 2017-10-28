import axios from 'services/axiosWrapper'
import { browserHistory } from 'react-router'

const endpoint = '/task'

// TYPES
export const types = {
  FETCH_PAGE: 'TASK_FETCH_PAGE',
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
      type: types.FETCH_PAGE,
      payload: promise,
      meta: {projectId, params}
    }
  },
  fetchByUser: (userId, params) => {
    const url = `${endpoint}/by_user/${userId}`
    const promise = axios.get(url, {params})
    .then(res => res.data)
    return {
      type: types.FETCH_PAGE,
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
      meta: {taskId}
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
    promise.then(() => {
      browserHistory.push(`/projects/${task.project}`)
    })
    return {
      type,
      payload: promise,
      meta: task
    }
  }
}

// SELECTORS
export const selectors = {
  getByProjectId: (state, projectId) => {

  },
  getOne: (state, projectId, taskId) => {

  }
}

// REDUCER
