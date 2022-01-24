import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { CloseRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListSubheader,
    Tooltip,
    useMediaQuery,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessagesToCurrentChat,
    addPinnedMessage,
    setDialogueMessages,
    updateDialogue,
    updateMessage,
} from '../../../../store/actions/chatActions';
import ChatHeader from '../components/chat_header/chat_header';
import {
    GET_DIALOGUE_MESSAGES,
    MESSAGE_UPDATE_SUB,
    NEW_MESSAGE_SUBSCRIPTION,
    RESET_UNREAD_COUNT,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';
import AwaitResponse from './AwaitResponse';
import Blocked from './blocked';
import InviteView from './InviteView';
import Message from './message';
import NoChatSelected from './NoChatSelected';
import EmptyMessages from './NoMessages';
import PinnedMessages from './PinnedMessages';
import SendMessage from './SendMessage';

export default function Messages({ onExitChatMobile }) {
    const [open, setOpen] = useState(false);
    const [pinOpen, setPinOpen] = useState(false);
    const [replyText, setReplyText] = useState(undefined);
    const [editText, setEditText] = useState(undefined);

    const classes = useStyles();
    const dispatch = useDispatch();
    const endRef = useRef(null);
    const state = useSelector((st) => st);

    const dialogue = state.chats.current_chat;
    const user = state.auth.user;
    const unOrderedMessages = state?.chats?.dialogue_messages;
    const filteredMessages = state?.chats?.searchData;
    const messagePins = state.chats.pinnedMessages;
    const messages = [...unOrderedMessages]?.reverse();
    const xsDown = useMediaQuery('(max-width:1200px)');
    const [getDialogueMessages, { loading, data }] = useLazyQuery(
        GET_DIALOGUE_MESSAGES,
        {
            fetchPolicy: 'network-only',
        }
    );

    const [getPinnedDialogueMessages, { data: pinnedMessages }] = useLazyQuery(
        GET_DIALOGUE_MESSAGES,
        {
            fetchPolicy: 'network-only',
        }
    );

    const { data: subscriptionData } = useSubscription(
        NEW_MESSAGE_SUBSCRIPTION,
        {
            variables: {
                _id: dialogue?._id,
            },
            fetchPolicy: 'network-only',
        }
    );

    const { data: messageUpdateData } = useSubscription(MESSAGE_UPDATE_SUB, {
        variables: {
            _id: dialogue?._id,
        },
    });
    const [resetChatCount, { data: readCountData }] = useMutation(
        RESET_UNREAD_COUNT,
        {
            variables: {
                _id: dialogue?._id,
            },
            context: { clientName: 'chat' },
        }
    );

    useEffect(() => {
        if (subscriptionData?.newMessage) {
            dispatch(addMessagesToCurrentChat(subscriptionData?.newMessage));
        }
        if (
            subscriptionData?.newMessage?.chat?._id === dialogue?._id &&
            dialogue
        )
            if (dialogue._id) {
                resetChatCount();
            }
        // eslint-disable-next-line
    }, [dispatch, subscriptionData?.newMessage, dialogue]);
    //handle reset count for current chat

    useEffect(() => {
        if (messageUpdateData?.messageUpdate) {
            dispatch(updateMessage(messageUpdateData?.messageUpdate));
        }
    }, [dispatch, messageUpdateData?.messageUpdate]);

    useEffect(() => {
        if (pinnedMessages?.Dialogue?.getMessages !== undefined) {
            dispatch(addPinnedMessage(pinnedMessages?.Dialogue?.getMessages));
            pinnedMessages?.Dialogue?.getMessages?.length > 0 &&
                setPinOpen(true);
        }
    }, [dispatch, pinnedMessages?.Dialogue?.getMessages]);

    useEffect(() => {
        dispatch(setDialogueMessages(data?.Dialogue?.getMessages));
    }, [data?.Dialogue?.getMessages, dispatch]);

    useEffect(() => {
        endRef.current.scrollIntoView();
    });
    useEffect(() => {
        if (
            readCountData?.Dialogue?.resetUnreadCount?._id === dialogue?._id &&
            dialogue
        ) {
            dispatch(updateDialogue(readCountData?.Dialogue?.resetUnreadCount));
        }
    }, [dispatch, readCountData?.Dialogue?.resetUnreadCount, dialogue]);
    useEffect(() => {
        if (dialogue?._id) {
            getDialogueMessages({
                variables: {
                    chat: dialogue?._id || 'control',
                },
                context: { clientName: 'chat' },
            });

            getPinnedDialogueMessages({
                variables: {
                    chat: dialogue?._id || 'control',
                    pinned: true,
                },
                context: { clientName: 'chat' },
            });
        }
    }, [dialogue?._id, getDialogueMessages, getPinnedDialogueMessages]);

    return (
        <div style={{ height: '100%', overflowY: 'auto' }}>
            <div style={{ height: 'fit-content' }}>
                {dialogue?.status === 'new' && (
                    <div className={classes.chatHeader}>
                        <ChatHeader
                            chat={dialogue}
                            onExitChatMobile={onExitChatMobile}
                        />
                        <Divider />
                    </div>
                )}
                {dialogue?.status === 'accepted' && (
                    <div className={classes.chatHeader}>
                        <ChatHeader
                            chat={dialogue}
                            onExitChatMobile={onExitChatMobile}
                        />
                        <Divider />
                    </div>
                )}
            </div>
            <div
                style={{
                    margin: '8px',
                    height: xsDown ? '73%' : '80%',
                    overflowY: 'scroll',
                }}
            >
                {dialogue?.status === 'accepted' && (
                    <div
                    //style={{ margin: '8px' }}
                    //className={classes.chatHeader}
                    >
                        {messagePins?.length > 0 && pinOpen === true && (
                            <Card className={classes.pinnedList}>
                                <CardContent>
                                    <List
                                        component="nav"
                                        subheader={
                                            <ListSubheader
                                                component="div"
                                                id="nested-list-subheader"
                                            >
                                                Pinned Messages
                                                <Tooltip title="Hide pinned messages">
                                                    <IconButton
                                                        onClick={() =>
                                                            setPinOpen(false)
                                                        }
                                                    >
                                                        <CloseRounded />
                                                    </IconButton>
                                                </Tooltip>
                                            </ListSubheader>
                                        }
                                        style={{
                                            overflowY: 'auto',
                                            height: '100px',
                                        }}
                                        dense
                                    >
                                        {messagePins?.map((message, id) => (
                                            <PinnedMessages
                                                key={id}
                                                message={message}
                                            />
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
                <div
                    style={{
                        //overflowY: 'scroll',
                        minHeight:
                            open === true && pinOpen === false
                                ? '36vh'
                                : open === true && pinOpen === true
                                ? '40vh'
                                : pinOpen === true
                                ? '37vh'
                                : typeof replyText !== 'undefined' ||
                                  typeof editText !== 'undefined'
                                ? '48vh'
                                : '50vh',
                        height: 'fit-content',
                        // height:
                        //     open === true
                        //         ? window.innerHeight - 490 //
                        //         : open === true && pinOpen === true
                        //         ? window.innerHeight - 750
                        //         : pinOpen === true
                        //         ? window.innerHeight - 350 //
                        //         : typeof replyText !== 'undefined' ||
                        //           typeof editText !== 'undefined'
                        //         ? window.innerHeight - 450
                        //         : window.innerHeight - 372,
                    }}
                >
                    {' '}
                    {dialogue?.status === undefined &&
                        dialogue?._id === undefined &&
                        !loading && <NoChatSelected />}
                    {dialogue?.status === 'new' &&
                        dialogue?.initiator?.info?._id?._id === user?._id &&
                        !loading &&
                        !messages?.length > 0 && (
                            <AwaitResponse dialogue={dialogue} />
                        )}
                    {dialogue?.status === 'new' &&
                        dialogue?.recipient?.info?._id?._id === user?._id && (
                            <InviteView dialogue={dialogue} />
                        )}
                    {dialogue?.status === 'accepted' &&
                        !messages?.length > 0 &&
                        !loading && <EmptyMessages />}
                    {dialogue?.status === 'accepted' &&
                    filteredMessages &&
                    filteredMessages?.author?._id !== user._id &&
                    filteredMessages?.length > 0
                        ? filteredMessages?.map((filtered, I) => (
                              <Message
                                  key={I}
                                  message={filtered}
                                  chat={dialogue}
                              />
                          ))
                        : dialogue?.status === 'accepted' &&
                          messages &&
                          messages?.author?._id !== user._id &&
                          messages?.length > 0
                        ? messages?.map((message, mI) => (
                              <Message
                                  key={mI}
                                  message={message}
                                  chat={dialogue}
                                  onReply={() =>
                                      setReplyText({
                                          text: message?.text,
                                          _id: message?._id,
                                          author: message?.author?._id,
                                      })
                                  }
                                  onUpdateMessage={() =>
                                      setEditText({
                                          _id: message?._id,
                                          text: message?.text,
                                      })
                                  }
                              />
                          ))
                        : ''}
                    {loading && (
                        <div
                            className="d-flex justify-content-center align-items-center mx-auto w-100"
                            style={{ minHeight: '55vh' }}
                        >
                            <CircularProgress />
                        </div>
                    )}
                    <div ref={endRef} className="mt-4" />
                </div>{' '}
                {/* <div>
                    {dialogue?.status === 'accepted' &&
                        messages &&
                        messages?.length > 0 &&
                        (dialogue?.recipient?.blocked === true ||
                            dialogue?.initiator?.blocked === true) && (
                            <Blocked />
                        )}
                </div> */}
            </div>
            <div style={{ height: 'fit-content' }}>
                {dialogue?.status === 'accepted' &&
                    messages &&
                    messages?.length > 0 &&
                    (dialogue?.recipient?.blocked === true ||
                        dialogue?.initiator?.blocked === true) && (
                        <Blocked
                            otherUser={dialogue?.otherUser}
                            dialogue={dialogue?._id}
                        />
                    )}
                {dialogue?.status === 'accepted' &&
                    messages &&
                    messages?.length > 0 &&
                    (dialogue?.recipient?.blocked === false ||
                        dialogue?.initiator?.blocked === false) && (
                        <SendMessage
                            chat={dialogue?._id}
                            replyText={replyText}
                            open={open}
                            setOpen={setOpen}
                            currentUser={dialogue?.currentUser}
                            otherUser={dialogue?.otherUser}
                            onCancelReply={() => setReplyText(undefined)}
                            setReplyText={() => setReplyText(undefined)}
                            editText={editText}
                            setEditText={() => setEditText(undefined)}
                            onCancelMessageUpdate={() => setEditText(undefined)}
                        />
                    )}

                {dialogue?.status === 'accepted' &&
                    !loading &&
                    !messages?.length > 0 &&
                    (dialogue?.recipient?.blocked === false ||
                        dialogue?.initiator?.blocked === false) && (
                        <SendMessage
                            open={open}
                            setOpen={setOpen}
                            chat={dialogue?._id}
                            currentUser={dialogue?.currentUser}
                            otherUser={dialogue?.otherUser}
                            replyText={replyText}
                            onCancelReply={() => setReplyText(undefined)}
                            setReplyText={() => setReplyText(undefined)}
                            editText={editText}
                            onCancelMessageUpdate={() => setEditText(undefined)}
                        />
                    )}
            </div>
        </div>
    );
}
