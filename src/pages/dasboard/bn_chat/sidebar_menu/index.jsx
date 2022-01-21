import { useQuery, useSubscription, useMutation } from '@apollo/client';
import {
    CircularProgress,
    Grid,
    List,
    ListSubheader,
    useMediaQuery,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addChatDialogues,
    addPinnedChat,
    addToChatDialogues,
    addToInvites,
    clearCurrentChat,
    removeFromInvites,
    resetTotalCount,
    setArchivedChats,
    setChatInvites,
    setCurrentChat,
    updateDialogue,
} from '../../../../store/actions/chatActions';
import {
    CHAT_ACCEPTED,
    GET_DIALOGUES,
    NEW_CHAT_ADDED,
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
    const chats = state.chats.chats
        .filter((chat) => chat.status !== 'rejected')
        .sort((a, b) => a.lastMessage.date - b.lastMessage.date);
    const invites = state.chats.invites.filter(
        (chat) => chat.status !== 'rejected'
    );
    const archived = state.chats.archived;
    const pinned = state.chats.pinnedChats;
    const searchedChats = state.chats.searchedChats;
    const activeChatId = state?.chats?.current_chat?._id;

    const xsDown = useMediaQuery('(max-width:1200px)');

    const { data, loading } = useQuery(GET_DIALOGUES, {
        variables: {
            status: 'accepted',
        },
        context: { clientName: 'chat' },
        fetchPolicy: 'network-only',
    });

    const { data: chatInvites, loading: invitesLoading } = useQuery(
        GET_DIALOGUES,
        {
            variables: {
                status: 'new',
            },
            context: { clientName: 'chat' },
            fetchPolicy: 'network-only',
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
            fetchPolicy: 'network-only',
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
            fetchPolicy: 'network-only',
        }
    );
    const [unreadCountReset, { data: readCountData }] =
        useMutation(RESET_UNREAD_COUNT);

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

    const onResetUnreadCount = async (_id) => {
        await unreadCountReset({
            variables: {
                _id: _id,
            },
            context: { clientName: 'chat' },
        });
    };

    useEffect(() => {
        if (readCountData?.Dialogue?.resetUnreadCount) {
            dispatch(updateDialogue(readCountData?.Dialogue?.resetUnreadCount));
        }
    }, [dispatch, readCountData?.Dialogue?.resetUnreadCount]);
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

    const handleResetCount = (_id) => {
        onResetUnreadCount(_id);
    };

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat));
        xsDown && onSetChatMobile();
        onResetUnreadCount(chat?._id);
        dispatch(resetTotalCount());
    };

    return (
        <div style={{ overflowY: 'auto', height: '65vh' }}>
            {searchedChats?.length > 0 ? (
                <div>
                    {searchedChats && searchedChats?.length > 0 && (
                        <SearchedChats searchedChats={searchedChats} />
                    )}
                </div>
            ) : (
                <div>
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
        </div>
    );
}

export default Chats;
