import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CircularProgress, Grid, useMediaQuery } from '@mui/material';
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
import Accepted from './accepted';
import Archived from './archived';
import Invites from './invites';
import Pinned from './pinned';
import SearchedChats from './SearchedChats';

function Chats({ onSetChatMobile }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const chats = state.chats.chats
        .filter((chat) => chat.currentUser.archived == false)
        .sort((a, b) => b.lastMessage.date - a.lastMessage.date);
    const invites = state.chats.invites.filter(
        (chat) => chat.status !== 'rejected'
    );
    const archived = state.chats.archived;
    const pinned = state.chats.pinnedChats;
    const searchedChats = state.chats.searchedChats;
    const activeChatId = state?.chats?.current_chat?._id;

    const mdDown = useMediaQuery('(max-width:1200px)');

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
        const current_chat = state.chats.current_chat;
        mdDown && onSetChatMobile();
        if (current_chat?._id !== chat?._id) {
            dispatch(setCurrentChat(chat));
        }
        if (chat?.status == 'accepted') {
            onResetUnreadCount(chat?._id);
            dispatch(resetTotalCount());
            handleResetCount(chat?._id);
        }
    };

    return (
        <div style={{ overflowY: 'auto', height: '100%' }}>
            {searchedChats?.length > 0 ? (
                <div>
                    {searchedChats && searchedChats?.length > 0 && (
                        <SearchedChats
                            activeChatId={activeChatId}
                            openChat={openChat}
                            searchedChats={searchedChats}
                        />
                    )}
                </div>
            ) : (
                <div>
                    {invites && invites?.length > 0 && (
                        <Invites
                            activeChatId={activeChatId}
                            openChat={openChat}
                            invites={invites}
                            loading={invitesLoading}
                        />
                    )}

                    {pinned && pinned?.length > 0 && (
                        <Pinned
                            openChat={openChat}
                            pinned={pinned}
                            loading={pinnedLoading}
                            activeChatId={activeChatId}
                        />
                    )}
                    {chats && chats?.length > 0 && (
                        <Accepted
                            accepted={chats}
                            openChat={openChat}
                            activeChatId={activeChatId}
                        />
                    )}
                    {archived && archived?.length > 0 && (
                        <Archived
                            archived={archived}
                            loading={archivedLoading}
                            openChat={openChat}
                            activeChatId={activeChatId}
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
