import { useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core';
import { GET_USER_NOTIFICATIONS } from '../../pages/dasboard/utilities/queries';
import { MoreVert, PersonRounded, SettingsRounded } from '@material-ui/icons';
import React from 'react';

export default function NotificationsPopover({
  notificationAnchorEl,
  notificationId,
  isNotificationOpen,
  handleNotificationsClose,
  notificationOptionId,
  handleNotificationOptionOpen,
}) {
  const { loading, data } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: { limit: 20 },
  });
  return (
    <Popover
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationId}
      keepMounted
      open={isNotificationOpen}
      onClose={handleNotificationsClose}
    >
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <div className='space-between center-horizontal'>
          <Typography style={{ marginLeft: 8 }} variant='body2'>
            Notifications
          </Typography>
          <IconButton>
            <SettingsRounded />
          </IconButton>
        </div>
        <Divider />
        {data?.Notification?.get?.slice(0, 3)?.map((item) => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <Typography variant='body2'>Andy bo Wu</Typography>
                  <Typography variant='body2'>sent a friend request</Typography>
                </div>
              }
              secondary='50 minutes ago'
            />
            <ListItemIcon
              aria-label='show more'
              aria-controls={notificationOptionId}
              aria-haspopup='true'
              onClick={handleNotificationOptionOpen}
              color='inherit'
              style={{
                marginRight: 0,
                paddingRight: 0,
                minWidth: 20,
                '&.MuiListItemIcon-root': {
                  minWidth: 20,
                },
              }}
            >
              <MoreVert />
            </ListItemIcon>
          </ListItem>
        ))}
        <Divider />
        <Typography variant='body2' className='my-2' color='primary'>
          Show more
        </Typography>
      </List>
    </Popover>
  );
}
