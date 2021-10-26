import { ArrowBackRounded, SettingsRounded } from '@mui/icons-material';
import {
    Avatar,
    Paper,
    useTheme,
    InputBase,
    Badge,
    CardHeader,
    IconButton,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { Search, Settings } from '@material-ui/icons';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
import { useQuery } from '@apollo/client';
import { SEARCH_MESSAGES } from '../../graphql/queries';
import React, { useState } from 'react';
import { getUserInitials } from '../../../../../utilities/Helpers';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
import { useStyles } from '../../utils/styles';

const chatSettingsId = 'chat-settings-menu';

export default function ChatHeader({ chat, onExitChatMobile }) {
    const classes = useStyles();
    const theme = useTheme();
    const xsDown = useMediaQuery('(max-width:599px)');

    const [chatSettingsAnchorEl, setChatSettingsAnchorEl] = useState(null);
    const [searchTerm, setValues] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const isChatSettingsOpen = Boolean(chatSettingsAnchorEl);

    const handleChatSettingsClose = () => {
        setChatSettingsAnchorEl(null);
    };

    const handleChatSettingOpen = (e) => {
        setChatSettingsAnchorEl(e.currentTarget);
    };
    const handleSearchMessage = (e) => {
        setValues(
            searchTerm?.length >= 250
                ? e.target.value.substring(0, e.target.value.length - 1)
                : e.target.value.substring(0, 250)
        );
    };
    const { loading, data } = useQuery(SEARCH_MESSAGES, {
        variables: {
            data: { chat: chat._id, params: { searchString: searchTerm } },
        },
        context: { clientName: 'chat' },
    });
    console.log('SEARCH_MESSAGES', data);
    return (
        <>
            <CardHeader
                className="m-0 p-0 mb-2"
                avatar={
                    <>
                        {xsDown && (
                            <IconButton
                                size="mini"
                                type="submit"
                                className={classes.iconButtonStatus}
                                aria-label="search"
                                onClick={() => setSearchOpen(true)}
                                onClick={() => {
                                    onExitChatMobile();
                                }}
                            >
                                <ArrowBackRounded />
                            </IconButton>
                        )}
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={
                                chat?.otherUser?.lastSeen === Date.now() ? (
                                    <span className={classes.online}></span>
                                ) : (
                                    <span className={classes.offline}></span>
                                )
                            }
                        >
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                src={
                                    chat?.otherUser?.info?.profile_pic
                                        ? process.env.REACT_APP_BACKEND_URL +
                                          chat?.otherUser?.info?.profile_pic
                                        : ''
                                }
                            >
                                {chat?.otherUser?.info?.profile_pic
                                    ? ''
                                    : getUserInitials(
                                          chat?.otherUser?.info?.displayName
                                      )}
                            </Avatar>
                        </Badge>
                    </>
                }
                action={
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="chat settings"
                        aria-haspopup="true"
                        aria-controls={chatSettingsId}
                        color="primary"
                        onClick={handleChatSettingOpen}
                    >
                        <SettingsRounded />
                    </IconButton>
                }
                title={
                    <Typography style={{ marginRight: 8 }}>
                        {chat?.otherUser?.info?.displayName || 'User Name'}
                    </Typography>
                }
                subheader={
                    <div className="d-flex align-items-center">
                        <Typography variant="body2">Software Dev</Typography>
                    </div>
                }
            />
            <ChatSettingPopover
                chatSettingsAnchorEl={chatSettingsAnchorEl}
                chatSettingsId={chatSettingsId}
                isChatSettingsOpen={isChatSettingsOpen}
                handleChatSettingsClose={handleChatSettingsClose}
                chat={chat}
            />
        </>
    );
}
