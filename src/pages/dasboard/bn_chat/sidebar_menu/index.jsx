import { useQuery, useSubscription, useMutation } from '@apollo/client';
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
    addPinnedChat,
    addToArchivedChats,
    addToChatDialogues,
    addToInvites,
    addToPinnedChats,
    clearCurrentChat,
    removeFromInvites,
    resetTotalCount,
    setArchivedChats,
    setChatInvites,
    setCurrentChat,
} from '../../../../store/actions/chatActions';
import {
    ARCHIVE_CHAT_SUB,
    CHAT_ACCEPTED,
    GET_DIALOGUES,
    NEW_CHAT_ADDED,
    PIN_CHAT_SUB,
    RESET_UNREAD_COUNT,
} from '../graphql/queries';
import Archived from './archived';
import ChatItem from './chat';
import Invites from './invites';
import Pinned from './pinned';
import SearchedChats from './SearchedChats';

function Chats({ onSetChatMobile }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const chats = state.chats.chats;
    const invites = state.chats.invites;
    const archived = state.chats.archived;
    const pinned = state.chats.pinnedChats;
    const searchedChats = state.chats.searchedChats;
    const activeChatId = state?.chats?.current_chat?._id;

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
    const [unreadCountReset] = useMutation(RESET_UNREAD_COUNT);

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

    const onResetUnreadCount = async (_id) => {
        await unreadCountReset({
            variables: {
                _id: _id,
            },
            context: { clientName: 'chat' },
        });
    };
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
        if (pinnedChatData?.pinChat?.currentUser?.info?._id === user._id) {
            dispatch(addToPinnedChats(pinnedChatData?.pinChat));
            dispatch(setCurrentChat(pinnedChatData?.pinChat));
        }
    }, [dispatch, pinnedChatData, user]);

    useEffect(() => {
        if (
            archivedChatData?.archiveChat?.currentUser?.info?._id === user._id
        ) {
            dispatch(addToArchivedChats(archivedChatData?.archiveChat));
            dispatch(setCurrentChat(archivedChatData?.archiveChat));
        }
    }, [dispatch, archivedChatData, user]);
    const handleResetCount = (_id) => {
        onResetUnreadCount(_id);
    };

    const openChat = (chat) => {
        const current_chat = state.chats.current_chat;

        if (current_chat._id !== chat._id) {
            dispatch(setCurrentChat(chat));
            xsDown && onSetChatMobile();
        }
        onResetUnreadCount(chat._id);
        dispatch(resetTotalCount());
    };

    return (
        <Fragment>
            {searchedChats?.length > 0 ? (
                <div style={{ overflow: 'auto' }}>
                    {searchedChats && searchedChats?.length > 0 && (
                        <SearchedChats searchedChats={searchedChats} />
                    )}
                </div>
            ) : (
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
                                <ListSubheader component="div">
                                    Chats
                                </ListSubheader>
                            }
                        >
                            {chats?.map((chat) => (
                                <ChatItem
                                    key={chat._id}
                                    onClick={() => {
                                        openChat(chat),
                                            handleResetCount(chat._id);
                                    }}
                                    chat={chat}
                                    activeChatId={activeChatId}
                                />
                            ))}
                        </List>
                    )}
                    {archived && archived?.length > 0 && (
                        <Archived
                            archived={archived}
                            loading={archivedLoading}
                        />
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
            )}
        </Fragment>
    );
}

export default Chats;
