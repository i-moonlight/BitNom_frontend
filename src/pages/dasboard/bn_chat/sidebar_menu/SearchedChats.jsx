import {
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListSubheader,
    Tooltip,
} from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCurrentChat,
    clearSearchChatData,
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
                        <ListSubheader
                            component="div"
                            className="d-flex align-items-center justify-content-between my-1"
                        >
                            searched chats{' '}
                            <Tooltip title="Clear search">
                                <IconButton
                                    className="align-items-end"
                                    onClick={() => clearSearch()}
                                    size="small"
                                >
                                    <DeleteRounded
                                        style={{ fontSize: '18px' }}
                                    />
                                </IconButton>
                            </Tooltip>
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
