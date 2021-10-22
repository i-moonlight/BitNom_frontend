import { useQuery, useSubscription } from '@apollo/client';
import { CircularProgress, Divider } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessagesToCurrentChat,
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

export default function Messages({ onExitChatMobile }) {
    const state = useSelector((st) => st);
    const classes = useStyles();
    const dispatch = useDispatch();
    const endRef = useRef(null);

    const dialogue = state.chats.current_chat;
    const user = state.auth.user;
    const unOrderedMessages = state.chats.dialogue_messages;
    const messages = [...unOrderedMessages].reverse();

    const { loading, data } = useQuery(GET_DIALOGUE_MESSAGES, {
        variables: {
            chat: dialogue._id,
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

    useEffect(() => {
        if (subscriptionData?.newMessage) {
            dispatch(addMessagesToCurrentChat(subscriptionData?.newMessage));
            endRef.current.scrollIntoView();
        }
    }, [dispatch, subscriptionData?.newMessage]);

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
                dialogue.recipient?.info._id === user?._id && (
                    <InviteView dialogue={dialogue} />
                )}

            {dialogue.status === 'new' &&
                dialogue?.initiator?.info?._id === user?._id &&
                !loading &&
                !messages.length > 0 && <AwaitResponse dialogue={dialogue} />}

            <div
                style={{
                    overflowY: 'auto',
                    minHeight: '50vh',
                    height: window.innerHeight - 348,
                }}
            >
                {dialogue.status === 'accepted' &&
                    !messages.length > 0 &&
                    !loading && <EmptyMessages />}

                {dialogue.status === 'accepted' &&
                    messages &&
                    messages.author !== user._id &&
                    messages?.length > 0 &&
                    messages.map((message, mI) => (
                        <Message key={mI} message={message} chat={dialogue} />
                    ))}

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
                {(dialogue.status === 'accepted' &&
                    messages &&
                    messages.length) > 0 && <SendMessage chat={dialogue._id} />}
            </div>
            <div>
                {dialogue.status === 'accepted' &&
                    !loading &&
                    !messages.length > 0 && <SendMessage chat={dialogue._id} />}
            </div>
        </div>
    );
}
