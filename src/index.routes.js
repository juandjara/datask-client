import React from 'react'
import { IndexRedirect, Route } from 'react-router'

import {App} from 'components/pages/app'
import {Login} from 'components/pages/login'
import NotFound from 'components/shared/NotFound'

import {Profile} from 'components/pages/profile'
import {UserList, UserFormDialog} from 'components/pages/users'
import {ClientList, ClientDialogContainer} from 'components/pages/clients'
import {ProjectList, ProjectFormDialog, ProjectUserDialog} from 'components/pages/projects'

import { requireAuth } from 'services/authService';

export default (store) => {
  return [
    <Route path="/" component={App} onEnter={requireAuth(store)}>
      <IndexRedirect to="/projects" />
      <Route path="projects" component={ProjectList}>
        <Route path=":_id" component={ProjectFormDialog} />
        <Route path=":_id/users" component={ProjectUserDialog} />
      </Route>
      <Route path="users" component={UserList}>
        <Route path=":_id" component={UserFormDialog} />
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
