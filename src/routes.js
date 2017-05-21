import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './containers/App';
import Profile from './containers/Profile'
import Projects from './containers/Projects'
import EditProject from './containers/EditProject'
import Users from './containers/Users'
import EditUser from './containers/EditUser'
import Clients from './containers/Clients'
import Login from './containers/Login'
import NotFound from './components/NotFound'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Projects}>
        <Route path=":id" component={EditProject} />
      </Route>
      <Route path="users" component={Users}>
        <Route path=":id" component={EditUser} />
      </Route>
      <Route path="clients" component={Clients}></Route>
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
