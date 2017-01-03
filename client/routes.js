import React from 'react';
import App from './containers/App';
import UserInfoContainer from './containers/UserInfoContainer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'isomorphic-fetch';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={UserInfoContainer} />
    </Route>
  </Router>
);