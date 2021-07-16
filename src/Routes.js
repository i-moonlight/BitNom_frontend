import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import RequireVerification from './pages/auth/RequireVerification';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import Events from './pages/dasboard/Events';
import Notifications from './pages/dasboard/Notifications';
import People from './pages/dasboard/People';
import { useSelector } from 'react-redux';
import VerifyEmail from './pages/auth/VerifyEmail';
import UpdateInfo from './pages/auth/UpdateInfo';

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
        <Route exact component={UpdateInfo} path='/auth/update_info_register' />
        <Route
          exact
          component={RequireVerification}
          path='/auth/require_verify'
        />
        <Route exact component={VerifyEmail} path='/auth/verify_email' />
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
  const state = useSelector(state => state);
  const user = state.auth.user;

  useEffect(() => {
    if (!user?.email?.verified) {
      history.push('/auth/require_verify');
    } else {
      user?.email?.verified && !user?.displayName
        ? history.push('/auth/update_info_register')
        : history.push('/dashboard');
    }
  }, []);

  return null;
}
