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
  MUTATION_FOLLOW_USER,
  MUTATION_UNFOLLOW_USER,
  QUERY_FETCH_PROFILE,
  QUERY_LOAD_SCROLLS,
  //NOTIFICATIONS_SUBSCRIPTION,
} from '../utilities/queries';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
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

  const {
    //error: profileError,
    //  loading,
    data: profileData,
  } = useQuery(QUERY_FETCH_PROFILE, {
    context: { clientName: 'users' },
  });

  const { data: userScrolls } = useQuery(QUERY_LOAD_SCROLLS, {
    variables: { data: { author: user?._id, limit: 500 } },
  });

  const suggestedUsers = usersData?.Users?.get?.filter(
    (item) => item?._id !== 'bn-ai' && item?._id !== user?._id
  );

  const getFollowStatus = (user) => {
    let status;
    profileData?.Users?.profile?.following?.forEach((item) => {
      if (item?.userId === user?._id) {
        status = item?.userId;
      }
    });
    return status;
  };
  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard
                  following={profileData?.Users?.profile?.following?.length}
                  followers={profileData?.Users?.profile?.followers?.length}
                  scrolls={userScrolls?.Posts?.get?.length}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <Card>
                <Typography className='mx-4 my-1' variant='body1'>
                  People you may know
                </Typography>

                <Divider />
                <CardContent>
                  {suggestedUsers?.map((user) => (
                    <ListItemComponent
                      key={user?._id}
                      getFollowStatus={getFollowStatus}
                      item={user}
                    />
                  ))}
                </CardContent>
              </Card>
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

function ListItemComponent({ item, getFollowStatus }) {
  const [status, setStatus] = React.useState();
  React.useEffect(() => {
    if (getFollowStatus(item)) setStatus(true);
  }, [getFollowStatus(item)]);

  const [
    followUser,
    {
      data: followData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_FOLLOW_USER);
  const [
    unFollowUser,
    {
      data: unFollowData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_UNFOLLOW_USER);
  const handleFollowUser = (user_id) => {
    followUser({
      variables: {
        data: {
          user_id: user_id,
        },
      },
      context: { clientName: 'users' },
      refetchQueries: [
        {
          query: QUERY_FETCH_PROFILE,
          context: { clientName: 'users' },
        },
      ],
    });
    if (followData?.Users?.follow == true)
      console.log(followData?.Users?.follow);
    setStatus(true);
    //setFollowing(following + 1);
  };
  const handleUnFollowUser = (user_id) => {
    unFollowUser({
      variables: {
        data: {
          user_id: user_id,
        },
      },
      context: { clientName: 'users' },
      refetchQueries: [
        {
          query: QUERY_FETCH_PROFILE,
          context: { clientName: 'users' },
        },
      ],
    });
    if (unFollowData?.Users?.unFollow == true)
      console.log(unFollowData?.Users?.unFollow);
    setStatus();
    //setFollowing(following - 1);
  };
  return (
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
          onClick={() =>
            status ? handleUnFollowUser(item?._id) : handleFollowUser(item?._id)
          }
          className='mx-2'
          size='small'
          variant='outlined'
          color='primary'
        >
          {status ? 'Unfollow' : 'Follow'}
        </Button>
      </ListItemIcon>
    </ListItem>
  );
}
