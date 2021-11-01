import { useMutation, useSubscription } from '@apollo/client';
import {
    Avatar,
    Badge,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { AttachFile, VideoLibrary, Image, Gif } from '@mui/icons-material';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserInitials } from '../../../../utilities/Helpers';
import {
    LATESTMESSAGE_SUBSCRIPTION,
    USER_ONLINE_STATUS,
    USER_IS_ONLINE,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function ChatItem({ chat, onClick, activeChatId }) {
    const [isOnline, setIsOnline] = useState(0);
    const classes = useStyles();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    //handle set active chat

    const [UpdateLastSeenMutation] = useMutation(USER_ONLINE_STATUS);

    const { data } = useSubscription(LATESTMESSAGE_SUBSCRIPTION, {
        variables: {
            _id: chat._id,
        },
    });
    //user
    const { data: OnlineData } = useSubscription(USER_IS_ONLINE, {
        variables: {
            _id: user._id,
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
    const updateLastSeen = () => {
        UpdateLastSeenMutation({
            variables: { _id: user._id },
            context: { clientName: 'chat' },
        });
    };
    const otherUser =
        chat.otherUser.info._id === user._id
            ? chat.currentUser
            : chat.otherUser;
    const truncateString = (input) =>
        input?.length > 20 ? `${input?.substring(0, 20)}...` : input;

    return (
        <>
            <ListItem
                button
                // component={Link}
                alignItems="flex-start"
                onClick={() => onClick()}
                className={activeChatId === chat._id ? classes.activeChat : ''}
                divider
                // to={`/dashboard/chat/{chat._id}`}
            >
                <ListItemAvatar>
                    <Avatar
                        style={{
                            backgroundColor: '#1C0C5B',
                        }}
                        src={
                            otherUser?.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  chat?.otherUser?.profile_pic
                                : ''
                        }
                        alt={'avatar'}
                    >
                        {otherUser?.profile_pic
                            ? ''
                            : getUserInitials(otherUser?.info.displayName)}
                    </Avatar>
                </ListItemAvatar>
                {/* TODO: check online status */}
                {otherUser.info._id === OnlineData?.userIsOnline?._id &&
                OnlineData?.userIsOnline?.online == true ? (
                    <span className={classes.online_status}></span>
                ) : (
                    <span className={classes.offline_status}></span>
                )}
                <ListItemText
                    primary={
                        <Typography color="textPrimary">
                            {otherUser?.info?.displayName}{' '}
                            <Badge
                                badgeContent={chat?.currentUser?.unreadCount}
                                color="primary"
                                style={{ marginLeft: '120px' }}
                            />
                        </Typography>
                    }
                    secondary={
                        <React.Fragment>
                            {chat.status === 'accepted' && (
                                <Typography>
                                    {data?.lastMessageUpdate?.text ? (
                                        truncateString(
                                            data?.lastMessageUpdate?.text
                                        )
                                    ) : data?.lastMessageUpdate?.video ? (
                                        <VideoLibrary />
                                    ) : data?.lastMessageUpdate?.images.length >
                                      0 ? (
                                        <Image />
                                    ) : data?.lastMessageUpdate?.gif ? (
                                        <Gif />
                                    ) : data?.lastMessageUpdate?.documents
                                          .length > 0 ? (
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
                                    ) : (
                                        truncateString(chat?.lastMessage?.text)
                                    )}
                                </Typography>
                            )}
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/* <Divider variant="inset" className="me-3" /> */}
        </>
    );
}
