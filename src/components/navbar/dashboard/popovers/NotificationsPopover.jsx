import {
    Avatar,
    Card,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    //ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';
import { SettingsRounded } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import {
    getCreationTime,
    notificationBodyFactory,
} from '../../../../pages/dasboard/utilities/functions';
import { getUserInitials } from '../../../../utilities/Helpers';
import { useHistory } from 'react-router-dom';

export default function NotificationsPopover({
    notificationAnchorEl,
    notificationId,
    isNotificationOpen,
    handleNotificationsClose,
    notifications,
    //notificationOptionId,
    //handleNotificationOptionOpen,
}) {
    return (
        <Popover
            anchorEl={notificationAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={notificationId}
            open={isNotificationOpen}
            onClose={handleNotificationsClose}
        >
            <List
                style={{ padding: 8, paddingBottom: 0, width: '300px' }}
                component={Card}
                variant="outlined"
            >
                <div className="space-between center-horizontal">
                    <Typography style={{ marginLeft: 8 }} variant="body2">
                        Notifications
                    </Typography>
                    <IconButton size="small" className="m-1 p-1">
                        <SettingsRounded />
                    </IconButton>
                </div>
                <Divider />
                <NotificationPreview notifications={notifications} />
                <Divider />
            </List>
        </Popover>
    );
}

function NotificationPreview({ notifications }) {
    return (
        <>
            {notifications?.length < 1 && (
                <Grid align="center">
                    <Typography color="Primary" variant="body2">
                        Nothing here yet.
                    </Typography>
                </Grid>
            )}
            {notifications?.length > 0 &&
                notifications
                    ?.slice(0, 4)
                    ?.map((item) => (
                        <ListItemComponent key={item._id} item={item} />
                    ))}
            {notifications?.length > 0 && (
                <Link to="/notifications">
                    <Typography
                        variant="body2"
                        className="my-2"
                        color="primary"
                    >
                        Show more
                    </Typography>
                </Link>
            )}
        </>
    );
}

function ListItemComponent({ item }) {
    const history = useHistory();
    let link;
    if (item?.link_to_resource?.type === 'post') {
        link = `#`;
    } else if (item?.link_to_resource?.type === 'event') {
        link = `/dashboard/events/${item?.link_to_resource?._id}`;
    } else if (item?.link_to_resource?.type === 'comment') {
        link = `#`;
    } else if (item?.link_to_resource?.type === 'user') {
        link = `#`;
    }

    const getNotifyingUser = (notification) => {
        let name;
        notification?.content_entities?.forEach((entity) => {
            if (entity?.type === 'resource_tag') {
                name = entity?.url?.displayName;
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
    return (
        <ListItem
            button
            onClick={() => history.push(link)}
            className="space-between"
            key={item}
            divider
        >
            <ListItemAvatar>
                <Avatar
                    style={{
                        backgroundColor: '#fed132',
                    }}
                >
                    {getUserInitials(getNotifyingUser(item))}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <div>
                        <Typography
                            variant="body2"
                            onClick={(e) => contentClickHandler(e)}
                            dangerouslySetInnerHTML={{
                                __html: notificationBodyFactory(item),
                            }}
                            className="mx-1"
                            style={{ zIndex: 2 }}
                        ></Typography>
                    </div>
                }
                secondary={getCreationTime(item?.date)}
            />
        </ListItem>
    );
}
