import { Card, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import React from 'react';

export default function NotificationOptionPopover({
  notificationOptionAnchorEl,
  notificationOptionId,
  isNotificationOptionOpen,
  handleNotificationOptionClose,
}) {
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
    >
      <List
        style={{ padding: 0, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <ListItem button divider>
          <ListItemText secondary='Mark as read' />
        </ListItem>
        <ListItem button divider>
          <ListItemText secondary='Remove This Notification' />
        </ListItem>
        <ListItem button divider>
          <ListItemText
            secondary='Turn off Notifications from 
   this account'
          />
        </ListItem>
      </List>
    </Popover>
  );
}
