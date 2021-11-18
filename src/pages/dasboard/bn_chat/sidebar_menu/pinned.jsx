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
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../../../store/actions/chatActions';
import Chat from './chat';

export default function Pinned({ pinned, loading }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const openChatInvite = (chat) => {
        const current_chat = state.chats.current_chat;
        if (current_chat._id !== chat._id) {
            dispatch(setCurrentChat(chat));
        }
    };
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
                        <Chat
                            key={chat._id}
                            chat={chat}
                            onClick={() => openChatInvite(chat)}
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
