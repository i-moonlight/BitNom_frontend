import { useMutation } from '@apollo/client';
import { Card, List, ListItem, ListItemText, Popover } from '@mui/material';
import {
    DELETE_NOTIFICATION,
    GET_USER_NOTIFICATIONS,
    MARK_NOTIFICATION_AS_READ,
    //MARK_NOTIFICAION_AS_SEEN,
    MUTATION_MUTE_NOTIFICATIONS,
} from '../../../../pages/dasboard/utilities/queries';

export default function NotificationOptionPopover({
    notificationOptionAnchorEl,
    notificationOptionId,
    notification,
    isNotificationOptionOpen,
    handleNotificationOptionClose,
}) {
    const [deleteNotification] = useMutation(DELETE_NOTIFICATION, {
        context: { clientName: 'notifications' },
    });

    const [mute] = useMutation(MUTATION_MUTE_NOTIFICATIONS, {
        context: { clientName: 'notifications' },
    });

    const handleDeleteNotification = () => {
        deleteNotification({
            variables: {
                _id: notification?._id,
            },
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { limit: 99 },
                    context: { clientName: 'notifications' },
                },
            ],
        });
        handleNotificationOptionClose();
    };

    const handleMuteNotifications = () => {
        mute({
            variables: {
                resource: {
                    _id: notification?.content_entities[0]?.resource?._id,
                    type: notification?.content_entities[0]?.resource?.type,
                },
            },
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { limit: 99 },
                    context: { clientName: 'notifications' },
                },
            ],
        });
        handleNotificationOptionClose();
    };

    const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
        context: { clientName: 'notifications' },
    });

    const handleMarkNotificationRead = () => {
        markAsRead({
            variables: {
                data: { _id: notification?._id },
            },
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { limit: 99 },
                    context: { clientName: 'notifications' },
                },
            ],
        });
        handleNotificationOptionClose();
    };

    return (
        <Popover
            anchorEl={notificationOptionAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={notificationOptionId}
            keepMounted
            open={isNotificationOptionOpen}
            onClose={handleNotificationOptionClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem button divider onClick={handleMarkNotificationRead}>
                    <ListItemText secondary="Mark as read" />
                </ListItem>
                <ListItem button onClick={handleDeleteNotification} divider>
                    <ListItemText secondary="Remove this notification" />
                </ListItem>
                <ListItem button divider onClick={handleMuteNotifications}>
                    <ListItemText
                        secondary="Turn off notifications from 
   this account"
                    />
                </ListItem>
            </List>
        </Popover>
    );
}
