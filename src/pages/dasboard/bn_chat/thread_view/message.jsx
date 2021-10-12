import React from 'react';
import { useSelector } from 'react-redux';

import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';

export default function Message({ message, chat, onReply = () => null }) {
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const author = message.author || {};
    return (
        <>
            {user && user._id === author && (
                <OutgoingMessage
                    message={message}
                    chat={chat}
                    onReply={onReply}
                />
            )}
            {user && user._id !== author && (
                <IncomingMessage
                    message={message}
                    chat={chat}
                    oonReply={onReply}
                />
            )}
        </>
    );
}
