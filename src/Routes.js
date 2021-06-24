import React from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import Events from './pages/dasboard/Events';
import Notifications from './pages/dasboard/Notifications';
import People from './pages/dasboard/People';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={RedirectToDash} path='/' />
        <Route exact component={BnConnect} path='/dashboard' />
        <Route exact component={Events} path='/dashboard/events' />
        <Route
          exact
          component={Notifications}
          path='/dashboard/notifications'
        />
        <Route exact component={People} path='/dashboard/people' />

        <Route exact component={Login} path='/auth/login' />
        <Route exact component={Signup} path='/auth/signup' />
        <Route
          exact
          component={ResetPassword}
          path='/auth/request_reset_link'
        />
        <Route
          exact
          component={CreatePassword}
          path='/auth/password_reset/:key'
        />
      </Switch>
    </BrowserRouter>
  );
}

function RedirectToDash() {
  const history = useHistory();
  history.push('/dashboard');
  return null;
}
