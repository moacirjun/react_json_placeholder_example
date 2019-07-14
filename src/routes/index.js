import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Users from '../pages/users';
import Posts from '../pages/posts';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Users} />
      <Route path="/users/:userId/posts" component={Posts} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
