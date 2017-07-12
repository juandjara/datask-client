import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/index.reducer'
import { mediaQueryTracker } from 'redux-mediaquery'
import mediaQueries from './utils/mediaQueries'
import toast from './utils/toastWrapper'

const errorToastMiddleware = store => next => action => {
  const {error, payload = {}} = action
  if(error) {
    toast('error', payload.message)
  }
  return next(action)
}

const middlewares = [
  thunk, 
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  }),
  errorToastMiddleware
]
let customCompose = compose

if (process.env.NODE_ENV !== "production") {
  /*
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
  */
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if(typeof devToolsCompose === 'function') {
    customCompose = devToolsCompose
  }
}

const initialState = {}
const store = createStore(rootReducer, initialState, customCompose(applyMiddleware(...middlewares)))

store.dispatch(mediaQueryTracker({
  small: mediaQueries.small
}))

if(module.hot) {
  module.hot.accept('./reducers/index.reducer', () => {
    const nextRootReducer = require('./reducers/index.reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
