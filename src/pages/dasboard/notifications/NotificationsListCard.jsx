import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { MoreVert, PersonRounded } from '@material-ui/icons';
import { notificationBodyFactory } from '../utilities/functions';

function NotificationsListCard({ notifications }) {
  const getCreationTime = (time) => {
    let ms = new Date().getTime() - time;
    let seconds = Math.round(ms / 1000);
    let minutes = Math.round(ms / (1000 * 60));
    let hours = Math.round(ms / (1000 * 60 * 60));
    let days = Math.round(ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) return 'a few seconds ago';
    else if (minutes < 60) return minutes + 'minutes';
    else if (hours < 24) return hours + 'h';
    else return days + 'd';
  };
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
          {notifications?.map((notification) => (
            <ListItem className='space-between' key={notification?._id} divider>
              <ListItemAvatar>
                <Avatar>
                  <PersonRounded />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className='center-horizontal'>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: notificationBodyFactory(notification),
                      }}
                      className='mx-1'
                    ></Typography>
                  </div>
                }
                secondary={getCreationTime(notification?.date)}
              />
              <ListItemIcon
                aria-label='show more'
                //   aria-controls={notificationOptionId}
                aria-haspopup='true'
                //   onClick={handleNotificationOptionOpen}
                color='inherit'
                style={{
                  marginRight: 0,
                  paddingRight: 0,
                  minWidth: 20,
                  // '&.MuiListItemIcon-root': {
                  //   minWidth: 20,
                  // },
                }}
              >
                <MoreVert />
              </ListItemIcon>
            </ListItem>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default NotificationsListCard;
