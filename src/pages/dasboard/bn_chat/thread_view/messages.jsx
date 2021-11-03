import { useQuery, useSubscription } from '@apollo/client';
import { CircularProgress, Divider } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessagesToCurrentChat,
    addPinnedMessage,
    setDialogueMessages,
} from '../../../../store/actions/chatActions';
import ChatHeader from '../components/chat_header/chat_header';
import {
    GET_DIALOGUE_MESSAGES,
    NEW_MESSAGE_SUBSCRIPTION,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';
import AwaitResponse from './await_response';
import InviteView from './invite_view';
import Message from './message';
import NoChatSelected from './no_chat_selected';
import EmptyMessages from './no_messages';
import SendMessage from './send_message';
import Blocked from './blocked';

export default function Messages({ onExitChatMobile }) {
    const [replyText, setReplyText] = useState(undefined);
    const [editText, setEditText] = useState(undefined);
    const state = useSelector((st) => st);
    const classes = useStyles();
    const dispatch = useDispatch();
    const endRef = useRef(null);

    const dialogue = state.chats.current_chat;
    const user = state.auth.user;
    const unOrderedMessages = state.chats.dialogue_messages;
    const messages = [...unOrderedMessages].reverse();
    const searchOutput = state.chats.searchData;
    const filteredMessages = [...searchOutput].reverse();

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
    console.log('EDIT', editText);
    useEffect(() => {
        if (subscriptionData?.newMessage) {
            dispatch(addMessagesToCurrentChat(subscriptionData?.newMessage));
            endRef.current.scrollIntoView();
        }
    }, [dispatch, subscriptionData?.newMessage]);

    useEffect(() => {
        dispatch(addPinnedMessage(pinnedMessages?.Dialogue?.getMessages));
    }, [dispatch, pinnedMessages?.Dialogue?.getMessages]);

    useEffect(() => {
        dispatch(setDialogueMessages(data?.Dialogue?.getMessages));
        if (data?.Dialogue?.getMessages.length > 0) {
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
                </div>
            )}

            {dialogue.status === 'new' &&
                dialogue?.initiator?.info?._id === user?._id &&
                !loading &&
                !messages.length > 0 && <AwaitResponse dialogue={dialogue} />}

            <div
                style={{
                    overflowY: 'auto',
                    minHeight: '50vh',
                    height: window.innerHeight - 372,
                }}
            >
                {dialogue.status === 'accepted' &&
                    !messages.length > 0 &&
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
            </div>
            <div>
                {dialogue.status === 'accepted' &&
                messages &&
                messages.length > 0 &&
                (dialogue.recipient.blocked === true ||
                    dialogue.initiator.blocked === true) ? (
                    <Blocked />
                ) : (
                    <SendMessage
                        chat={dialogue._id}
                        replyText={replyText}
                        onCancelReply={() => setReplyText(undefined)}
                        setReplyText={() => setReplyText(undefined)}
                    />
                )}
            </div>
            <div>
                {dialogue.status === 'new' &&
                    dialogue.recipient?.info._id === user?._id && (
                        <InviteView dialogue={dialogue} />
                    )}
            </div>
        </div>
    );
}
