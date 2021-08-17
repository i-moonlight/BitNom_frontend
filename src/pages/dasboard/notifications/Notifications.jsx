import { useQuery } from '@apollo/client';
import {
  Container,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Drafts, Inbox } from '@material-ui/icons';
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
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 360,
        color: '#fff',
      }}
    >
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
      </List>
    </div>
  );
}
