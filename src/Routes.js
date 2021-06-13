import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import BnConnect from './pages/BnConnect';
import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={RedirectToDash} path='/' />
        <Route exact component={BnConnect} path='/dashboard' />
        <Route exact component={Events} path='/dashboard/events' />
        <Route exact component={Login} path='/auth/login' />
        <Route exact component={Signup} path='/auth/signup' />
      </Switch>
    </BrowserRouter>
  );
}

function RedirectToDash() {
  const history = useHistory();
  history.push('/dashboard');
  return null;
}
