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
import {
  QUERY_GET_USERS,
  //NOTIFICATIONS_SUBSCRIPTION,
} from '../utilities/queries';
import React from 'react';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import UserCard from '../bn_connect/UserCard';
import { getUserInitials } from '../../../utilities/Helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function People() {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const user = state.auth.user;

  const { data: usersData } = useQuery(QUERY_GET_USERS, {
    params: { data: { limit: 20 } },
    context: { clientName: 'users' },
  });

  const suggestedUsers = usersData?.Users?.get?.filter(
    (item) => item?._id !== 'bn-ai' && item?._id !== user?._id
  );
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
              <PeopleListCard suggestedUsers={suggestedUsers} />
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

function PeopleListCard({ suggestedUsers }) {
  return (
    <Card>
      <Typography className='mx-4 my-1' variant='body1'>
        People you may know
      </Typography>

      <Divider />
      <CardContent>
        {suggestedUsers?.map((item) => (
          <ListItem className='space-between' key={item?._id} divider>
            <ListItemAvatar>
              <Avatar
                src={
                  item?.profile_pic
                    ? process.env.REACT_APP_BACKEND_URL + item?.profile_pic
                    : ''
                }
              >
                {item?.profile_pic ? '' : getUserInitials(item?.displayName)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className='center-horizontal'>
                  <Typography variant='body2' className='mx-1'>
                    {item?.displayName}{' '}
                  </Typography>
                  <Typography variant='body2' color='textSecondary'>
                    {'@' + item?._id}
                  </Typography>
                </div>
              }
              secondary={item?.bio}
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
                '&.MuiListItemIconRoot': {
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
