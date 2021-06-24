import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Hidden,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { PersonRounded } from '@material-ui/icons';
import React from 'react';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import UserCard from './bn_connect/UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function People() {
  const classes = useStyles();

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <PeopleListCard />
            </Grid>
            <Grid item md={4} lg={3}>
              {/* <Hidden smDown></Hidden> */}
            </Grid>
          </Grid>
        </Container>
      </div>
    </Screen>
  );
}

function PeopleListCard() {
  return (
    <Card>
      <Typography className='mx-4 my-1' variant='h6'>
        People you may know
      </Typography>

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
                  <Typography color='textSecondary'>@andybuwu</Typography>
                </div>
              }
              secondary='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi, accusamus. Laudantium vitae corrupti totam sed molestias, veniam sunt vero distinctio.'
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
                '&.MuiListItemIcon-root': {
                  minWidth: 20,
                },
              }}
            >
              <Button
                className='mx-2'
                size='small'
                variant='outlined'
                color='primary'
              >
                Follow
              </Button>
            </ListItemIcon>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
}
