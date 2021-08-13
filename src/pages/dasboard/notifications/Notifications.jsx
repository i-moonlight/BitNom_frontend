import { useQuery } from '@apollo/client';
import {
  Container,
  Divider,
  Grid,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Drafts, Inbox, List } from '@material-ui/icons';
import React from 'react';
import Screen from '../../../components/Screen';
import { GET_USER_NOTIFICATIONS } from '../utilities/queries';
import NotificationsListCard from './NotificationsListCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Notifications() {
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
                <SideBarMenu />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <NotificationsListCard notifications={allNotifications} />
            </Grid>
            <Grid item md={4} lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function SideBarMenu() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div
      style={{
        // position: 'sticky',
        // top: 176,
        width: '100%',
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        height: 200,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis
      explicabo deserunt minus ullam omnis maxime quam, similique cum? Fugiat!
      <List component='nav'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis
        explicabo deserunt minus ullam omnis maxime quam, similique cum? Fugiat!
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary='Drafts' />
        </ListItem>
      </List>
      <Divider />
      <List component='nav' aria-label='secondary mailbox folder'>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary='Trash' />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary='Spam' />
        </ListItem>
      </List>
    </div>
  );
}
