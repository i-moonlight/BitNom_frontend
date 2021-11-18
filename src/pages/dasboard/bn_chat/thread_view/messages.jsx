import { useQuery, useSubscription } from '@apollo/client';
import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    List,
    ListSubheader,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessagesToCurrentChat,
    addPinnedMessage,
    setDialogueMessages,
    updateMessage,
} from '../../../../store/actions/chatActions';
import ChatHeader from '../components/chat_header/chat_header';
import {
    GET_DIALOGUE_MESSAGES,
    MESSAGE_UPDATE_SUB,
    NEW_MESSAGE_SUBSCRIPTION,
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

    const { loading, data } = useQuery(GET_DIALOGUE_MESSAGES, {
        variables: {
            chat: dialogue._id,
        },
        context: { clientName: 'chat' },
    });
    const { data: pinnedMessages } = useQuery(GET_DIALOGUE_MESSAGES, {
        variables: {
            chat: dialogue._id,
            pinned: true,
        },
        context: { clientName: 'chat' },
    });

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

    useEffect(() => {
        if (subscriptionData?.newMessage) {
            dispatch(addMessagesToCurrentChat(subscriptionData?.newMessage));
            endRef.current.scrollIntoView();
        }
    }, [dispatch, subscriptionData?.newMessage]);

    useEffect(() => {
        if (messageUpdateData?.messageUpdate) {
            dispatch(updateMessage(messageUpdateData?.messageUpdate));
        }
    }, [dispatch, messageUpdateData?.messageUpdate]);

    useEffect(() => {
        dispatch(addPinnedMessage(pinnedMessages?.Dialogue?.getMessages));
    }, [dispatch, pinnedMessages?.Dialogue?.getMessages]);

    useEffect(() => {
        dispatch(setDialogueMessages(data?.Dialogue?.getMessages));
        if (data?.Dialogue?.getMessages?.length > 0) {
            endRef.current.scrollIntoView();
        }
    }, [data?.Dialogue?.getMessages, dispatch]);

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
                    {messagePins && messagePins?.length > 0 && (
                        <Card className={classes.pinnedList}>
                            <CardContent>
                                <List
                                    component="nav"
                                    subheader={
                                        <ListSubheader>
                                            Pinned Messages
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
                    )}
                </div>
            )}
            {dialogue.status === 'new' &&
                dialogue?.initiator?.info?._id === user?._id &&
                !loading &&
                !messages?.length > 0 && <AwaitResponse dialogue={dialogue} />}
            <div
                style={{
                    overflowY: 'auto',
                    minHeight:
                        open === true
                            ? '37vh'
                            : open === true && messagePins?.length > 0
                            ? '30vh'
                            : messagePins?.length > 0
                            ? '37vh'
                            : typeof replyText !== 'undefined' ||
                              typeof editText !== 'undefined'
                            ? '48vh'
                            : '50vh',
                    height:
                        open === true
                            ? window.innerHeight - 750
                            : open === true && messagePins?.length > 0
                            ? window.innerHeight - 750
                            : messagePins?.length > 0
                            ? window.innerHeight - 500
                            : typeof replyText !== 'undefined' ||
                              typeof editText !== 'undefined'
                            ? window.innerHeight - 450
                            : window.innerHeight - 372,
                }}
            >
                {' '}
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
