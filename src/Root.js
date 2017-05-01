import React from 'react'
import { Router, browserHistory } from 'react-router'
import './index.css'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import rtStatic from './assets/rtoolbox/theme.js'
import './assets/rtoolbox/theme.css'

import makeRoutes from './routes'
import { Provider } from 'react-redux'
import store from './store'

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={rtStatic}>
      <Router history={browserHistory} routes={makeRoutes(store)} />
    </ThemeProvider>
  </Provider>
)

export default Root
