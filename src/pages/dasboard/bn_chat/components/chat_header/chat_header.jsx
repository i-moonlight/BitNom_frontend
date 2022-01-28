import { useLazyQuery, useSubscription } from '@apollo/client';
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
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchOutput,
    setSearchOutput,
} from '../../../../../store/actions/chatActions';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
    SEARCH_MESSAGES,
    USER_IS_ONLINE,
    USER_TYPING_SUBS,
} from '../../graphql/queries';
import ChatSettingPopover from '../../thread_view/ChatSettingsPopover';
import { useStyles } from '../../utils/styles';

const chatSettingsId = 'chat-settings-menu';

export default function ChatHeader({ chat, onExitChatMobile }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const theme = useTheme();
    const xsDown = useMediaQuery('(max-width:1200px)');

    const [chatSettingsAnchorEl, setChatSettingsAnchorEl] = useState(null);
    const [debouncedSearchTerm, setDebouncedValues] = useState('');
    const [online, setIsOnline] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const isChatSettingsOpen = Boolean(chatSettingsAnchorEl);

    const user = state.auth.user;

    const otherUser =
        chat?.otherUser?.info?._id?._id === user?._id
            ? chat?.currentUser
            : chat?.otherUser;

    const handleChatSettingsClose = () => {
        setChatSettingsAnchorEl(null);
    };

    const handleChatSettingOpen = (e) => {
        setChatSettingsAnchorEl(e.currentTarget);
    };

    const handleSearchMessage = (e) => {
        setDebouncedValues(e.target.value);
    };

    const handleDebouncedSearch = useMemo(
        () => debounce(handleSearchMessage, 500),
        []
    );

    const [searchMessages, { data }] = useLazyQuery(SEARCH_MESSAGES);

    const { data: userTypingData } = useSubscription(USER_TYPING_SUBS, {
        variables: {
            data: { _id: otherUser?.info?._id?._id, chat: chat?._id },
        },
    });

    const { data: UserOnlineData } = useSubscription(USER_IS_ONLINE, {
        variables: {
            _id: chat?.otherUser?.info?._id?._id,
        },
    });

    const handleDownIndex = () => {
        // eslint-disable-next-line no-console
        console.log('Down SEARCH INDEX');
    };

    const handleUpIndex = () => {
        // eslint-disable-next-line no-console
        console.log('Up search index');
    };

    const handleSearchClearNClose = () => {
        setSearchOpen(false);
        dispatch(clearSearchOutput());
    };

    const onlineUser = UserOnlineData?.userIsOnline?.user;
    const userInitials = getUserInitials(otherUser?.info?._id?.displayName);

    useEffect(() => {
        if (data?.Dialogue?.searchMessages?.length > 0) {
            dispatch(setSearchOutput(data?.Dialogue?.searchMessages));
        }
    }, [dispatch, data?.Dialogue?.searchMessages]);

    useEffect(() => {
        if (UserOnlineData?.userIsOnline?.online === true) {
            setIsOnline(true);
        }
    }, [UserOnlineData?.userIsOnline?.online]);

    useEffect(() => {
        if (UserOnlineData?.userIsOnline?.online === undefined) {
            setIsOnline(false);
        }
    }, [UserOnlineData?.userIsOnline?.online]);

    useEffect(() => {
        if (debouncedSearchTerm.length > 0 && chat._id) {
            searchMessages({
                variables: {
                    data: {
                        chat: chat._id,
                        params: { searchString: debouncedSearchTerm },
                    },
                },
                context: { clientName: 'chat' },
            });
        }
    }, [chat._id, debouncedSearchTerm, searchMessages]);

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
                                onlineUser ===
                                    chat?.otherUser?.info?._id?._id &&
                                online === true ? (
                                    <span className={classes.online}></span>
                                ) : (
                                    <span className={classes.offline}></span>
                                )
                            }
                        >
                            <Avatar
                                src={
                                    process.env.REACT_APP_BACKEND_URL +
                                        chat?.otherUser?.info?._id
                                            ?.profile_pic ||
                                    `https://ui-avatars.com/api/?name=${userInitials}&background=random`
                                }
                                alt={'avatar'}
                            >
                                {userInitials}
                            </Avatar>
                        </Badge>
                    </>
                }
                action={
                    <div className="d-flex align-items-center">
                        {searchOpen && (
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
                                    className={'m-1 p-1' + classes.iconButton}
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
                                    onChange={handleDebouncedSearch}
                                />
                                <Divider orientation="vertical" flexItem />
                                <Typography variant="body2">0/0</Typography>
                                <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    onClick={handleDownIndex}
                                >
                                    <ArrowDropDown />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    onClick={handleUpIndex}
                                >
                                    <ArrowDropUp />
                                </IconButton>
                                <IconButton
                                    size="small"
                                    className={'m-1 p-1' + classes.iconButton}
                                    onClick={handleSearchClearNClose}
                                >
                                    <CloseRounded />
                                </IconButton>
                            </Paper>
                        )}
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
                    </div>
                }
                title={
                    <Typography style={{ marginRight: 8 }}>
                        {otherUser?.info?._id?.displayName || 'User Name'}
                    </Typography>
                }
                subheader={
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            {onlineUser === chat?.otherUser?.info?._id?._id &&
                            online === true ? (
                                <Typography variant="subtitle2">
                                    online
                                </Typography>
                            ) : onlineUser ===
                                  chat?.otherUser?.info?._id?._id &&
                              online === true &&
                              userTypingData?.userTyping?.typing === true ? (
                                <Typography
                                    variant="subtitle2"
                                    style={{ fontStyle: 'italic' }}
                                >
                                    typing...
                                </Typography>
                            ) : (
                                <Typography variant="subtitle2">
                                    last seen{' '}
                                    {format(
                                        new Date(otherUser?.lastSeen),
                                        'MMM do h:mm aaa'
                                    )}
                                    {/* {format(new Date(), 'MMM do h:mm aaa')} */}
                                </Typography>
                            )}
                        </div>
                        {userTypingData?.userTyping?.typing === true && (
                            <div
                                className="d-flex align-items-center"
                                style={{ marginLeft: '10px' }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    style={{ fontStyle: 'italic' }}
                                >
                                    typing...
                                </Typography>
                            </div>
                        )}
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
