import React, { useState } from 'react';
import {
    Grid,
    ButtonBase,
    Typography,
    IconButton,
    Divider,
    Avatar,
} from '@material-ui/core';
import { Search, Settings } from '@material-ui/icons';
import { useStyles } from '../../utils/styles';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
const chatSettingsId = 'chat-settings-menu';
export default function ChatHeader({ chat }) {
    const classes = useStyles();
    const [chatSettingsAnchorEl, setChatSettingsAnchorEl] = useState(null);
    const isChatSettingsOpen = Boolean(chatSettingsAnchorEl);
    const handleChatSettingsClose = () => {
        setChatSettingsAnchorEl(null);
    };
    const handleChatSettingOpen = (e) => {
        setChatSettingsAnchorEl(e.currentTarget);
    };
    return (
        <Grid container spacing={1}>
            <Grid item>
                <ButtonBase>
                    {' '}
                    <Avatar
                        alt="Remy Sharp"
                        src="https://wallpaperaccess.com/full/2213426.jpg"
                        className={classes.avatar}
                    />
                </ButtonBase>
            </Grid>
            <Grid item xs container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant={'h5'}>
                            {chat.otherUser?.info}
                        </Typography>
                        <div className={classes.status}>
                            {' '}
                            {/*TODO: check online status */}
                            {chat.otherUser.lastSeen === Date.now() ? (
                                <span className={classes.online}></span>
                            ) : (
                                <span className={classes.offline}></span>
                            )}
                            <Typography>Fullstack developer</Typography>{' '}
                            <Divider
                                className={classes.dividerStatus}
                                orientation="vertical"
                                flexItem
                            />{' '}
                            <IconButton
                                size="mini"
                                type="submit"
                                className={classes.iconButtonStatus}
                                aria-label="search"
                            >
                                <Search />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item></Grid>
                </Grid>{' '}
                <Grid item>
                    <IconButton
                        size="small"
                        className={'m-1 p-1' + classes.iconButton}
                        aria-label="chat settings"
                        aria-haspopup="true"
                        aria-controls={chatSettingsId}
                        color="primary"
                        onClick={handleChatSettingOpen}
                    >
                        <Settings />
                    </IconButton>
                </Grid>
            </Grid>
            <ChatSettingPopover
                chatSettingsAnchorEl={chatSettingsAnchorEl}
                chatSettingsId={chatSettingsId}
                isChatSettingsOpen={isChatSettingsOpen}
                handleChatSettingsClose={handleChatSettingsClose}
                chat={chat}
            />
        </Grid>
    );
}
