import { useLazyQuery, useSubscription } from '@apollo/client';
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
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessagesToCurrentChat,
    addPinnedMessage,
    setDialogueMessages,
    setTotalCount,
    updateMessage,
} from '../../../../store/actions/chatActions';
import ChatHeader from '../components/chat_header/chat_header';
import {
    GET_DIALOGUE_MESSAGES,
    MESSAGE_UPDATE_SUB,
    NEW_MESSAGE_SUBSCRIPTION,
    TOTAL_COUNT,
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

    const state = useSelector((st) => st);
    const classes = useStyles();
    const dispatch = useDispatch();
    const endRef = useRef(null);

    const dialogue = state.chats.current_chat;
    const user = state.auth.user;
    const unOrderedMessages = state?.chats?.dialogue_messages;
    const messages = [...unOrderedMessages]?.reverse();
    const filteredMessages = state?.chats?.searchData;
    const messagePins = state.chats.pinnedMessages;

    const [getDialogueMessages, { loading, data }] = useLazyQuery(
        GET_DIALOGUE_MESSAGES
    );

    const [getPinnedDialogueMessages, { data: pinnedMessages }] = useLazyQuery(
        GET_DIALOGUE_MESSAGES
    );

    const { data: subscriptionData } = useSubscription(
        NEW_MESSAGE_SUBSCRIPTION,
        {
            variables: {
                _id: dialogue._id,
            },
        }
    );

    const { data: messageUpdateData } = useSubscription(MESSAGE_UPDATE_SUB, {
        variables: {
            _id: dialogue._id,
        },
    });

    const { data: totalCountData } = useSubscription(TOTAL_COUNT, {
        variables: {
            _id: user._id,
        },
    });

    useEffect(() => {
        if (totalCountData?.totalCount?.count) {
            dispatch(setTotalCount(totalCountData?.totalCount?.count));
        }
    }, [totalCountData?.totalCount?.count, dispatch]);

    useEffect(() => {
        if (subscriptionData?.newMessage) {
            dispatch(addMessagesToCurrentChat(subscriptionData?.newMessage));
        }
    }, [dispatch, subscriptionData?.newMessage]);

    useEffect(() => {
        if (messageUpdateData?.messageUpdate) {
            dispatch(updateMessage(messageUpdateData?.messageUpdate));
        }
    }, [dispatch, messageUpdateData?.messageUpdate]);

    useEffect(() => {
        if (pinnedMessages?.Dialogue?.getMessages !== undefined) {
            dispatch(addPinnedMessage(pinnedMessages?.Dialogue?.getMessages));
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
        if (dialogue._id) {
            getDialogueMessages({
                variables: {
                    chat: dialogue._id || 'control',
                },
                context: { clientName: 'chat' },
            });

            getPinnedDialogueMessages({
                variables: {
                    chat: dialogue._id || 'control',
                    pinned: true,
                },
                context: { clientName: 'chat' },
            });
        }
    }, [dialogue._id, getDialogueMessages, getPinnedDialogueMessages]);

    return (
        <div>
            {dialogue.status === undefined &&
                dialogue._id === undefined &&
                !loading && <NoChatSelected />}
            {dialogue.status === 'new' && (
                <div className={classes.chatHeader}>
                    <ChatHeader
                        chat={dialogue}
                        onExitChatMobile={onExitChatMobile}
                    />
                    <Divider />
                </div>
            )}
            {dialogue.status === 'accepted' && (
                <div className={classes.chatHeader}>
                    <ChatHeader
                        chat={dialogue}
                        onExitChatMobile={onExitChatMobile}
                    />
                    <Divider />
                    {messagePins &&
                    messagePins?.length > 0 &&
                    pinOpen === true ? (
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
                                    {' '}
                                    {messagePins?.map((message, id) => (
                                        <PinnedMessages
                                            key={id}
                                            message={message}
                                        />
                                    ))}{' '}
                                </List>
                            </CardContent>
                        </Card>
                    ) : (
                        ''
                    )}
                </div>
            )}
            <div
                style={{
                    overflowY: 'auto',
                    minHeight:
                        open === true
                            ? '50vh'
                            : open === true && pinOpen === true
                            ? '45vh'
                            : pinOpen === true
                            ? '37vh'
                            : typeof replyText !== 'undefined' ||
                              typeof editText !== 'undefined'
                            ? '48vh'
                            : '50vh',
                    height:
                        open === true
                            ? window.innerHeight - 750
                            : open === true && pinOpen === true
                            ? window.innerHeight - 750
                            : pinOpen === true
                            ? window.innerHeight - 500
                            : typeof replyText !== 'undefined' ||
                              typeof editText !== 'undefined'
                            ? window.innerHeight - 450
                            : window.innerHeight - 372,
                }}
            >
                {' '}
                {dialogue.status === 'new' &&
                    dialogue?.initiator?.info?._id === user?._id &&
                    !loading &&
                    !messages?.length > 0 && (
                        <AwaitResponse dialogue={dialogue} />
                    )}
                {dialogue.status === 'new' &&
                    dialogue.recipient?.info._id === user?._id && (
                        <InviteView dialogue={dialogue} />
                    )}
                {dialogue.status === 'accepted' &&
                    !messages?.length > 0 &&
                    !loading && <EmptyMessages />}
                {dialogue.status === 'accepted' &&
                filteredMessages &&
                filteredMessages.author !== user._id &&
                filteredMessages?.length > 0
                    ? filteredMessages?.map((filtered, I) => (
                          <Message key={I} message={filtered} chat={dialogue} />
                      ))
                    : dialogue.status === 'accepted' &&
                      messages &&
                      messages.author !== user._id &&
                      messages?.length > 0
                    ? messages?.map((message, mI) => (
                          <Message
                              key={mI}
                              message={message}
                              chat={dialogue}
                              onReply={() =>
                                  setReplyText({
                                      text: message.text,
                                      _id: message._id,
                                      author: message.author,
                                  })
                              }
                              onUpdateMessage={() =>
                                  setEditText({
                                      _id: message._id,
                                      text: message.text,
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
            <div>
                {dialogue.status === 'accepted' &&
                    messages &&
                    messages?.length > 0 &&
                    (dialogue.recipient.blocked === true ||
                        dialogue.initiator.blocked === true) && <Blocked />}
            </div>
            <div>
                {dialogue.status === 'accepted' &&
                    messages &&
                    messages?.length > 0 &&
                    (dialogue.recipient.blocked === false ||
                        dialogue.initiator.blocked === false) && (
                        <SendMessage
                            chat={dialogue._id}
                            replyText={replyText}
                            open={open}
                            setOpen={setOpen}
                            currentUser={dialogue.currentUser}
                            otherUser={dialogue.otherUser}
                            onCancelReply={() => setReplyText(undefined)}
                            setReplyText={() => setReplyText(undefined)}
                            editText={editText}
                            setEditText={() => setEditText(undefined)}
                            onCancelMessageUpdate={() => setEditText(undefined)}
                        />
                    )}
            </div>
            <div>
                {dialogue.status === 'accepted' &&
                    !loading &&
                    !messages?.length > 0 &&
                    (dialogue.recipient.blocked === false ||
                        dialogue.initiator.blocked === false) && (
                        <SendMessage
                            open={open}
                            setOpen={setOpen}
                            chat={dialogue._id}
                            currentUser={dialogue.currentUser}
                            otherUser={dialogue.otherUser}
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
