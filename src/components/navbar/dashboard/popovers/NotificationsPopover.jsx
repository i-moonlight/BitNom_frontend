import { useQuery } from '@apollo/client';
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
import { PersonRounded, SettingsRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCreationTime,
  notificationBodyFactory,
} from '../../../../pages/dasboard/utilities/functions';
import { QUERY_GET_USER_NOTIFICATIONS } from '../../../utilities/queries.components';

export default function NotificationsPopover({
  notificationAnchorEl,
  notificationId,
  isNotificationOpen,
  handleNotificationsClose,
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
        <NotificationPreview />
        <Divider />
      </List>
    </Popover>
  );
}

function NotificationPreview() {
  const {
    data,
    //  error,
    // loading
  } = useQuery(QUERY_GET_USER_NOTIFICATIONS, {
    context: { clientName: 'users' },
  });

  let response = data?.Notification?.get;

  return (
    <>
      {response?.length < 1 && (
        <Grid align='center'>
          <Typography color='Primary' variant='body2'>
            Nothing here yet.
          </Typography>
        </Grid>
      )}
      {response?.length > 0 &&
        response?.slice(0, 4)?.map(item => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
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
      {response?.length > 0 && (
        <Link to='/dashboard/notifications'>
          <Typography variant='body2' className='my-2' color='primary'>
            Show more
          </Typography>
        </Link>
      )}
    </>
  );
}
