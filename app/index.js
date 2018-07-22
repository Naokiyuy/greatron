import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect,
  IndexRoute,
  Redirect,
  applyRouterMiddleware
} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import 'intl';
import queryString from 'query-string';
import {useScroll} from 'react-router-scroll';
import App from './App.js';
import configureStore from './utils/redux/configureStore';

import './assets/styles';
import DynamicImport from "./misc/DynamicImport";

const queryStr = location.search;
if (queryStr != '') {
  const query = require('url').parse(queryStr, true).query;
  if (query.reactRoute) {
    const reactRoute = decodeURIComponent(query.reactRoute);
    browserHistory.push(reactRoute);
  }
}

let store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const authenticate = (nextState, replace) => {
  if (localStorage) {
    const isLogin = localStorage.getItem('isLogged');

    if (isLogin !== 'true') {
      const location = nextState.location;
      let nextPath = nextState.location.pathname;
      if (location.search) {
        nextPath += '?' + queryString.stringify(location.query);
      }
      replace({
        pathname: '/login',
        query: {nextPath}
      });
    }
  }
};

const dynamicImport = (props, path) => (
  <DynamicImport load={() => import(`${path}`)}>
    {(Component) => loadComponent(Component, props)}
  </DynamicImport>
);
const loadComponent = (Component, props) => Component === null ? <p style={{height: '100vh'}}>Loading...</p> : <Component {...props} />;

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route component={App}>
        <Route name="" path="/" component={(props) => dynamicImport(props, './frontend/home/Home')}>
          <IndexRoute component={(props) => dynamicImport(props, './frontend/home/IndexPage')}/>
          <Route name="Index" path="/index" component={(props) => dynamicImport(props, './frontend/home/IndexPage')}/>
          <Route name="Products list" path="/products" component={(props) => dynamicImport(props, './frontend/products/Products')}/>
          <Route name="About Us" path="/aboutus" component={(props) => dynamicImport(props, './frontend/aboutus/AboutUs')}/>
          <Route name="Contact Us" path="/contactus" component={(props) => dynamicImport(props, './frontend/contactus/ContactUs')}/>
        </Route>
        <Route name="" path="/backend" component={(props) => dynamicImport(props, './backend/home/Home')}>

        </Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('root')
);
