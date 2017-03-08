import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './ducks/index'

const middlewares = [thunk]
let customCompose = compose

if (process.env.NODE_ENV !== "production") {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middlewares.push(logger);
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if(typeof devToolsCompose === 'function') {
    customCompose = devToolsCompose
  }
}

const initialState = {}
const store = createStore(rootReducer, initialState, customCompose(applyMiddleware(...middlewares)))

if(module.hot) {
  module.hot.accept('./ducks/', () => {
    const nextRootReducer = require('./ducks/index').default
    store.replaceReducer(nextRootReducer)
  })  
}

export default store
