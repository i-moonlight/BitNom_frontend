import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { ApolloLink, Observable } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
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
import Landing from './pages/landing/Landing';

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
class WebSocketLink extends ApolloLink {
  constructor(options) {
    super();
    this.client = createClient(options);
  }
  request(operation) {
    return new Observable((sink) => {
      return this.client.subscribe(
        Object.assign(Object.assign({}, operation), {
          query: print(operation.query),
        }),
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              return sink.error(err);
            }
            if (err instanceof CloseEvent) {
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`
                )
              );
            }
            return sink.error(
              new Error(err.map(({ message }) => message).join(', '))
            );
          },
        }
      );
    });
  }
}
const wsLink = new WebSocketLink({
  url: 'ws://localhost:3000/notifications/graphql',
});

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
const notificationsLink = from([
  errorLink,
  new HttpLink({
    uri: backendUri + '/notifications/graphql',
    credentials: 'include',
  }),
]);
const uploadLink = createUploadLink({
  uri: backendUri + '/bn-social/graphql',
  credentials: 'include',
  headers: {
    'keep-alive': 'true',
  },
});

const usersApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink,
  credentials: 'include',
});

const notificationsApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: notificationsLink,
  credentials: 'include',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink
);

const uploadApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const useStyles = makeStyles((theme) => ({
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
            <Route exact component={People} path='/dashboard/people' />
            <Route exact component={Profile} path='/dashboard/profile' />
            <Route
              exact
              component={SavedItems}
              path='/dashboard/profile/bookmarks'
            />
          </Switch>
        </ApolloProvider>
        <ApolloProvider client={notificationsApolloClient}>
          <Route
            exact
            component={Notifications}
            path='/dashboard/notifications'
          />
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};
