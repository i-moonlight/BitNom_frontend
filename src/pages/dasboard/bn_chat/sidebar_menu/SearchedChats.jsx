import { DeleteRounded } from '@mui/icons-material';
import {
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListSubheader,
    Tooltip,
    Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchChatData,
    setCurrentChat,
} from '../../../../store/actions/chatActions';
import Chat from './chat';

export default function SearchedChats({ searchedChats }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const openChatInvite = (chat) => {
        const current_chat = state.chats.searchChats;
        if (current_chat?._id !== chat?._id) {
            dispatch(setCurrentChat(chat));
        }
    };
    const clearSearch = () => {
        dispatch(clearSearchChatData());
    };
    return (
        <>
            {searchedChats && searchedChats?.length > 0 && (
                <List
                    component="nav"
                    subheader={
                        <ListSubheader>
                            <div className="d-flex align-items-center justify-content-between my-1">
                                <Typography>searched chats </Typography>
                                <div className="align-items-end">
                                    <Tooltip title="Clear search">
                                        <IconButton
                                            onClick={() => clearSearch()}
                                            size="small"
                                        >
                                            <DeleteRounded
                                                style={{ fontSize: '18px' }}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <Divider />
                        </ListSubheader>
                    }
                >
                    {searchedChats?.map((chat) => (
                        <Chat
                            key={chat._id}
                            chat={chat}
                            onClick={() => openChatInvite(chat)}
                        />
                    ))}
                </List>
            )}
            {!searchedChats?.length > 0 && <CircularProgress />}
        </>
    );
}
