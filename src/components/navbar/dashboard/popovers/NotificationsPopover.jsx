import { SettingsRounded } from '@mui/icons-material';
import {
    Avatar,
    Card,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Typography,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { notificationBodyFactory } from '../../../../pages/dasboard/utilities/functions';
import { getUserInitials } from '../../../../utilities/Helpers';
import { getDistanceToNowWithSuffix } from '../../../utilities/date.components';

export default function NotificationsPopover({
    notificationAnchorEl,
    notificationId,
    isNotificationOpen,
    handleNotificationsClose,
    notifications,
}) {
    return (
        <Popover
            anchorEl={notificationAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={notificationId}
            open={isNotificationOpen}
            onClose={handleNotificationsClose}
            disableScrollLock
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
        link = `/post/${item?.link_to_resource?._id}`;
    } else if (item?.link_to_resource?.type === 'event') {
        link = `/events/${item?.link_to_resource?._id}`;
    } else if (item?.link_to_resource?.type === 'comment') {
        link = `/post/${item?.link_to_resource?._id}`;
    } else if (item?.link_to_resource?.type === 'user') {
        link = `/users/${item?.content_entities[0]?.url?._id}`;
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
        history.push(targetLink.href.substring(window.location.origin.length));
    };

    const getNotifyingUserProfile = (ntfn) => {
        let profile;
        ntfn?.content_entities?.forEach((entity) => {
            if (entity?.type === 'resource_tag') {
                profile = entity?.url?.profile_pic;
            }
        });
        return profile;
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
                    src={
                        getNotifyingUserProfile(item) &&
                        process.env.REACT_APP_BACKEND_URL +
                            getNotifyingUserProfile(item)
                    }
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
                secondary={
                    <Typography variant="body2" style={{ marginRight: '8px' }}>
                        {getDistanceToNowWithSuffix(Number(item?.date))}
                    </Typography>
                }
            />
        </ListItem>
    );
}
