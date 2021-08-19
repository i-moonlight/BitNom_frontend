import { useQuery } from '@apollo/client';
import {
  Container,
  Card,
  Grid,
  Hidden,
<<<<<<< HEAD
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
=======
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  Drafts,
  Inbox,
  List,
  MoreVert,
  PersonRounded,
} from '@material-ui/icons';
>>>>>>> 3542e0c959b769e30ddd9a37f720d3ace060d02f
import React from 'react';
import Screen from '../../../components/Screen';
import { GET_USER_NOTIFICATIONS } from '../utilities/queries';
import NotificationsListCard from './NotificationsListCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  sidebar: {
    width: '100%',
    maxWidth: 360,
    background: 'transparent',
    //color: theme.typography.textPrimary,
  },
}));

export default function Notifications() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  const { loading, data } = useQuery(GET_USER_NOTIFICATIONS, {
    variables: { limit: 20 },
  });
  const allNotifications = data?.Notification?.get;

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg' disableGutters>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <SideBarMenu
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <NotificationsListCard
                selectedIndex={selectedIndex}
                notifications={allNotifications}
                loading={loading}
              />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function SideBarMenu({ selectedIndex, setSelectedIndex }) {
  const classes = useStyles();
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Card elevation={0} color='text.primary' className={classes.sidebar}>
      <List component='nav' aria-label='secondary mailbox folders'>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemText primary='All Notifications' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary='Comments and Mentions' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary='Reactions' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary='Your Content' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemText primary='Your Profile' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemText primary='Job Board' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemText primary='Forum' />
        </ListItem>
        <ListItem
          button
          dense
          disableRipple
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemText primary='Announcements' />
        </ListItem>
      </List>
<<<<<<< HEAD
=======
    </div>
  );
}

function NotificationListCard() {
  return (
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
        {[1, 2, 3].map(item => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className='center-horizontal'>
                  <Typography variant='body2' className='mx-1'>
                    Andy bo Wu{' '}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    sent a friend request
                  </Typography>
                </div>
              }
              secondary='50 minutes ago'
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
                // '&.MuiListItemIconRoot': {
                //   minWidth: 20,
                // },
              }}
            >
              <MoreVert />
            </ListItemIcon>
          </ListItem>
        ))}
      </CardContent>
>>>>>>> 3542e0c959b769e30ddd9a37f720d3ace060d02f
    </Card>
  );
}
