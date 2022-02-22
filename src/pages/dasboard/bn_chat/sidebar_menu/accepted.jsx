import { List, ListSubheader } from '@mui/material';
import React from 'react';
import ChatItem from './chat';

export default function Accepted({ accepted, openChat, activeChatId }) {
    return (
        <>
            {accepted && accepted?.length > 0 && (
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">Chats</ListSubheader>
                    }
                >
                    {accepted?.map((chat) => (
                        <ChatItem
                            key={chat?._id}
                            onClick={() => openChat(chat)}
                            chat={chat}
                            activeChatId={activeChatId}
                        />
                    ))}
                </List>
            )}
        </>
    );
}
