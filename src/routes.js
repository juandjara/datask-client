import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App';
import Projects from './components/Projects'
import NotFound from './components/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Projects} />
    <Route path="*" component={NotFound} />
  </Route>
)