import { useQuery, useSubscription } from '@apollo/client';
import { CircularProgress, Divider, Grid } from '@material-ui/core';
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
// import SentMessage from "./sent_message";

export default function Messages() {
    const state = useSelector((st) => st);
    const dialogue = state.chats.current_chat;
    const user = state.auth.user;
    const classes = useStyles();
    const dispatch = useDispatch();
    const endRef = useRef(null);

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

    const unOrderedMessages = state.chats.dialogue_messages;
    const messages = [...unOrderedMessages].reverse();

    return (
        <Grid
            container
            otem
            direction="column"
            wrap="nowrap"
            justifyContent="space-between"
        >
            {dialogue.status === undefined && dialogue._id === undefined && (
                <Grid
                    alignContent="center"
                    alignItems="center"
                    container
                    item
                    direction="column"
                    style={{ width: '100%' }}
                >
                    <NoChatSelected />
                </Grid>
            )}
            {dialogue.status === 'new' && (
                <div className={classes.chatHeader}>
                    <ChatHeader chat={dialogue} /> <Divider />
                </div>
            )}
            {dialogue.status === 'accepted' && (
                <div className={classes.chatHeader}>
                    <ChatHeader chat={dialogue} /> <Divider />
                </div>
            )}
            {dialogue.status === 'new' &&
                dialogue.recipient?.info._id === user._id && (
                    <InviteView dialogue={dialogue} />
                )}
            {dialogue.status === 'new' &&
                dialogue.initiator.info._id === user._id &&
                !loading &&
                !messages.length > 0 && <AwaitResponse dialogue={dialogue} />}
            <Grid
                style={{ height: '70vh', overflowY: 'auto' }}
                item
                container
                wrap="nowrap"
                direction="column"
            >
                {dialogue.status === 'accepted' &&
                    !messages.length > 0 &&
                    !loading && (
                        <Grid
                            alignContent="center"
                            alignItems="center"
                            container
                            item
                            direction="column"
                            style={{ width: '100%', marginTop: '35%' }}
                        >
                            <EmptyMessages />
                        </Grid>
                    )}
                {dialogue.status === 'accepted' &&
                    messages &&
                    messages.author !== user._id &&
                    messages?.length > 0 &&
                    messages.map((message, mI) => (
                        <Message key={mI} message={message} chat={dialogue} />
                    ))}
                {loading && (
                    <Grid
                        alignContent="center"
                        alignItems="center"
                        container
                        item
                        direction="column"
                        style={{ width: '100%', marginTop: '35%' }}
                    >
                        <CircularProgress />
                    </Grid>
                )}
                <div ref={endRef} />
            </Grid>
            <Grid item container wrap="nowrap" direction="column">
                {dialogue.status === 'accepted' &&
                    messages &&
                    messages.length > 0 && <SendMessage chat={dialogue._id} />}
            </Grid>
            <Grid item container wrap="nowrap" direction="column">
                {dialogue.status === 'accepted' &&
                    !loading &&
                    !messages.length > 0 && <SendMessage chat={dialogue._id} />}
            </Grid>
        </Grid>
    );
}
