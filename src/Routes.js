import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import Events from './pages/dasboard/Events';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={RedirectToDash} path='/' />
        <Route exact component={BnConnect} path='/dashboard' />
        <Route exact component={Events} path='/dashboard/events' />

        <Route exact component={Login} path='/auth/login' />
        <Route exact component={Signup} path='/auth/signup' />
        <Route exact component={Signup} path='/auth/request_reset_link' />
        <Route exact component={Signup} path='/auth/create_new_password' />
      </Switch>
    </BrowserRouter>
  );
}

function RedirectToDash() {
  const history = useHistory();
  history.push('/dashboard');
  return null;
}
