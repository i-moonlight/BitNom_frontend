import { useMutation } from '@apollo/client';
import { Popover, List, ListItemText, ListItem } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToPinnedMessage,
    removeFromMessages,
} from '../../../../store/actions/chatActions';
import { DELETE_MESSAGE, PIN_MESSAGE } from '../graphql/queries';

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
    const handlePinMessage = () => {
        pinMessage();
        dispatch(addToPinnedMessage(data?.Dialogue?.pinMessage));
    };
    const handleDeleteMessage = () => {
        deleteMessage();
        dispatch(removeFromMessages(message));
    };

    const handleReportMessage = () => {
        console.log('REPORT');
    };

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
                <ListItem
                    button
                    divider
                    onClick={() => {
                        handleDeleteMessage(), handleMessageClose();
                    }}
                    disabled={user._id === message.author ? false : true}
                >
                    <ListItemText primary="Delete Message" />
                </ListItem>

                <ListItem
                    button
                    divider
                    onClick={() => {
                        onUpdateMessage(), handleMessageClose();
                    }}
                    disabled={user._id === message.author ? false : true}
                >
                    <ListItemText primary="Edit text" />
                </ListItem>

                <ListItem button onClick={handleReportMessage}>
                    <ListItemText primary="Report Message" />
                </ListItem>
            </List>
        </Popover>
    );
}
