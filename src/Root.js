import React from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import { Provider } from 'react-redux'
import store from './store'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import rtStatic from './assets/rtoolbox/theme.js'
import './assets/rtoolbox/theme.css'

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={rtStatic}>
      <Router history={browserHistory} routes={routes} />
    </ThemeProvider>
  </Provider>
)

export default Root