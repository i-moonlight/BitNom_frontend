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
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
import SavedItems from './pages/dasboard/SavedItems';
import Cookie from './pages/welcome/cookie/Cookie';
import Disclaimer from './pages/welcome/disclaimer/Disclaimer';
import Faqs from './pages/welcome/faqs/Faqs';
import Landing from './pages/welcome/landing/Landing';
import Privacy from './pages/welcome/privacy/Privacy';
import Terms from './pages/welcome/terms/Terms';

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

const backendUri = process.env.REACT_APP_BACKEND_URL;

const authLink = from([
  errorLink,
  new HttpLink({
    uri: backendUri + '/users/graphql',
    credentials: 'include',
  }),
]);

// const socialLink = from([
//   errorLink,
//   new HttpLink({
//     uri: backendUri + '/bn-social/graphql',
//     // uri: "http://localhost:3000/files/graphql",
//     credentials: 'include',
//   }),
// ]);

const uploadLink = createUploadLink({
  uri: backendUri + '/bn-social/graphql',
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
            <Route exact component={Landing} path='/' />
            <Route exact component={Faqs} path='/faqs' />
            <Route exact component={Terms} path='/terms' />
            <Route exact component={Privacy} path='/privacy_policy' />
            <Route exact component={Cookie} path='/cookie_policy' />
            <Route exact component={Disclaimer} path='/disclaimer' />
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
            <Route
              exact
              component={SavedItems}
              path='/dashboard/profile/bookmarks'
            />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};
