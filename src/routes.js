import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './containers/App';
import Profile from './containers/Profile'
import Projects from './containers/Projects'
import ProjectDialog from './containers/ProjectDialog'
import Users from './containers/Users'
import UserDialog from './containers/UserDialog'
import Clients from './containers/Clients'
import ClientDialog from './containers/ClientDialog'
import Login from './containers/Login'
import NotFound from './components/NotFound'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Projects}>
        <Route path=":id" component={ProjectDialog} />
      </Route>
      <Route path="users" component={Users}>
        <Route path=":id" component={UserDialog} />
      </Route>
      <Route path="clients" component={Clients}>
        <Route path=":id" component={ClientDialog} />
      </Route>
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
