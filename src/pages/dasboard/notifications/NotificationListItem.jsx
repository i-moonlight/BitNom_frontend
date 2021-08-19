import React, { useState } from 'react';
import {
  Avatar,
  Card,
  Grid,
  CardHeader,
  IconButton,
  Divider,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MoreVert, FiberManualRecord } from '@material-ui/icons';
import {
  notificationBodyFactory,
  getCreationTime,
} from '../utilities/functions';
import { getUserInitials } from '../../../utilities/Helpers';
import NotificationOptionPopover from '../../../components/navbar/dashboard/popovers/NotificationOptionPopover';

const notificationOptionId = 'menu-notification-option';

export default function NotificationListItem({ notification }) {
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);
  const state = useSelector((state) => state);
  const user = state.auth.user;

  const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);
  const handleNotificationOptionClose = () => {
    setNotificationOptionAnchorEl(null);
  };
  const handleNotificationOptionOpen = (event) => {
    setNotificationOptionAnchorEl(event.currentTarget);
  };
  const getReadStatus = (notification) => {
    let read;
    notification.to_notify?.forEach((item) => {
      if (item.user_id == user._id) {
        read = item.read;
      }
    });
    return read;
  };
  const getNotifying = (notification) => {
    let name;
    notification?.content_entities?.forEach((item) => {
      if (item.type === 'resource_tag') {
        name = item.url.displayName;
      }
    });
    return name;
  };
  const userInitials = getUserInitials(getNotifying(notification));
  return (
    <>
      <Card elevation={0}>
        <div
          style={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr 22fr',
          }}
        >
          <div>
            <FiberManualRecord
              style={{
                fontSize: '15px',
              }}
              color={
                getReadStatus(notification) == 'true' ? 'disabled' : 'primary'
              }
            />
          </div>

          <CardHeader
            avatar={<Avatar aria-label='recipe'>{userInitials}</Avatar>}
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
        </div>
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
