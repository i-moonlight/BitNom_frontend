import { useState } from 'react';
import { useSelector } from 'react-redux';
import MessagePopover from '../components/MessagePopover';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';

const messageSettingsId = 'message-settings-menu';

export default function Message({ message, chat, onReply, onUpdateMessage }) {
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const author = message?.author?._id || {};
    const [messageSettingsAnchorEl, setMessageSettingsAnchorEl] =
        useState(null);
    const isMessageSettingsOpen = Boolean(messageSettingsAnchorEl);
    const handleMessageClose = () => {
        setMessageSettingsAnchorEl(null);
    };
    const handleMessageSettingsOpen = (e) => {
        setMessageSettingsAnchorEl(e.currentTarget);
    };
    return (
        <>
            {user && user._id === author && (
                <OutgoingMessage
                    message={message}
                    chat={chat}
                    onReply={onReply}
                    onClick={handleMessageSettingsOpen}
                />
            )}
            {user && user._id !== author && (
                <IncomingMessage
                    message={message}
                    chat={chat}
                    onReply={onReply}
                    onClick={handleMessageSettingsOpen}
                />
            )}
            <MessagePopover
                messageSettingsAnchorEl={messageSettingsAnchorEl}
                handleMessageClose={handleMessageClose}
                isMessageSettingsOpen={isMessageSettingsOpen}
                message={message}
                messageSettingsId={messageSettingsId}
                incoming={user._id !== author}
                onReply={onReply}
                onUpdateMessage={onUpdateMessage}
                chat={chat}
            />
        </>
    );
}
