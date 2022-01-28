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
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NotificationOptionPopover from '../../../components/navbar/dashboard/popovers/NotificationOptionPopover';
import { getDistanceToNowWithSuffix } from '../../../components/utilities/date.components';
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
        link = `/post/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'event') {
        link = `/events/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'comment') {
        link = `/post/${notification?.link_to_resource?._id}`;
    } else if (notification?.link_to_resource?.type === 'user') {
        link = `/users/${notification?.content_entities[0]?.url?._id}`;
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
    const getNotifyingUserProfile = (ntfn) => {
        let profile;
        ntfn?.content_entities?.forEach((item) => {
            if (item?.type === 'resource_tag') {
                profile = item?.url?.profile_pic;
            }
        });

        return profile;
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
            <Card elevation={0} style={{ margin: '5px 0px' }}>
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
                                src={
                                    getNotifyingUserProfile(notification)
                                        ? process.env.REACT_APP_BACKEND_URL +
                                          getNotifyingUserProfile(notification)
                                        : undefined
                                }
                                sx={{ width: '30px', height: '30px' }}
                            >
                                <Typography variant="body2">
                                    {userInitials}
                                </Typography>
                            </Avatar>
                        }
                        action={
                            <IconButton
                                aria-label="show more"
                                aria-controls={notificationOptionId}
                                aria-haspopup="true"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationOptionOpen(e);
                                }}
                                color="inherit"
                                style={{ zIndex: 2 }}
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
                                    variant="body2"
                                ></Typography>
                            </div>
                        }
                    />
                </div>
                <Grid align="right">
                    <Typography variant="body2" style={{ marginRight: '8px' }}>
                        {getDistanceToNowWithSuffix(Number(notification?.date))}
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
