import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemIcon,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import {
  List,
  PersonRounded,
  MoreVert,
  Inbox,
  Drafts,
} from '@material-ui/icons';
import React from 'react';
import Screen from '../../components/Screen';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Notifications() {
  const classes = useStyles();

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
              <NotificationListCard />
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
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
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
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemText primary='Trash' />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemText primary='Spam' />
        </ListItem>
      </List>
    </div>
  );
}

function NotificationListCard() {
  return (
    <Card>
      <div className='space-between'>
        <Typography className='mx-4 my-1' variant='h6'>
          Notification
        </Typography>
        <Typography className='mx-4 my-1' variant='h6'>
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
                  <Typography className='mx-1'>Andy bo Wu </Typography>
                  <Typography color='textSecondary'>
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
  );
}
