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
          <Typography style={{ marginLeft: 8 }} variant='body1'>
            Notifications
          </Typography>
          <IconButton>
            <SettingsRounded />
          </IconButton>
        </div>
        <Divider />
        {[1, 2, 3].map(item => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <Typography>Andy bo Wu</Typography>
                  <Typography>sent a friend request</Typography>
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
        <Typography className='my-2' color='primary'>
          Show more
        </Typography>
      </List>
    </Popover>
  );
}
