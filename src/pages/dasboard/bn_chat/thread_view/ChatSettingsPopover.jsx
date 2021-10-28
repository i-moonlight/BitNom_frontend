import { useMutation } from '@apollo/client';
import { Card, List, ListItem, ListItemText, Popover } from '@mui/material';
import React from 'react';
import {
    ARCHIVE_CHAT,
    BLOCK_CHAT,
    MARK_CHAT_AS_READ,
    MUTE_CONVERSATION,
    REPORT_USER,
} from '../graphql/queries';
export default function ChatSettingPopover({
    chatSettingsAnchorEl,
    chatSettingsId,
    isChatSettingsOpen,
    handleChatSettingsClose,
    chat,
}) {
    const [ArchiveChat] = useMutation(ARCHIVE_CHAT, {
        variables: {
            _id: chat._id,
        },
        context: { clientName: 'chat' },
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
            _id: chat._id,
        },
        context: { clientName: 'chat' },
    });
    const [ReportUser] = useMutation(REPORT_USER, {
        variables: {
            chat: chat?.otherUser?.info,
        },
        context: { clientName: 'chat' },
    });

    const handleArchiveChat = () => {
        ArchiveChat();
    };
    const handleMarkAsRead = () => {
        MarkAsSeen();
    };
    const handleMuteConversation = () => {
        MuteConversation();
    };
    const handleBlockUser = () => {
        BlockUser();
    };
    const handleReport = () => {
        ReportUser();
    };
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
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem button divider onClick={handleArchiveChat}>
                    <ListItemText primary="Archive" />
                </ListItem>
                <ListItem button divider onClick={handleMarkAsRead}>
                    <ListItemText primary="Mark As read" />
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
