import { useQuery, useSubscription } from '@apollo/client';
import {
    CircularProgress,
    Grid,
    List,
    ListSubheader,
    useMediaQuery,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addChatDialogues,
    addToInvites,
    setArchivedChats,
    setChatInvites,
    addToChatDialogues,
    clearCurrentChat,
    removeFromInvites,
    setCurrentChat,
    addPinnedChat,
    addToPinnedChats,
    addToArchivedChats,
} from '../../../../store/actions/chatActions';
import {
    GET_DIALOGUES,
    NEW_CHAT_ADDED,
    CHAT_ACCEPTED,
    PIN_CHAT_SUB,
    ARCHIVE_CHAT_SUB,
} from '../graphql/queries';
import Archived from './archived';
import ChatItem from './chat';
import Invites from './invites';
import Pinned from './pinned';

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

    const { data: pinnedData, laoding: pinnedLoading } = useQuery(
        GET_DIALOGUES,
        {
            variables: {
                status: 'accepted',
                pinned: true,
            },
            context: { clientName: 'chat' },
        }
    );

    const { data: newChatData } = useSubscription(NEW_CHAT_ADDED, {
        variables: {
            _id: user._id,
        },
    });

    const { data: chatAccepted } = useSubscription(CHAT_ACCEPTED, {
        variables: {
            _id: user._id,
        },
    });

    const { data: pinnedChatData } = useSubscription(PIN_CHAT_SUB, {
        variables: {
            _id: user._id,
        },
    });

    const { data: archivedChatData } = useSubscription(ARCHIVE_CHAT_SUB, {
        variables: {
            _id: user._id,
        },
    });
    useEffect(() => {
        if (chatAccepted?.chatAccepted) {
            dispatch(clearCurrentChat());
            dispatch(addToChatDialogues(chatAccepted?.chatAccepted));
            dispatch(setCurrentChat(chatAccepted?.chatAccepted));
            dispatch(removeFromInvites(chatAccepted?.chatAccepted));
        }
    }, [chatAccepted?.chatAccepted, dispatch]);

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

    useEffect(() => {
        if (pinnedData?.Dialogue?.get) {
            dispatch(addPinnedChat(pinnedData?.Dialogue?.get));
        }
    }, [pinnedData?.Dialogue?.get, dispatch]);

    useEffect(() => {
        if (pinnedChatData?.pinChat) {
            dispatch(addToPinnedChats(pinnedChatData?.pinChat));
        }
    }, [dispatch, pinnedChatData?.pinChat]);

    useEffect(() => {
        if (archivedChatData?.archivedChat) {
            dispatch(addToArchivedChats(archivedChatData?.archivedChat));
        }
    }, [dispatch, archivedChatData?.archivedChat]);
    const chats = state.chats.chats;
    const invites = state.chats.invites;
    const archived = state.chats.archived;
    const pinned = state.chats.pinnedChats;
    const activeChatId = state.chats.current_chat._id;
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
                {invites && invites?.length > 0 && (
                    <Invites invites={invites} loading={invitesLoading} />
                )}

                {pinned && pinned?.length > 0 && (
                    <Pinned pinned={pinned} loading={pinnedLoading} />
                )}
                {chats && chats?.length > 0 && (
                    <List
                        component="nav"
                        subheader={
                            <ListSubheader component="div">Chats</ListSubheader>
                        }
                    >
                        {chats?.map((chat) => (
                            <ChatItem
                                key={chat._id}
                                onClick={() => openChat(chat)}
                                chat={chat}
                                activeChatId={activeChatId}
                            />
                        ))}
                    </List>
                )}
                {archived && archived?.length > 0 && (
                    <Archived archived={archived} loading={archivedLoading} />
                )}
                {loading && !chats?.length > 0 && (
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
