import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App';
import Projects from './components/Projects'
import NotFound from './components/NotFound'
import Login from './components/Login'
import AuthService from './utils/authService';

export default (store) => {
  const requireAuth = (nextState, replaceRoute) => {
    if(!AuthService.userIsLogged(store.getState())) {
      replaceRoute({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  return [
    (
      <Route path="/" component={App} onEnter={requireAuth}>
        <IndexRoute component={Projects} />
      </Route>
    ),
    (<Route path="/login" component={Login} />),
    (<Route path="*" component={NotFound} />)
  ]
}
