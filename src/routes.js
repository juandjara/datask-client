import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import App from './containers/App';
import Profile from './containers/Profile'
import Projects from './containers/Projects'
import ProjectDialogContainer from './containers/ProjectDialogContainer'
import Users from './containers/Users'
import UserDialogContainer from './containers/UserDialogContainer'
import Clients from './containers/Clients'
import ClientDialogContainer from './containers/ClientDialogContainer'
import Login from './containers/Login'
import NotFound from './components/NotFound'
import { requireAuth } from './utils/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={Projects}>
        <Route path=":_id" component={ProjectDialogContainer} />
      </Route>
      <Route path="users" component={Users}>
        <Route path=":_id" component={UserDialogContainer} />
      </Route>
      <Route path="clients" component={Clients}>
        <Route path=":_id" component={ClientDialogContainer} />
      </Route>
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
