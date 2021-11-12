import { useQuery } from '@apollo/client';
import {
    ArrowBackRounded,
    ArrowDropDown,
    ArrowDropUp,
    CloseRounded,
    Search,
    SettingsRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    CardHeader,
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchOutput,
    setSearchOutput,
} from '../../../../../store/actions/chatActions';
import { getUserInitials } from '../../../../../utilities/Helpers';
import { SEARCH_MESSAGES } from '../../graphql/queries';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
import { useStyles } from '../../utils/styles';

const chatSettingsId = 'chat-settings-menu';

export default function ChatHeader({ chat, onExitChatMobile }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const theme = useTheme();
    const xsDown = useMediaQuery('(max-width:599px)');

    const [chatSettingsAnchorEl, setChatSettingsAnchorEl] = useState(null);

    const [searchTerm, setValues] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const isChatSettingsOpen = Boolean(chatSettingsAnchorEl);
    const user = state.auth.user;
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
    const { data } = useQuery(SEARCH_MESSAGES, {
        variables: {
            data: { chat: chat._id, params: { searchString: searchTerm } },
        },
        context: { clientName: 'chat' },
    });

    useEffect(() => {
        if (data?.Dialogue?.searchMessages?.length > 0) {
            dispatch(setSearchOutput(data?.Dialogue?.searchMessages));
        }
    }, [dispatch, data?.Dialogue?.searchMessages]);
    const handleDownIndex = () => {
        console.log('Down SEARCH INDEX');
    };
    const handleUpIndex = () => {
        console.log('Up search index');
    };

    const handleSearchClearNClose = () => {
        setSearchOpen(false);
        dispatch(clearSearchOutput());
    };
    const otherUser =
        chat?.otherUser?.info?._id === user?._id
            ? chat?.currentUser
            : chat?.otherUser;
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
                                // onClick={() => setSearchOpen(true)}
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
                                otherUser?.lastSeen === Date.now() ? (
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
                                    otherUser?.info?.profile_pic
                                        ? process.env.REACT_APP_BACKEND_URL +
                                          chat?.otherUser?.info?.profile_pic
                                        : ''
                                }
                            >
                                {otherUser?.info?.profile_pic
                                    ? ''
                                    : getUserInitials(
                                          otherUser?.info?.displayName
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
                        {otherUser?.info?.displayName || 'User Name'}
                    </Typography>
                }
                subheader={
                    <div>
                        <div className="d-flex ">
                            <div className="d-flex align-items-center">
                                <Typography variant="body1">
                                    Software Dev
                                </Typography>
                            </div>
                            <Divider
                                className={classes.dividerStatus}
                                orientation="vertical"
                                flexItem
                            />
                            <div className="d-flex align-items-center">
                                <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    aria-label="chat settings"
                                    aria-haspopup="true"
                                    aria-controls={chatSettingsId}
                                    onClick={() => setSearchOpen(true)}
                                >
                                    <Search />
                                </IconButton>
                            </div>{' '}
                            {searchOpen ? (
                                <Paper
                                    variant={
                                        theme.palette.mode == 'light'
                                            ? 'outlined'
                                            : 'elevation'
                                    }
                                    elevation={0}
                                    component="form"
                                    className={classes.paperSearch}
                                >
                                    {' '}
                                    <IconButton
                                        size="small"
                                        className={
                                            'm-1 p-1' + classes.iconButton
                                        }
                                        aria-label="search"
                                    >
                                        <Search />
                                    </IconButton>{' '}
                                    <InputBase
                                        className={classes.input}
                                        placeholder="Search Messages"
                                        inputProps={{
                                            'aria-label': 'search Messages',
                                        }}
                                        name="searchString"
                                        value={searchTerm}
                                        onChange={handleSearchMessage}
                                    />
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="body2">0/0</Typography>
                                    <IconButton
                                        size="small"
                                        className={
                                            'm-1 p-1' + classes.iconButton
                                        }
                                        onClick={handleDownIndex}
                                    >
                                        <ArrowDropDown />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        className={
                                            'm-1 p-1' + classes.iconButton
                                        }
                                        onClick={handleUpIndex}
                                    >
                                        <ArrowDropUp />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        className={
                                            'm-1 p-1' + classes.iconButton
                                        }
                                        onClick={handleSearchClearNClose}
                                    >
                                        <CloseRounded />
                                    </IconButton>
                                </Paper>
                            ) : (
                                ''
                            )}
                        </div>
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
