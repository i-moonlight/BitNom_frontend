import React, { useState } from 'react';
import {
    Grid,
    ButtonBase,
    Typography,
    IconButton,
    Divider,
    Avatar,
    Paper,
    useTheme,
    InputBase,
} from '@material-ui/core';
import { Search, Settings } from '@material-ui/icons';
import { useStyles } from '../../utils/styles';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
import { getUserInitials } from '../../../../../utilities/Helpers';
import { useQuery } from '@apollo/client';
import { SEARCH_MESSAGES } from '../../graphql/queries';
const chatSettingsId = 'chat-settings-menu';
export default function ChatHeader({ chat }) {
    const classes = useStyles();
    const theme = useTheme();
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
        <Grid container spacing={1}>
            <Grid item>
                <ButtonBase>
                    {' '}
                    <Avatar
                        alt={chat.otherUser.info.displayName}
                        src={
                            chat?.otherUser?.info.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  chat?.otherUser?.info.profile_pic
                                : ''
                        }
                        className={classes.avatar}
                        style={{ backgroundColor: '#1C0C5B' }}
                    >
                        {chat?.otherUser?.info.profile_pic
                            ? ''
                            : getUserInitials(
                                  chat?.otherUser?.info.displayName
                              )}
                    </Avatar>
                </ButtonBase>
            </Grid>
            <Grid item xs container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant={'h5'}>
                            {chat.otherUser?.info.displayName}
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
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search />
                            </IconButton>
                            {searchOpen ? (
                                <Paper
                                    variant={
                                        theme.palette.type == 'light'
                                            ? 'outlined'
                                            : 'elevation'
                                    }
                                    elevation={0}
                                    component="form"
                                    className={classes.paperSearch}
                                >
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search Messages"
                                        inputProps={{
                                            'aria-label': 'search chats',
                                        }}
                                        name="searchString"
                                        value={searchTerm}
                                        onChange={handleSearchMessage}
                                    />
                                </Paper>
                            ) : (
                                ''
                            )}
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
