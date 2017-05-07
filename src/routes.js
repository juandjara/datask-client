import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './containers/App';
import Projects from './containers/Projects'
import Profile from './containers/Profile'
import NotFound from './components/NotFound'
import Login from './containers/Login'
import EditProject from './containers/EditProject'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Projects}>
        <Route path=":id" component={EditProject} />
      </Route>
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
