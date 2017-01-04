import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './containers/App';
import UserInfoContainer from './containers/UserInfoContainer';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={UserInfoContainer} />
    </Route>
  </Router>
);
