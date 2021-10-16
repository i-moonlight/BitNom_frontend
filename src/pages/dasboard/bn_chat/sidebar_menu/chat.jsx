import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUserInitials } from '../../../../utilities/Helpers';

export default function ChatItem({ chat, onClick }) {
    return (
        <>
            <ListItem
                button
                component={Link}
                alignItems="flex-start"
                onClick={() => onClick()}
                divider
                // to={`/dashboard/chat/{chat._id}`}
            >
                <ListItemAvatar>
                    <Avatar
                        style={{
                            backgroundColor: '#1C0C5B',
                        }}
                        src={
                            chat?.otherUser?.profile_pic
                                ? process.env.REACT_APP_BACKEND_URL +
                                  chat?.otherUser?.profile_pic
                                : ''
                        }
                        alt={'avatar'}
                    >
                        {chat?.otherUser?.profile_pic
                            ? ''
                            : getUserInitials(
                                  chat?.otherUser?.info.displayName
                              )}
                    </Avatar>
                </ListItemAvatar>

                {/* TODO: check online status
                {chat.otherUser.lastSeen === Date.now() && isOnline ? (
                    <span className={classes.online_status}></span>
                ) : (
                    <span className={classes.offline_status}></span>
                )} */}

                <ListItemText
                    primary={
                        <Typography color="textPrimary">
                            {chat?.otherUser?.info?.displayName}
                        </Typography>
                    }
                    secondary={
                        <Typography color="textSecondary" variant="body2">
                            {chat.status === 'accepted'
                                ? 'This is a new message'
                                : 'Awaiting response'}
                        </Typography>
                    }
                />
            </ListItem>
            {/* <Divider variant="inset" className="me-3" /> */}
        </>
    );
}
