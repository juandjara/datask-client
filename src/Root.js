import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import './index.css'

import rtStatic from './assets/rtoolbox/theme.js'
import './assets/rtoolbox/theme.css'

import makeRoutes from './index.routes'
import store from './index.store'

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={rtStatic}>
      <Router history={browserHistory} routes={makeRoutes(store)} />
    </ThemeProvider>
  </Provider>
)

export default Root
