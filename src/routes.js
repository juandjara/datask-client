import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App';
import Projects from './components/Projects'
import NotFound from './components/NotFound'
import Login from './components/Login'
import AuthService from './utils/authService';

const RequireAuth = (wrappedComp) => {
  return AuthService.userIsLogged() ? wrappedComp : Login;
}

export default (
  <Route path="/" component={RequireAuth(App)}>
    <IndexRoute component={Projects} />
    <Route path="*" component={NotFound} />
  </Route>
)
