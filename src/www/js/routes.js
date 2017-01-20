//@flow
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import AuthService from '../../utils/AuthService';

import App from './components/App.js';
import Home from './components/Home.js';
import Dashboard from './components/Dashboard.js';
import Admin from './components/Admin.js';
import ViewerQueries from './queries/ViewerQueries';

const auth = new AuthService();

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' });
  }
};

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="home" component={Home}/>
    <Route path="dashboard" component={Dashboard} queries={ViewerQueries} onEnter={requireAuth}/>
    <Route path="admin" component={Admin} queries={ViewerQueries} onEnter={requireAuth} />
  </Route>
);
