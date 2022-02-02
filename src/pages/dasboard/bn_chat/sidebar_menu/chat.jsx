import { useMutation, useSubscription } from '@apollo/client';
import { AttachFile, Gif, Image, VideoLibrary } from '@mui/icons-material';
import {
    Avatar,
    Badge,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setCurrentChat,
    updateDialogue,
} from '../../../../store/actions/chatActions';
import { getUserInitials } from '../../../../utilities/Helpers';
//import { truncateText } from '../../utilities/functions';
import {
    BLOCK_USER_SUBS,
    LATESTMESSAGE_SUBSCRIPTION,
    UNREAD_COUNT,
    USER_IS_ONLINE,
    USER_ONLINE_STATUS,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function ChatItem({ chat, onClick, activeChatId }) {
    const [isOnline, setIsOnline] = useState(0);
    const [online, setOnline] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const chats = state.chats.chats;
    //handle set active chat xs devices
    const xsDown = useMediaQuery('(max-width:1200px)');

    const [UpdateLastSeenMutation] = useMutation(USER_ONLINE_STATUS);

    const { data } = useSubscription(LATESTMESSAGE_SUBSCRIPTION, {
        variables: {
            _id: chat?._id,
        },
    });

    //unread count
    const { data: countData } = useSubscription(UNREAD_COUNT, {
        variables: {
            _id: chat?._id,
        },
    });

    //user
    const { data: OnlineData } = useSubscription(USER_IS_ONLINE, {
        variables: {
            _id: chat?.otherUser?.info?._id?._id,
        },
    });

    const { data: blockData } = useSubscription(BLOCK_USER_SUBS, {
        variables: {
            _id: user?._id,
        },
    });

    useEffect(() => {
        updateLastSeen();
        setIsOnline(setInterval(() => updateLastSeen(), 20000));

        return () => {
            clearInterval(isOnline);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (blockData?.blockingUser?._id === activeChatId) {
            return dispatch(setCurrentChat(blockData?.blockingUser));
        }
    }, [dispatch, blockData?.blockingUser, activeChatId, user, chats]);

    useEffect(() => {
        if (
            blockData?.blockingUser?.currentUser?.info?._id?._id === user?._id
        ) {
            return dispatch(updateDialogue(blockData?.blockingUser));
        }
    }, [dispatch, blockData?.blockingUser, user]);

    useEffect(() => {
        if (OnlineData?.userIsOnline?.online === true) {
            setOnline(true);
        }
    }, [OnlineData?.userIsOnline?.online]);

    useEffect(() => {
        if (typeof OnlineData?.userIsOnline?.online === 'undefined') {
            setOnline(false);
        }
    }, [OnlineData?.userIsOnline?.online]);

    useEffect(() => {
        if (chat?.otherUser?.info?._id?._id === user._id) {
            setOtherUser(chat?.currentUser);
        } else {
            setOtherUser(chat?.otherUser);
        }
    }, [chat, setOtherUser, user._id]);

    const updateLastSeen = () => {
        UpdateLastSeenMutation({
            variables: { _id: user._id },
            context: { clientName: 'chat' },
        });
    };

    const truncateString = (input) =>
        input?.length > 20 ? `${input?.substring(0, 20)}...` : input;

    const truncateName = (input) =>
        input?.length > 15 ? `${input?.substring(0, 15)}...` : input;

    /* const userInitials = getUserInitials(
        chat?.otherUser?.info?._id?.displayName
    ); */

    return (
        <>
            <ListItem
                button
                // component={Link}
                alignItems="flex-start"
                onClick={() => onClick()}
                className={
                    activeChatId === chat?._id && !xsDown
                        ? classes.activeChat
                        : ''
                }
                divider
                // to={`/dashboard/chat/{chat._id}`}
            >
                <ListItemAvatar>
                    <Avatar
                        src={
                            otherUser?.info?._id?.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  otherUser?.info?._id?.profile_pic
                                : `https://ui-avatars.com/api/?name=${getUserInitials(
                                      otherUser?.info?._id?.displayName
                                  )}&background=random`
                        }
                        alt={'avatar'}
                    >
                        {getUserInitials(otherUser?.info?._id?.displayName)}
                    </Avatar>
                </ListItemAvatar>
                {/* TODO: check online status */}
                {online === true ? (
                    <span className={classes.online_status}></span>
                ) : (
                    <span className={classes.offline_status}></span>
                )}
                <ListItemText
                    // primary={chat?.otherUser?.info?.displayName}
                    // secondary={
                    //     <React.Fragment>
                    //         <span sx={{ display: 'inline' }}>
                    //             {chat.otherUser.info?._id?.displayName}
                    //         </span>
                    //         <Badge
                    //             badgeContent={chat?.currentUser?.unreadCount}
                    //             color="primary"
                    //             style={{ marginLeft: '120px' }}
                    //         />
                    primary={
                        <Typography color="textPrimary" component="span">
                            {truncateName(otherUser?.info?._id?.displayName)}{' '}
                            <Badge
                                badgeContent={
                                    countData?.UnreadCount?.user ===
                                        chat?.currentUser?.info?._id?._id &&
                                    countData?.UnreadCount?._id !== activeChatId
                                        ? countData?.UnreadCount?.count
                                        : chat?.currentUser?.unreadCount
                                }
                                color="primary"
                                style={{ marginLeft: '120px' }}
                            />
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            {chat?.status === 'accepted' ? (
                                <span>
                                    {data?.lastMessageUpdate?.text ? (
                                        truncateString(
                                            data?.lastMessageUpdate?.text
                                        )
                                    ) : data?.lastMessageUpdate?.video ? (
                                        <VideoLibrary />
                                    ) : data?.lastMessageUpdate?.images
                                          ?.length > 0 ? (
                                        <Image />
                                    ) : data?.lastMessageUpdate?.gif ? (
                                        <Gif />
                                    ) : data?.lastMessageUpdate?.documents
                                          ?.length > 0 ? (
                                        <AttachFile />
                                    ) : chat?.lastMessage?.images?.length >
                                      0 ? (
                                        <Image />
                                    ) : chat?.lastMessage?.video ? (
                                        <VideoLibrary />
                                    ) : chat?.lastMessage?.gif ? (
                                        <Gif />
                                    ) : chat?.lastMessage?.documents?.length >
                                      0 ? (
                                        <AttachFile />
                                    ) : chat?.lastMessage?.text ? (
                                        truncateString(chat?.lastMessage?.text)
                                    ) : (
                                        `@${otherUser?.info?._id?._id}`
                                    )}
                                </span>
                            ) : (
                                `@${otherUser?.info?._id?._id}`
                            )}
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/* <Divider variant="inset" className="me-3" /> */}
        </>
    );
}
