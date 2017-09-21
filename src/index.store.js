import { applyMiddleware, compose, createStore } from 'redux'
import { mediaQueryTracker } from 'redux-mediaquery'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import rootReducer from './index.reducer'
import mediaQueries from './helpers/mediaQueries'
import errorToastMiddleware from './helpers/errorToastMiddleware'

const middlewares = [
  thunk, 
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  }),
  errorToastMiddleware
]
let customCompose = compose

if (process.env.NODE_ENV !== "production") {
  
  const createLogger = require('redux-logger');
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error
  });
  middlewares.push(logger);
  
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if(typeof devToolsCompose === 'function') {
    customCompose = devToolsCompose
  }
}

const store = createStore(
  rootReducer, 
  {}, 
  customCompose(applyMiddleware(...middlewares))
)

store.dispatch(mediaQueryTracker({
  small: mediaQueries.small
}))

if(module.hot) {
  module.hot.accept('./index.reducer', () => {
    const nextRootReducer = require('./index.reducer').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
