import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  CardHeader,
  IconButton,
  Divider,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { MoreVert, PersonRounded } from '@material-ui/icons';
import { notificationBodyFactory } from '../utilities/functions';
import NotificationOptionPopover from '../../../components/navbar/NotificationOptionPopover';

const notificationOptionId = 'menu-notification-option';

export default function NotificationsListCard({
  notifications,
  selectedIndex,
}) {
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
    let toCheck = ['liked', 'loved', 'celebrated', 'disliked'];

    return toCheck.some((o) => item.content.includes(o));
  });
  return (
    <>
      <Card>
        <div className='space-between'>
          <Typography className='mx-4 my-1' variant='body1'>
            Notifications
          </Typography>
          <Typography className='mx-4 my-1' variant='body1'>
            Settings
          </Typography>
        </div>
        <Divider />
        <CardContent>
          {selectedIndex === 0 &&
            notifications?.map((notification) => (
              <NotificationListItem
                key={notification._id}
                notification={notification}
              />
            ))}
          {selectedIndex === 1 &&
            mentions?.length > 0 &&
            mentions?.map((notification) => (
              <NotificationListItem
                key={notification._id}
                notification={notification}
              />
            ))}
          {selectedIndex === 2 &&
            reactions?.length > 0 &&
            reactions?.map((notification) => (
              <NotificationListItem
                key={notification._id}
                notification={notification}
              />
            ))}
          {(selectedIndex === 0 && notifications?.length < 1) ||
          (selectedIndex === 1 && mentions?.length < 1) ||
          (selectedIndex === 2 && reactions?.length < 1) ||
          selectedIndex === 3 ||
          selectedIndex === 4 ||
          selectedIndex === 5 ||
          selectedIndex === 6 ? (
            <Grid align='center'>
              <Typography variant='body1' color='primary'>
                Nothing here yet.
              </Typography>
            </Grid>
          ) : (
            ''
          )}
        </CardContent>
      </Card>
    </>
  );
}

function NotificationListItem({ notification }) {
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);

  const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);
  const handleNotificationOptionClose = () => {
    setNotificationOptionAnchorEl(null);
  };
  const handleNotificationOptionOpen = (event) => {
    setNotificationOptionAnchorEl(event.currentTarget);
  };
  const getCreationTime = (time) => {
    let ms = new Date().getTime() - time;
    let seconds = Math.round(ms / 1000);
    let minutes = Math.round(ms / (1000 * 60));
    let hours = Math.round(ms / (1000 * 60 * 60));
    let days = Math.round(ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) return 'a few seconds ago';
    else if (minutes < 60) return minutes + ' minutes';
    else if (hours < 24) return hours + ' hours';
    else return days + ' days';
  };
  return (
    <>
      <Card elevation={0}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe'>
              <PersonRounded />
            </Avatar>
          }
          action={
            <IconButton
              aria-label='show more'
              aria-controls={notificationOptionId}
              aria-haspopup='true'
              onClick={handleNotificationOptionOpen}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
          }
          title={
            <div className='center-horizontal'>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: notificationBodyFactory(notification),
                }}
                className='mx-1'
              ></Typography>
            </div>
          }
        />
        <Grid align='right'>
          {/* notification?.content.includes('followed you') ? (
            <Button variant='text'>Follow back</Button>
          ) : (
            '' 
          ) */}
          <Typography>{getCreationTime(notification?.date)}</Typography>
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
