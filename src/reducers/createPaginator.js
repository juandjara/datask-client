import axios from '../utils/axiosWrapper'

/* eslint no-case-declarations:0 */
export default function createPaginator(
  endpoint, contentKey = 'content', idKey = 'id'
) {
  // action types
  const FETCH_PAGE = `${endpoint} FETCH_PAGE`

  // action creators
  
  // this action creator is suposed to be used
  // with redux-promise-middleware
  // so propper actions are dispatched
  const fetchPage = (page, size = 5) => {
    const promise = axios
      .get(endpoint, { params: {page, size} })
      .then(res => res.data)
    return {
      type: FETCH_PAGE, 
      payload: {data: {page, size}, promise}, 
      meta: endpoint
    }
  }

  // selectors
  const pageSelector = (pagination, entities) => {
    const { ids, loading, page, first, last, totalPages } = pagination
    const items = ids.map(id => entities[id]).filter(Boolean)
    return {
      items,
      loading,
      params: { page, first, last, totalPages }
    }
  }

  const initialState = {page: 0, ids: []}
  const filterForEndpoint = reducer => (state = initialState, action = {}) => {
    if(action.meta !== endpoint) {
      return state
    }
    return reducer(state, action)
  }
  const normalizeArray = (arr, idKey) => arr.reduce((prev, next) => {
    prev[next[idKey]] = next
    return prev
  }, {})
  const itemsReducer = (state = {}, action = {}) => {
    const {type, payload} = action
    switch(type) {
      case `${FETCH_PAGE}_SUCCESS`:
        const items = normalizeArray(payload[contentKey], idKey)
        return { ...state, ...items }
      default:
        return state
    }
  }
  const paginationReducer = (state = initialState, action = {}) => {
    const {type, payload = {}} = action
    switch(type) {
      case `${FETCH_PAGE}_LOADING`:
        return {
          ...state,
          page: payload.page,
          ids: [],
          loading: true
        }
      case `${FETCH_PAGE}_SUCCESS`:
        return {
          ...state,
          totalPages: payload.totalPages,
          first: payload.first,
          last: payload.last,
          ids: payload[contentKey].map(item => item[idKey]),
          loading: false
        }
      case `${FETCH_PAGE}_ERROR`:
        return { ...state, loading: false }
      default:
        return state
    }
  }

  return {
    reducers: {
      pagination: filterForEndpoint(paginationReducer),
      items: filterForEndpoint(itemsReducer),
    },
    actions: { fetchPage },
    types: { FETCH_PAGE },
    selectors: { pageSelector }
  }
}