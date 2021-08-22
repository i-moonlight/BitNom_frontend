import React from 'react';
import { Card, Grid, Divider, Typography } from '@material-ui/core';
import NotificationListItem from './NotificationListItem';

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
      <Card style={{ padding: '0 8px 10px 8px' }}>
        <div className='space-between'>
          <Typography className='mx-4 my-1' variant='body1'>
            Notifications
          </Typography>
          <Typography className='mx-4 my-1' variant='body1'>
            Settings
          </Typography>
        </div>
        <Divider />
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
        selectedIndex === 6 ||
        selectedIndex === 7 ? (
          <Grid align='center'>
            <Typography variant='body1' color='primary'>
              Nothing here yet.
            </Typography>
          </Grid>
        ) : (
          ''
        )}
      </Card>
    </>
  );
}
