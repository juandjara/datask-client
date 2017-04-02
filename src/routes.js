import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './components/App';
import Projects from './components/Projects'
import NotFound from './components/NotFound'
import Login from './components/Login'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    (
      <Route path="/" component={App} onEnter={requireAuth(store)}>
        <IndexRedirect to="/projects" />
        <Route path="projects" component={Projects} />
      </Route>
    ),
    (<Route path="/login" component={Login} />),
    (<Route path="*" component={NotFound} />)
  ]
}
