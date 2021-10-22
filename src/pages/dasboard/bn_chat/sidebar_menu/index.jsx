import { useQuery, useSubscription } from '@apollo/client';
import {
    CircularProgress,
    Grid,
    List,
    ListSubheader,
    useMediaQuery,
} from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addChatDialogues,
    addToInvites,
    setArchivedChats,
    setChatInvites,
    setCurrentChat,
} from '../../../../store/actions/chatActions';
import { GET_DIALOGUES, NEW_CHAT_ADDED } from '../graphql/queries';
import Archived from './archived';
import ChatItem from './chat';
import Invites from './invites';

function Chats({ onSetChatMobile }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const xsDown = useMediaQuery('(max-width:599px)');

    const { data, loading } = useQuery(GET_DIALOGUES, {
        variables: {
            status: 'accepted',
        },
        context: { clientName: 'chat' },
    });

    const { data: chatInvites, loading: invitesLoading } = useQuery(
        GET_DIALOGUES,
        {
            variables: {
                status: 'new',
            },
            context: { clientName: 'chat' },
        }
    );

    const { data: archivedData, laoding: archivedLoading } = useQuery(
        GET_DIALOGUES,
        {
            variables: {
                status: 'accepted',
                archived: true,
            },
            context: { clientName: 'chat' },
        }
    );

    const { data: newChatData } = useSubscription(NEW_CHAT_ADDED, {
        variables: {
            _id: user._id,
        },
    });

    useEffect(() => {
        if (newChatData?.newChat) {
            dispatch(addToInvites(newChatData?.newChat));
        }
    }, [dispatch, newChatData?.newChat]);

    useEffect(() => {
        const chat_invites =
            chatInvites && chatInvites.Dialogue?.get
                ? chatInvites.Dialogue?.get
                : null;
        if (chat_invites) {
            dispatch(setChatInvites(chat_invites));
        }
    }, [chatInvites, dispatch]);

    useEffect(() => {
        const AcceptedChats =
            data && data.Dialogue?.get ? data.Dialogue?.get : null;
        if (AcceptedChats) {
            dispatch(addChatDialogues(AcceptedChats));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (archivedData?.Dialogue?.get) {
            dispatch(setArchivedChats(archivedData?.Dialogue?.get));
        }
    }, [archivedData?.Dialogue?.get, dispatch]);

    const chats = state.chats.chats;
    const invites = state.chats.invites;
    const archived = state.chats.archived;

    const openChat = (chat) => {
        const current_chat = state.chats.current_chat;

        if (current_chat._id !== chat._id) {
            dispatch(setCurrentChat(chat));
            xsDown && onSetChatMobile();
        }
    };

    return (
        <Fragment>
            <div style={{ overflow: 'auto' }}>
                {invites && invites.length > 0 && (
                    <Invites invites={invites} loading={invitesLoading} />
                )}
                {chats && chats.length > 0 && (
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div">Chats</ListSubheader>
                        }
                    >
                        {chats.map((chat) => (
                            <ChatItem
                                key={chat._id}
                                onClick={() => openChat(chat)}
                                chat={chat}
                            />
                        ))}
                    </List>
                )}
                {archived && archived.length > 0 && (
                    <Archived archived={archived} loading={archivedLoading} />
                )}
                {loading && !chats.length > 0 && (
                    <Grid
                        alignItems="center"
                        justifyContent="center"
                        container
                        item
                        direction="column"
                        style={{ width: '100%' }}
                    >
                        <CircularProgress />
                    </Grid>
                )}
            </div>
        </Fragment>
    );
}

export default Chats;
