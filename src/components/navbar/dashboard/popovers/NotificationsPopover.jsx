import {
  Avatar,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  //ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core';
import { SettingsRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCreationTime,
  notificationBodyFactory,
} from '../../../../pages/dasboard/utilities/functions';
import { getUserInitials } from '../../../../utilities/Helpers';

export default function NotificationsPopover({
  notificationAnchorEl,
  notificationId,
  isNotificationOpen,
  handleNotificationsClose,
  notifications,
  //notificationOptionId,
  //handleNotificationOptionOpen,
}) {
  return (
    <Popover
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationId}
      open={isNotificationOpen}
      onClose={handleNotificationsClose}
    >
      <List
        style={{ padding: 8, paddingBottom: 0, width: '300px' }}
        component={Card}
        variant='outlined'
      >
        <div className='space-between center-horizontal'>
          <Typography style={{ marginLeft: 8 }} variant='body2'>
            Notifications
          </Typography>
          <IconButton size='small' className='m-1 p-1'>
            <SettingsRounded />
          </IconButton>
        </div>
        <Divider />
        <NotificationPreview notifications={notifications} />
        <Divider />
      </List>
    </Popover>
  );
}

function NotificationPreview({ notifications }) {
  const getNotifyingUser = (notification) => {
    let name;
    notification?.content_entities?.forEach((item) => {
      if (item?.type === 'resource_tag') {
        name = item?.url?.displayName;
      }
    });
    return name;
  };

  return (
    <>
      {notifications?.length < 1 && (
        <Grid align='center'>
          <Typography color='Primary' variant='body2'>
            Nothing here yet.
          </Typography>
        </Grid>
      )}
      {notifications?.length > 0 &&
        notifications?.slice(0, 4)?.map((item) => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar
                style={{
                  backgroundColor: '#fed132',
                }}
              >
                {getUserInitials(getNotifyingUser(item))}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: notificationBodyFactory(item),
                    }}
                    className='mx-1'
                  ></Typography>
                </div>
              }
              secondary={getCreationTime(item?.date)}
            />
            {/* <ListItemIcon
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
                    </ListItemIcon> */}
          </ListItem>
        ))}
      {notifications?.length > 0 && (
        <Link to='/dashboard/notifications'>
          <Typography variant='body2' className='my-2' color='primary'>
            Show more
          </Typography>
        </Link>
      )}
    </>
  );
}
