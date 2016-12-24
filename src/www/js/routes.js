//@flow
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

import App from './components/App.js';
import Dashboard from './components/Dashboard.js';
import Admin from './components/Admin.js';
import ViewerQueries from './queries/ViewerQueries';

export default (
  <Route path="/" component={App} queries={ViewerQueries}>
    <IndexRoute component={Dashboard} queries={ViewerQueries} />
    <Route path="admin" component={Admin} queries={ViewerQueries} />
  </Route>
);
