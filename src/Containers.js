import {
    ApolloClient,
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
import { useThemeDetector } from './hooks/useThemeDetector';
import Routes from './Routes';
import { checkSessionTimeOut } from './store/actions/authActions';
import { changeTheme } from './store/actions/themeActions';

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
                                    `Socket closed with event ${err.code} ${
                                        err.reason || ''
                                    }`
                                )
                            );
                        }
                        return sink.error(
                            new Error(
                                err.map(({ message }) => message).join(', ')
                            )
                        );
                    },
                }
            );
        });
    }
}

//  Add REACT_APP_SOCKET_URL=ws://localhost:3000/notifications/graphql to .env
const wsLink = new WebSocketLink({
    url: process.env.REACT_APP_SOCKET_URL,
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
    (operation) => operation.getContext().clientName === 'users',
    profileLink,
    uploadLink
);

const btnMainLink = ApolloLink.split(
    (operation) => operation.getContext().clientName === 'notifications',
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

export default function AppContainers() {
    const isDarkTheme = useThemeDetector();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(checkSessionTimeOut());

        isDarkTheme
            ? dispatch(changeTheme('dark'))
            : dispatch(changeTheme('light'));
    }, [dispatch, isDarkTheme]);

    return (
        <div className={classes.root}>
            <Routes apolloClient={client} />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
}));
