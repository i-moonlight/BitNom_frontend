import { useMutation } from '@apollo/client';
import { Card, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    addToArchivedChats,
    addToPinnedChats,
    deleteArchivedchat,
    deletePinnedChat,
    setCurrentChat,
} from '../../../../store/actions/chatActions';
import {
    ARCHIVE_CHAT,
    BLOCK_CHAT,
    GET_DIALOGUES,
    MARK_CHAT_AS_READ,
    MUTE_CONVERSATION,
    PIN_CHAT,
    REPORT_DIALOGUE_USER,
    UNARCHIVE,
    UNPIN,
} from '../graphql/queries';

export default function ChatSettingPopover({
    chatSettingsAnchorEl,
    chatSettingsId,
    isChatSettingsOpen,
    handleChatSettingsClose,
    chat,
}) {
    const dispatch = useDispatch();

    const [ArchiveChat, { data: archiveDataRL }] = useMutation(ARCHIVE_CHAT, {
        variables: {
            _id: chat?._id,
        },
        context: { clientName: 'chat' },
    });

    const [UnarchiveChat, { data: unarchiveData }] = useMutation(UNARCHIVE, {
        variables: {
            _id: chat?._id,
        },
        context: { clientName: 'chat' },
        refetchQueries: [
            {
                query: GET_DIALOGUES,
                variables: {
                    status: 'accepted',
                },
                context: { clientName: 'chat' },
            },
        ],
    });

    const [MarkAsSeen] = useMutation(MARK_CHAT_AS_READ, {
        variables: {
            chat: chat?._id,
        },
        context: { clientName: 'chat' },
    });

    const [MuteConversation] = useMutation(MUTE_CONVERSATION, {
        variables: {
            chat: chat?._id,
        },
        context: { clientName: 'chat' },
    });

    const [BlockUser] = useMutation(BLOCK_CHAT, {
        variables: {
            _id: chat?._id,
        },
        context: { clientName: 'chat' },
    });

    const [ReportUser] = useMutation(REPORT_DIALOGUE_USER, {
        variables: {
            data: {
                _id: chat?._id,
                reporter: chat?.currentUser?.info._id._id,
                reported: chat?.otherUser?.info?._id?._id,
                reason: 'User sent harmful content,is abusive,sent suspecious content.',
            },
        },
        context: { clientName: 'chat' },
    });

    const [PinChat, { data: pinChatData }] = useMutation(PIN_CHAT, {
        variables: {
            _id: chat?._id,
        },
        context: { clientName: 'chat' },
        refetchQueries: [
            {
                query: GET_DIALOGUES,
                variables: {
                    status: 'accepted',
                },
                context: { clientName: 'chat' },
            },
        ],
    });

    const [UnpinChat, { data: unpinData }] = useMutation(UNPIN, {
        variables: {
            _id: chat?._id,
        },
        context: { clientName: 'chat' },
    });

    const handleArchiveChat = () => {
        handleChatSettingsClose();
        ArchiveChat();
    };

    const handleMarkAsRead = () => {
        handleChatSettingsClose();
        MarkAsSeen();
    };

    const handleMuteConversation = () => {
        handleChatSettingsClose();
        MuteConversation();
    };

    const handleBlockUser = () => {
        handleChatSettingsClose();
        BlockUser();
    };

    const handleReport = () => {
        handleChatSettingsClose();
        ReportUser();
    };

    const handlePinChat = () => {
        handleChatSettingsClose();
        PinChat();
    };

    const handleUnpinChat = () => {
        handleChatSettingsClose();
        UnpinChat();
    };

    const handleUnArchiveChat = () => {
        handleChatSettingsClose();
        UnarchiveChat();
    };

    useEffect(() => {
        if (unpinData?.Dialogue?.unpin) {
            dispatch(setCurrentChat(unpinData?.Dialogue?.unpin));
        }
        if (unpinData?.Dialogue?.unpin?.currentUser?.pinned === false) {
            dispatch(deletePinnedChat(unpinData?.Dialogue?.unpin));
        }
    }, [dispatch, unpinData]);

    useEffect(() => {
        if (unarchiveData?.Dialogue?.unarchive) {
            dispatch(setCurrentChat(unarchiveData?.Dialogue?.unarchive));
            dispatch(deleteArchivedchat(unarchiveData?.Dialogue?.unarchive));
        }
    }, [dispatch, unarchiveData]);
    useEffect(() => {
        if (archiveDataRL?.Dialogue?.archive?.currentUser?.archived === true) {
            dispatch(addToArchivedChats(archiveDataRL?.Dialogue?.archive));
            dispatch(setCurrentChat(archiveDataRL?.Dialogue?.archive));
            dispatch(deletePinnedChat(archiveDataRL?.Dialogue?.archive));
        }
    }, [dispatch, archiveDataRL]);
    useEffect(() => {
        if (pinChatData?.Dialogue?.pin?.currentUser?.pinned === true) {
            dispatch(addToPinnedChats(pinChatData?.Dialogue?.pin));
            dispatch(setCurrentChat(pinChatData?.Dialogue?.pin));
            dispatch(deleteArchivedchat(pinChatData?.Dialogue?.pin));
        }
    }, [dispatch, pinChatData]);

    return (
        <Popover
            anchorEl={chatSettingsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={chatSettingsId}
            keepMounted
            open={isChatSettingsOpen}
            onClose={handleChatSettingsClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
            disablePortal
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem
                    button
                    divider
                    onClick={
                        chat?.currentUser?.archived !== true
                            ? handleArchiveChat
                            : handleUnArchiveChat
                    }
                >
                    <ListItemText
                        primary={
                            chat?.currentUser?.archived !== true
                                ? 'Archive'
                                : 'Remove From Archive'
                        }
                    />
                </ListItem>
                <ListItem button divider onClick={handleMarkAsRead}>
                    <ListItemText primary="Mark As read" />
                </ListItem>
                <ListItem
                    button
                    divider
                    onClick={
                        chat?.currentUser?.pinned === true
                            ? handleUnpinChat
                            : handlePinChat
                    }
                >
                    <ListItemText
                        primary={
                            chat?.currentUser?.pinned === true
                                ? 'Unpin this Chat'
                                : 'Pin this chat'
                        }
                    />
                </ListItem>
                <ListItem button divider onClick={handleMuteConversation}>
                    <ListItemText primary="Mute conversation" />
                </ListItem>
                <ListItem button divider onClick={handleBlockUser}>
                    <ListItemText primary="Block this user" />
                </ListItem>
                <ListItem button onClick={handleReport}>
                    <ListItemText primary="Report" />
                </ListItem>
            </List>
        </Popover>
    );
}
