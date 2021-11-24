import {
    ApolloClient,
    from,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client/';
import { ApolloLink, Observable } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { makeStyles } from '@mui/styles';
import { createUploadLink } from 'apollo-upload-client';
import { print } from 'graphql';
import { createClient } from 'graphql-ws';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import { checkSessionTimeOut } from './store/actions/authActions';
import { changeTheme } from './store/actions/themeActions';
import LightThemeStyles from './utilities/LightThemeStyles';

//GraphQL and Apollo Client Setup
const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }, index) => {
            // eslint-disable-next-line no-console
            console.log(`Graphql error[${index}] ${message}`);
            // eslint-disable-next-line no-console
            console.log(
                `Above graphql error[${index}] ocurred at location ${location} and path ${path}`
            );
        });
    }
    if (networkError) {
        // eslint-disable-next-line no-console
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
                                    `Socket closed with event ${err?.code} ${
                                        err?.reason || ''
                                    }`
                                )
                            );
                        }
                        return sink.error(
                            new Error(
                                // eslint-disable-next-line no-console
                                console.log('sink.error: ', err)
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

/* const profileLink = from([
    errorLink,
    new HttpLink({
        uri: backendUri + '/users/graphql',
        credentials: 'include',
    }),
]); */

const profileLink = createUploadLink({
    uri: backendUri + '/users/graphql',
    credentials: 'include',
    headers: {
        'keep-alive': 'true',
    },
});

const notificationsLink = from([
    errorLink,
    new HttpLink({
        uri: backendUri + '/notifications/graphql',
        credentials: 'include',
    }),
]);

const chatUpload = createUploadLink({
    uri: backendUri + '/chat/graphql',
    credentials: 'include',
    headers: {
        'keep-alive': 'true',
    },
});
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

const chatProfileUploadLink = ApolloLink.split(
    (operation) => operation.getContext().clientName === 'chat',
    chatUpload,
    profileUploadLink
);

const btnMainLink = ApolloLink.split(
    (operation) => operation.getContext().clientName === 'notifications',
    notificationsLink,
    chatProfileUploadLink
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
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    Users: {
                        merge: true,
                    },
                    Posts: {
                        merge: true,
                    },
                    Comments: {
                        merge: true,
                    },
                    Events: {
                        merge: true,
                    },
                    Dialogue: {
                        merge: true,
                    },
                },
            },
        },
    }),
});

export default function AppContainers() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    const palette = state.theme.palette;

    useEffect(() => {
        const OneSignal = window.OneSignal || [];
        dispatch(checkSessionTimeOut());

        palette == 'dark'
            ? dispatch(changeTheme('dark'))
            : dispatch(changeTheme('light'));

        OneSignal.push(() => {
            OneSignal.init({
                appId: '97869740-c9fd-42b4-80de-bfd368eb1715',
            });
            OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                if (isEnabled) {
                    var externalUserId = user._id;
                    OneSignal.setExternalUserId(externalUserId);
                } else {
                    // Push notifications not enabled
                }
            });
        });
    }, [dispatch, palette, user._id]);

    return (
        <div className={classes.root}>
            {/* {palette === 'dark' ? (
                <DarkThemeStyles>
                    <Routes apolloClient={client} />
                </DarkThemeStyles>
            ) : (
                <LightThemeStyles>
                    <Routes apolloClient={client} />
                </LightThemeStyles>
            )} */}

            <LightThemeStyles>
                <Routes apolloClient={client} />
            </LightThemeStyles>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
}));
