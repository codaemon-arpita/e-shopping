/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux'
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import history from './history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';
import HomePage from './containers/HomePage';
import Login from './containers/Login';


import IndexReducer from './index-reducers'
import IndexSagas from './index-sagas'

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */


const sagaMiddleware = createSagaMiddleware()
const envRootPath = process.env.NODE_ENV === 'production' ? "/app" : "/"

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/* eslint-enable */


const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)
sagaMiddleware.run(IndexSagas);
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter basename={envRootPath}>
        <Router history={history}>
          <App store={store}>
            <Switch key="switching">
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/login" store={store} component={Login}/>
            </Switch>
          </App>
        </Router>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  MOUNT_NODE,
);
