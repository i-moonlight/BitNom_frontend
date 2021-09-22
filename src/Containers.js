import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { ApolloLink, Observable } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { makeStyles } from '@material-ui/core';
import { createUploadLink } from 'apollo-upload-client';
import { print } from 'graphql';
import { createClient } from 'graphql-ws';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useThemeDetector } from './hooks/useThemeDetector';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import RequireVerification from './pages/auth/RequireVerification';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import UpdateInfo from './pages/auth/UpdateInfo';
import VerifyEmail from './pages/auth/VerifyEmail';
import BnChat from './pages/dasboard/bn_chat/BNChat';
import BnConnect from './pages/dasboard/bn_connect/BnConnect';
import BnServices from './pages/dasboard/bn_services/BnServices';
import SavedItems from './pages/dasboard/bookmarks/SavedItems';
import Events from './pages/dasboard/events/Events';
import Notifications from './pages/dasboard/notifications/Notifications';
import Connections from './pages/dasboard/people/Connections';
import People from './pages/dasboard/people/People';
import Profile from './pages/dasboard/profile/Profile';
import ProfileView from './pages/dasboard/profile/ProfileView';
import Posts from './pages/dasboard/profile/UserPosts';
import Cookie from './pages/welcome/cookie/Cookie';
import Disclaimer from './pages/welcome/disclaimer/Disclaimer';
import Faqs from './pages/welcome/faqs/Faqs';
import FeatureRequest from './pages/welcome/feature_request/FeatureRequest';
import Investor from './pages/welcome/investor/Investors';
import Landing from './pages/welcome/landing/Landing';
import Privacy from './pages/welcome/privacy/Privacy';
import RoadMap from './pages/welcome/roadmap/RoadMap';
import Terms from './pages/welcome/terms/Terms';
import { checkSessionTimeOut } from './store/actions/authActions';
import { changeTheme } from './store/actions/themeActions';
import Redirect from './utilities/Redirect';

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
    return new Observable(sink => {
      return this.client.subscribe(
        Object.assign(Object.assign({}, operation), {
          query: print(operation.query),
        }),
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: err => {
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

//  Add REACT_APP_SOCKET_URL=ws://localhost:3000/notifications/graphql to .env
const wsLink = new WebSocketLink({
  url: process.env.REACT_APP_SOCKET_URL + '/notifications/graphql',
});
const profileLink = from([
  errorLink,
  new HttpLink({
    uri: backendUri + '/users/graphql',
    credentials: 'include',
  }),
]);

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

const profileUploadLink = ApolloLink.split(
  operation => operation.getContext().clientName === 'users',
  profileLink,
  uploadLink
);

const btnMainLink = ApolloLink.split(
  operation => operation.getContext().clientName === 'notifications',
  notificationsLink,
  profileUploadLink
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  btnMainLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const AppContainers = () => {
  const isDarkTheme = useThemeDetector();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(checkSessionTimeOut());

    isDarkTheme
      ? dispatch(changeTheme('dark'))
      : dispatch(changeTheme('light'));
  }, [isDarkTheme]);

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            {/* Landing */} <Route exact component={Landing} path='/' />
            <Route exact component={Faqs} path='/faqs' />
            <Route exact component={Terms} path='/terms' />
            <Route exact component={Privacy} path='/privacy_policy' />
            <Route exact component={Cookie} path='/cookie_policy' />
            <Route exact component={Disclaimer} path='/disclaimer' />
            <Route exact component={FeatureRequest} path='/feature_request' />
            <Route exact component={RoadMap} path='/roadmap' />
            <Route exact component={Redirect} path='/redirect' />
            {/* Investor  */}
            <Route exact component={Investor} path='/investors' /> {/* Auth */}
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
            {/* Dashboard */}
            <Route exact component={BnConnect} path='/dashboard' />
            <Route exact component={BnServices} path='/dashboard/services' />
            <Route exact component={BnChat} path='/dashboard/chat' />
            <Route exact component={Events} path='/dashboard/events' />
            <Route exact component={People} path='/dashboard/people' />
            <Route
              exact
              component={Connections}
              path='/dashboard/profile/connections'
            />
            <Route exact component={Posts} path='/dashboard/profile/posts' />
            <Route exact component={Profile} path='/dashboard/profile' />
            <Route
              exact
              component={SavedItems}
              path='/dashboard/profile/bookmarks'
            />
            <Route
              exact
              component={Notifications}
              path='/dashboard/notifications'
            />
            <Route exact component={ProfileView} path='/users/:id' />
          </Switch>
          {/* <Route component={NotFound} path='*' /> */}
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
  },
}));
