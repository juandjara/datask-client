import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import {App} from './features/app';
import {Login} from './features/login'
import NotFound from './components/NotFound'

import {Profile} from './features/profile'
import {ProjectList, ProjectDialogContainer} from './features/projects'
import {UserList,    UserDialogContainer}    from './features/users'
import {ClientList,  ClientDialogContainer}  from './features/clients'

import { requireAuth } from './services/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={ProjectList}>
        <Route path=":_id" component={ProjectDialogContainer} />
      </Route>
      <Route path="users" component={UserList}>
        <Route path=":_id" component={UserDialogContainer} />
      </Route>
      <Route path="clients" component={ClientList}>
        <Route path=":_id" component={ClientDialogContainer} />
      </Route>
      <Route path="profile" component={Profile} />
    </Route>,
    <Route path="/login" component={Login} />,
    <Route path="*" component={NotFound} />
  ]
}
