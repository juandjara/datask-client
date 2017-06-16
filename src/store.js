import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/index.reducer'
import { mediaQueryTracker } from 'redux-mediaquery'
import mediaQueries from './utils/mediaQueries'

const middlewares = [
  thunk, 
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  })
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
