import { FiberManualRecord, MoreVert } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NotificationOptionPopover from '../../../components/navbar/dashboard/popovers/NotificationOptionPopover';
import { getUserInitials } from '../../../utilities/Helpers';
import { notificationBodyFactory } from '../utilities/functions';

const notificationOptionId = 'menu-notification-option';

export default function NotificationListItem({ notification }) {
    const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
        useState(null);
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const history = useHistory();

    const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);
    const handleNotificationOptionClose = () => {
        setNotificationOptionAnchorEl(null);
    };
    const handleNotificationOptionOpen = (event) => {
        setNotificationOptionAnchorEl(event.currentTarget);
    };
    let link;
    if (notification?.link_to_resource?.type === 'post') {
        link = `/dashboard/posts/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'event') {
        link = `/dashboard/events/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'comment') {
        link = `/dashboard/posts/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'user') {
        link = `/users/${notification?.link_to_resource?._id}`;
    }
    const getReadStatus = (ntfn) => {
        let read;
        ntfn.to_notify?.forEach((item) => {
            if (item?.user_id == user._id) {
                read = item?.read;
            }
        });
        return read;
    };
    const getNotifyingUser = (ntfn) => {
        let name;
        ntfn?.content_entities?.forEach((item) => {
            if (item?.type === 'resource_tag') {
                name = item?.url?.displayName;
            }
        });
        return name;
    };
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        history.push(targetLink.href.substring(location.origin.length));
    };
    const userInitials = getUserInitials(getNotifyingUser(notification));
    return (
        <>
            <Card elevation={0}>
                <div
                    style={{
                        display: 'grid',
                        alignItems: 'center',
                        gridTemplateColumns: '1fr 22fr',
                        zIndex: 1,
                        cursor: 'pointer',
                    }}
                    onClick={() => history.push(link)}
                >
                    <div>
                        <FiberManualRecord
                            style={{
                                fontSize: '15px',
                            }}
                            color={
                                getReadStatus(notification) == 'true'
                                    ? 'disabled'
                                    : 'primary'
                            }
                        />
                    </div>

                    <CardHeader
                        avatar={
                            <Avatar
                                style={{
                                    backgroundColor: '#fed132',
                                }}
                                aria-label="recipe"
                            >
                                {userInitials}
                            </Avatar>
                        }
                        action={
                            <IconButton
                                aria-label="show more"
                                aria-controls={notificationOptionId}
                                aria-haspopup="true"
                                onClick={handleNotificationOptionOpen}
                                color="inherit"
                            >
                                <MoreVert />
                            </IconButton>
                        }
                        title={
                            <div className="center-horizontal">
                                <Typography
                                    onClick={(e) => contentClickHandler(e)}
                                    dangerouslySetInnerHTML={{
                                        __html: notificationBodyFactory(
                                            notification
                                        ),
                                    }}
                                    className="mx-1"
                                    style={{ zIndex: 2 }}
                                ></Typography>
                            </div>
                        }
                    />
                </div>
                <Grid align="right">
                    {/* notification?.content.includes('followed you') ? (
            <Button variant='text'>Follow back</Button>
          ) : (
            '' 
          ) */}
                    <Typography>
                        {moment(Number(notification?.date)).fromNow()}
                    </Typography>
                </Grid>
                <Divider />
            </Card>
            <NotificationOptionPopover
                notification={notification}
                notificationOptionAnchorEl={notificationOptionAnchorEl}
                notificationOptionId={notificationOptionId}
                isNotificationOptionOpen={isNotificationOptionOpen}
                handleNotificationOptionClose={handleNotificationOptionClose}
            />
        </>
    );
}
