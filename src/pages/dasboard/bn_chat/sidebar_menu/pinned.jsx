import { PushPin } from '@mui/icons-material';
import {
    CircularProgress,
    Divider,
    Grid,
    List,
    ListSubheader,
    Typography,
} from '@mui/material';
import React from 'react';
import ChatItem from './chat';

export default function Pinned({ pinned, loading, openChat, activeChatId }) {
    return (
        <>
            {pinned && pinned?.length > 0 && (
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            <PushPin color="primary" /> Pinned
                            <Divider />
                        </ListSubheader>
                    }
                >
                    {pinned?.map((chat) => (
                        <ChatItem
                            key={chat?._id}
                            chat={chat}
                            onClick={() => openChat(chat)}
                            activeChatId={activeChatId}
                        />
                    ))}
                </List>
            )}
            {loading && !pinned?.length > 0 && <CircularProgress />}
            {!loading && !pinned?.length > 0 && (
                <Grid
                    alignItems="centre"
                    justifyContent="centre"
                    item
                    direction
                    column
                >
                    <Typography>You have no pinned chats yet!</Typography>
                </Grid>
            )}
        </>
    );
}
