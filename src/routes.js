import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/App';
import HelloWorld from './components/HelloWorld'
import NotFound from './components/NotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HelloWorld} />
    <Route path="*" component={NotFound} />
  </Route>
)