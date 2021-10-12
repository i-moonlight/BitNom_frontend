import { useMutation } from '@apollo/client';
import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ONLINE_STATUS } from '../graphql/queries';

import { useStyles } from '../utils/styles';

export default function ChatItem({ chat, onClick }) {
    const classes = useStyles();
    const [isOnline, setIsOnline] = useState(0);
    const state = useSelector((st) => st);
    const user = state.auth.user._id;
    const [updateLastSeenMutation] = useMutation(USER_ONLINE_STATUS, {
        variables: {
            _id: user,
        },
        context: { clientName: 'chat' },
    });
    const updateLastSeen = () => {
        updateLastSeenMutation();
    };

    useEffect(() => {
        updateLastSeen();
        setIsOnline(setInterval(() => updateLastSeen(), 20000));
        return () => {
            clearInterval(isOnline);
        }; // eslint-disable-next-line
    }, [isOnline]);

    return (
        <>
            <ListItem
                button
                component={Link}
                alignItems="flex-start"
                onClick={() => onClick()}
                // to={`/dashboard/chat/{chat._id}`}
            >
                <ListItemAvatar>
                    <Avatar
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#FFF',
                        }}
                        src="https://wallpaperaccess.com/full/2213426.jpg"
                        alt={'avatar'}
                    />
                </ListItemAvatar>

                {/*TODO: check online status */}
                {chat.otherUser.lastSeen === Date.now() && isOnline ? (
                    <span className={classes.online_status}></span>
                ) : (
                    <span className={classes.offline_status}></span>
                )}

                <ListItemText
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="header"
                                variant="h6"
                                color="text.primary"
                            >
                                {chat.otherUser.info}
                            </Typography>

                            {chat.status === 'accepted' && (
                                <Typography>this is a new message</Typography>
                            )}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
