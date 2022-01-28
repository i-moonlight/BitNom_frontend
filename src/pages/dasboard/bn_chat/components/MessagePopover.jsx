import { useMutation, useSubscription } from '@apollo/client';
import { List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToPinnedMessage,
    removeFromMessages,
} from '../../../../store/actions/chatActions';
import {
    DELETE_MESSAGE,
    DELETE_MESSAGE_SUBSCRIPTION,
    PIN_MESSAGE,
} from '../graphql/queries';

export default function MessagePopover({
    messageSettingsAnchorEl,
    messageSettingsId,
    isMessageSettingsOpen,
    handleMessageClose,
    incoming,
    message,
    onReply,
    onUpdateMessage,
    chat,
}) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [pinMessage, { data }] = useMutation(PIN_MESSAGE, {
        variables: {
            data: { chat: chat._id, message: message._id },
        },
        context: { clientName: 'chat' },
    });

    const [deleteMessage] = useMutation(DELETE_MESSAGE, {
        variables: {
            data: { chat: chat._id, message: message._id },
        },
        context: { clientName: 'chat' },
    });
    const { data: deleteData } = useSubscription(DELETE_MESSAGE_SUBSCRIPTION, {
        variables: {
            _id: chat?._id,
        },
    });
    const handlePinMessage = () => {
        pinMessage();
    };

    const handleDeleteMessage = () => {
        deleteMessage();
    };

    useEffect(() => {
        if (data?.Dialogue?.pinMessage !== undefined) {
            dispatch(addToPinnedMessage(data?.Dialogue?.pinMessage));
        }
    }, [data?.Dialogue?.pinMessage, dispatch]);
    useEffect(() => {
        dispatch(removeFromMessages(deleteData?.deleteMessageS?.message));
    }, [deleteData, dispatch]);

    return (
        <Popover
            anchorEl={messageSettingsAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: incoming ? 'right' : 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: incoming ? 'left' : 'right',
            }}
            id={messageSettingsId}
            keepMounted
            open={isMessageSettingsOpen}
            onClose={handleMessageClose}
            style={{ marginLeft: 16, width: '100%' }}
            disablePortal
        >
            <List>
                <ListItem
                    button
                    divider
                    onClick={() => {
                        handlePinMessage(), handleMessageClose();
                    }}
                >
                    <ListItemText primary="Pin Message" />
                </ListItem>
                <ListItem
                    button
                    divider
                    onClick={() => {
                        onReply(), handleMessageClose();
                    }}
                >
                    <ListItemText primary="Reply Message" />
                </ListItem>
                {user._id === message?.author?._id && (
                    <ListItem
                        button
                        divider
                        onClick={() => {
                            handleDeleteMessage(), handleMessageClose();
                        }}
                    >
                        <ListItemText primary="Delete Message" />
                    </ListItem>
                )}
                {user._id === message?.author?._id && (
                    <ListItem
                        button
                        divider
                        onClick={() => {
                            onUpdateMessage(), handleMessageClose();
                        }}
                    >
                        <ListItemText primary="Edit text" />
                    </ListItem>
                )}
            </List>
        </Popover>
    );
}
