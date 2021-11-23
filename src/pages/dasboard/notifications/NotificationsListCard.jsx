import { ArrowBack, MoreVert } from '@mui/icons-material';
import {
    Card,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationFilter from './NotificationFilter';
import NotificationListItem from './NotificationListItem';
import NotificationSettingsPopover from './NotificationSettingsPopover';

const notificationSettingsId = 'notification-setting-menu';

export default function NotificationsListCard({
    notifications,
    selectedIndex,
    setSelectedIndex,
}) {
    const history = useHistory();
    const [notificationSettingsAnchorEl, setNotificationSettingsAnchorEl] =
        useState(null);
    const mdUp = useMediaQuery('(min-width:960px)');

    const isNotificationSettingsOpen = Boolean(notificationSettingsAnchorEl);
    const handleNotificationSettingsClose = () => {
        setNotificationSettingsAnchorEl(null);
    };
    const handleNotificationSettingsOpen = (event) => {
        setNotificationSettingsAnchorEl(event.currentTarget);
    };

    const mentions = [];
    notifications?.forEach((item) => {
        if (item.tag === 'Mention') {
            mentions.push(item);
        }
    });
    notifications?.forEach((item) => {
        if (item.content.includes('commented on')) {
            mentions.push(item);
        }
    });
    const reactions = notifications?.filter((item) => {
        const toCheck = ['liked', 'loved', 'celebrated', 'disliked'];

        return toCheck.some((o) => item.content.includes(o));
    });

    const userContent = notifications?.filter((item) => {
        const toCheck = [
            'your post',
            'your comment',
            'your article',
            'your event',
        ];

        return toCheck.some((o) => item.content.includes(o));
    });

    const userProfile = notifications?.filter((item) => {
        const toCheck = ['followed you', 'invited you', 'added you'];

        return toCheck.some((o) => item.content.includes(o));
    });
    return (
        <>
            <Card style={{ padding: '0 8px 10px 8px' }}>
                <CardHeader
                    action={
                        <IconButton
                            aria-label="notification settings"
                            aria-controls={notificationSettingsId}
                            aria-haspopup="true"
                            onClick={handleNotificationSettingsOpen}
                        >
                            <MoreVert />
                        </IconButton>
                    }
                    avatar={
                        <>
                            <IconButton
                                size="small"
                                className="m-1 p-1"
                                aria-label="back"
                                color="inherit"
                                onClick={() => history.goBack()}
                            >
                                <ArrowBack />
                            </IconButton>
                        </>
                    }
                    title={
                        <div className="center-horizontal">
                            {!mdUp ? (
                                <NotificationFilter
                                    notificationFilter={selectedIndex}
                                    setNotificationFilter={setSelectedIndex}
                                />
                            ) : (
                                <Typography variant="body1">
                                    Notifications
                                </Typography>
                            )}
                        </div>
                    }
                />

                <Divider />
                {selectedIndex === 0 &&
                    notifications
                        ?.slice(0, 20)
                        ?.map((notification) => (
                            <NotificationListItem
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                {selectedIndex === 1 &&
                    mentions?.length > 0 &&
                    mentions
                        ?.slice(0, 20)
                        ?.map((notification) => (
                            <NotificationListItem
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                {selectedIndex === 2 &&
                    reactions?.length > 0 &&
                    reactions
                        ?.slice(0, 20)
                        ?.map((notification) => (
                            <NotificationListItem
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                {selectedIndex === 3 &&
                    userContent?.length > 0 &&
                    userContent
                        ?.slice(0, 20)
                        ?.map((notification) => (
                            <NotificationListItem
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                {selectedIndex === 4 &&
                    userProfile?.length > 0 &&
                    userProfile
                        ?.slice(0, 20)
                        ?.map((notification) => (
                            <NotificationListItem
                                key={notification._id}
                                notification={notification}
                            />
                        ))}
                {(selectedIndex === 0 && notifications?.length < 1) ||
                (selectedIndex === 1 && mentions?.length < 1) ||
                (selectedIndex === 2 && reactions?.length < 1) ||
                (selectedIndex === 3 && userContent?.length < 1) ||
                (selectedIndex === 4 && userProfile?.length < 1) ||
                selectedIndex === 5 ||
                selectedIndex === 6 ||
                selectedIndex === 7 ? (
                    <Grid align="center">
                        <Typography variant="body1" color="primary">
                            Nothing here yet.
                        </Typography>
                    </Grid>
                ) : (
                    ''
                )}
            </Card>
            <NotificationSettingsPopover
                notificationSettingsAnchorEl={notificationSettingsAnchorEl}
                notificationSettingsId={notificationSettingsId}
                isNotificationSettingsOpen={isNotificationSettingsOpen}
                handleNotificationSettingsClose={
                    handleNotificationSettingsClose
                }
            />
        </>
    );
}
