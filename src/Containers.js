import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { makeStyles } from '@material-ui/core';
import { createUploadLink } from 'apollo-upload-client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import RequireVerification from './pages/auth/RequireVerification';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import UpdateInfo from './pages/auth/UpdateInfo';
import VerifyEmail from './pages/auth/VerifyEmail';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import BnServices from './pages/dasboard/bn_services/BnServices';
import Events from './pages/dasboard/events/Events';
import Notifications from './pages/dasboard/notifications/Notifications';
import People from './pages/dasboard/People';
import Profile from './pages/dasboard/profile/Profile';

//GraphQL and Apollo Client Setup
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }, index) => {
      console.log(`Graphql error[${index}] ${message}`);
      console.log(
        `Above graphql error[${index}] ocurred at location ${location} and path ${path}`
      );
    });
  }
  if (networkError) {
    console.log(`Graphql network error ${networkError}`);
  }
});

const authLink = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:3000/users/graphql',
    credentials: 'include',
  }),
]);

// const socialLink = from([
//   errorLink,
//   new HttpLink({
//     uri: 'http://localhost:3000/bn-social/graphql',
//     // uri: "http://localhost:3000/files/graphql",
//     credentials: 'include',
//   }),
// ]);

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/bn-social/graphql',
  credentials: 'include',
  headers: {
    'keep-alive': 'true',
  },
});

const uploadApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

const usersApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink,
  credentials: 'include',
});

// const socialApolloClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: socialLink,
//   credentials: 'include',
// });

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));

export const AppContainers = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ApolloProvider client={usersApolloClient}>
          <Switch>
            <Route exact component={RedirectToDash} path='/' />
            <Route exact component={Login} path='/auth/login' />
            <Route exact component={Signup} path='/auth/signup' />
            <Route
              exact
              component={UpdateInfo}
              path='/auth/update_info_register'
            />
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
        </ApolloProvider>
        <ApolloProvider client={uploadApolloClient}>
          <Switch>
            <Route exact component={BnConnect} path='/dashboard' />
            <Route exact component={BnServices} path='/dashboard/services' />
            <Route exact component={Events} path='/dashboard/events' />
            <Route
              exact
              component={Notifications}
              path='/dashboard/notifications'
            />
            <Route exact component={People} path='/dashboard/people' />
            <Route exact component={Profile} path='/dashboard/profile' />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};

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
