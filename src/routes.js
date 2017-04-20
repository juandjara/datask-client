import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './components/routed/App';
import Projects from './components/routed/Projects'
import Profile from './components/routed/Profile'
import NotFound from './components/routed/NotFound'
import Login from './components/routed/Login'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Projects} />
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
