import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import HelloWorld from './components/HelloWorld'
import MaterialDemo from './components/MaterialDemo'
import NotFound from './components/NotFound'
import './index.css';

injectTapEventPlugin();

const Root = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HelloWorld} />
        <Route path="material" component={MaterialDemo} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </MuiThemeProvider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
