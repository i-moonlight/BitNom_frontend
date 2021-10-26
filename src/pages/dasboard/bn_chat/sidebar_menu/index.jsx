import { useQuery, useSubscription } from '@apollo/client';
import { CircularProgress, Grid, List, ListSubheader } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GET_DIALOGUES, NEW_CHAT_ADDED } from '../graphql/queries';
import ChatItem from './chat';
import { useStyles } from '../utils/styles';
import {
    addChatDialogues,
    setCurrentChat,
    setChatInvites,
    addToInvites,
    setArchivedChats,
} from '../../../../store/actions/chatActions';
import Invites from './invites';
import Archived from './archived';

function Chats() {
    const state = useSelector((st) => st);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = state.auth.user;
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
        // eslint-disable-next-line
    }, [newChatData?.newChat]);

    useEffect(() => {
        const chat_invites =
            chatInvites && chatInvites.Dialogue?.get
                ? chatInvites.Dialogue?.get
                : null;
        if (chat_invites) {
            dispatch(setChatInvites(chat_invites));
        }
        return;
        // eslint-disable-next-line
    }, [chatInvites]);

    useEffect(() => {
        const AcceptedChats =
            data && data.Dialogue?.get ? data.Dialogue?.get : null;
        if (AcceptedChats) {
            dispatch(addChatDialogues(AcceptedChats));
        }
        return;
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        if (archivedData?.Dialogue?.get) {
            dispatch(setArchivedChats(archivedData?.Dialogue?.get));
        }
        // eslint-disable-next-line
    }, [archivedData?.Dialogue?.get]);

    const chats = state.chats.chats;
    const invites = state.chats.invites;
    const archived = state.chats.archived;
    const unreadCount = state.chats.unreadCount;
    const activeChatId = state.chats.current_chat._id;
    const openChat = (chat) => {
        const current_chat = state.chats.current_chat;
        if (current_chat._id !== chat._id) {
            dispatch(setCurrentChat(chat));
            //reset count later
        }
        return;
    };

    console.log('UNREADCOUNT', unreadCount);
    return (
        <Fragment>
            <div style={{ overflow: 'auto' }}>
                {invites && invites.length > 0 && (
                    <Invites invites={invites} loading={invitesLoading} />
                )}
                {chats && chats.length > 0 && (
                    <List
                        component="nav"
                        className={classes.chatList}
                        subheader={
                            <ListSubheader component="div">Chats</ListSubheader>
                        }
                    >
                        {chats.map((chat) => (
                            <ChatItem
                                key={chat._id}
                                onClick={() => openChat(chat)}
                                chat={chat}
                                activeChatId={activeChatId}
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
