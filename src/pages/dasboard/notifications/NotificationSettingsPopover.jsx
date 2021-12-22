import { useMutation } from '@apollo/client';
import { Card, List, ListItem, ListItemText, Popover } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    GET_USER_NOTIFICATIONS,
    MARK_NOTIFICATION_AS_READ,
} from '../utilities/queries';

export default function NotificationSettingsPopover({
    notificationSettingsAnchorEl,
    notificationSettingsId,
    isNotificationSettingsOpen,
    handleNotificationSettingsClose,
}) {
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [markAllAsRead] = useMutation(MARK_NOTIFICATION_AS_READ, {
        context: { clientName: 'notifications' },
    });

    const handleMarkAllNotificationsRead = () => {
        markAllAsRead({
            variables: {
                data: { user_id: String(user?._id) },
            },
            refetchQueries: [
                {
                    query: GET_USER_NOTIFICATIONS,
                    variables: { limit: 99 },
                    context: { clientName: 'notifications' },
                },
            ],
        });
        handleNotificationSettingsClose();
    };

    return (
        <Popover
            anchorEl={notificationSettingsAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={notificationSettingsId}
            keepMounted
            open={isNotificationSettingsOpen}
            onClose={handleNotificationSettingsClose}
            style={{ marginLeft: 16, width: '100%' }}
            disableScrollLock
        >
            <List
                style={{ padding: 0, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <ListItem
                    button
                    divider
                    onClick={handleMarkAllNotificationsRead}
                >
                    <ListItemText primary="Mark all as read" />
                </ListItem>
                <ListItem button divider>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Popover>
    );
}
