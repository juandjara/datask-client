import React from 'react'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import store from './store'

injectTapEventPlugin()

const Root = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>
)

export default Root