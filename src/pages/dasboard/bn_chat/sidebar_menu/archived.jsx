import { ArchiveRounded } from '@mui/icons-material';
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

export default function Archived({
    archived,
    loading,
    openChat,
    activeChatId,
}) {
    return (
        <>
            {archived && archived?.length > 0 && (
                <List
                    component="nav"
                    subheader={
                        <ListSubheader component="div">
                            <ArchiveRounded color="primary" /> Archived
                            <Divider />
                        </ListSubheader>
                    }
                >
                    {archived?.map((chat) => (
                        <ChatItem
                            key={chat?._id}
                            chat={chat}
                            onClick={() => openChat(chat)}
                            activeChatId={activeChatId}
                        />
                    ))}
                </List>
            )}
            {loading && !archived?.length > 0 && <CircularProgress />}
            {!loading && !archived?.length > 0 && (
                <Grid
                    alignItems="centre"
                    justifyContent="centre"
                    item
                    direction
                    column
                >
                    <Typography>You have no archived chats yet!</Typography>
                </Grid>
            )}
        </>
    );
}
