import { Card, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import React from 'react';
import { useMutation } from '@apollo/client';
import {
  MARK_NOTIFICAION_AS_READ,
  GET_USER_NOTIFICATIONS,
  //MARK_NOTIFICAION_AS_SEEN,
  MUTATION_UNSUBSCRIBE,
  DELETE_NOTIFICAION,
} from '../../../../pages/dasboard/utilities/queries';

export default function NotificationOptionPopover({
  notificationOptionAnchorEl,
  notificationOptionId,
  notification,
  isNotificationOptionOpen,
  handleNotificationOptionClose,
}) {
  const [
    deleteNotification,
    {
      data: deleteData,
      //  loading,
      //   error
    },
  ] = useMutation(DELETE_NOTIFICAION, {
    context: { clientName: 'notifications' },
  });

  const [
    unsubscribe,
    {
      data: unsubscribeData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_UNSUBSCRIBE, {
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
          variables: { limit: 20 },
          context: { clientName: 'notifications' },
        },
      ],
    });
    handleNotificationOptionClose();
  };

  const handleUnsubscribe = () => {
    console.log(notification?.content_entities[0]?.resource);
    unsubscribe({
      variables: {
        resource: {
          _id: notification?.content_entities[0]?.resource?._id,
          type: notification?.content_entities[0]?.resource?.type,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_NOTIFICATIONS,
          variables: { limit: 20 },
          context: { clientName: 'notifications' },
        },
      ],
    });
    handleNotificationOptionClose();
  };

  const [
    markAsRead,
    {
      data: markAsReadData,
      //  loading,
      //   error
    },
  ] = useMutation(MARK_NOTIFICAION_AS_READ, {
    context: { clientName: 'notifications' },
  });
  console.log(notification);
  const handleMarkNotificationRead = () => {
    markAsRead({
      variables: {
        _id: notification?._id,
      },
      refetchQueries: [
        {
          query: GET_USER_NOTIFICATIONS,
          variables: { limit: 20 },
          context: { clientName: 'notifications' },
        },
      ],
    });
    handleNotificationOptionClose();
  };
  console.log(markAsReadData, unsubscribeData, deleteData);
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
        <ListItem button divider onClick={handleMarkNotificationRead}>
          <ListItemText secondary='Mark as read' />
        </ListItem>
        <ListItem button onClick={handleDeleteNotification} divider>
          <ListItemText secondary='Remove This Notification' />
        </ListItem>
        <ListItem button divider onClick={handleUnsubscribe}>
          <ListItemText
            secondary='Turn off Notifications from 
   this account'
          />
        </ListItem>
      </List>
    </Popover>
  );
}
