import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { ArrowBack, RoomRounded, VideocamRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Screen from '../../../components/Screen';
import { QUERY_FETCH_PROFILE, QUERY_LOAD_EVENTS } from '../utilities/queries';
import CreateEvent from './CreateEvent';
import CreateEventCard from './CreateEventCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function Events() {
  const classes = useStyles();
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const state = useSelector((st) => st);
  const user = state.auth.user;

  const {
    //  loading,
    data: profileData,
  } = useQuery(QUERY_FETCH_PROFILE, {
    context: { clientName: 'users' },
  });

  const { loading: eventsLoading, data: eventsData } = useQuery(
    QUERY_LOAD_EVENTS,
    {
      variables: {
        data: { host: user?._id, limit: 20 },
      },
    }
  );

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <CreateEventCard setOpen={(open) => setCreateEventOpen(open)} />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <EventListCard
                loading={eventsLoading}
                events={eventsData?.Events?.get}
              />
            </Grid>
            <Grid item md={4} lg={3}>
              {/* <Hidden smDown></Hidden> */}
            </Grid>
          </Grid>
        </Container>
      </div>
      <CreateEvent
        profileData={profileData?.Users?.profile}
        open={createEventOpen}
        setOpen={(open) => setCreateEventOpen(open)}
      />
    </Screen>
  );
}

function EventListCard({ events, loading }) {
  const history = useHistory();
  const truncateText = (str, n, b) => {
    if (str.length <= n) {
      return str;
    }
    const useWordBoundary = b || true;
    const subString = str.substr(0, n - 1); // the original check
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + '...'
    );
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Link to='/dashboard'>
            <IconButton
              size='small'
              className='m-1 p-1'
              aria-label='back'
              color='inherit'
            >
              <ArrowBack />
            </IconButton>
          </Link>
        }
        title={
          <div className='center-horizontal'>
            <Typography variant='h6'>Events</Typography>
          </div>
        }
      />
      <Divider />

      <CardContent>
        <Grid item align='center'>
          {loading && (
            <CircularProgress color='primary' size={60} thickness={6} />
          )}
        </Grid>
        {events?.length < 1 && (
          <Grid align='center'>
            <Typography variant='body1' color='primary'>
              You have not hosted any events on Bitnorm yet.
            </Typography>
          </Grid>
        )}
        {events &&
          events?.map((event) => (
            <Card
              elevation={0}
              key={event?._id}
              onClick={() => history.push(`/dashboard/events/${event?._id}`)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 20,
                marginTop: 20,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  backgroundImage:
                    event?.image !== null && event?.image?.trim() !== ''
                      ? 'url(' +
                        process.env.REACT_APP_BACKEND_URL +
                        event?.image +
                        ')'
                      : `url('${'https://picsum.photos/200/300'}')`,
                  backgroundSize: 'cover',
                  width: 170,
                  height: 110,
                  borderRadius: 8,
                  marginRight: 10,
                }}
              ></div>

              <div
                style={{
                  display: 'grid',

                  alignItems: 'stretch',
                  height: 110,
                }}
              >
                <Hidden smDown>
                  <Typography color='textSecondary' variant='body2'>
                    {new Date(event?.date).toUTCString()}
                  </Typography>
                </Hidden>
                <Typography
                  style={{ textTransform: 'uppercase' }}
                  variant='body2'
                >
                  {event?.location?.type === 'physical'
                    ? event?.title
                    : `${event?.title} (Virtual) `}
                </Typography>
                {event?.location?.type === 'physical' ? (
                  <div className='center-horizontal'>
                    <RoomRounded color='primary' />
                    <Typography
                      color='primary'
                      style={{ textDecoration: 'underline' }}
                    >
                      <a
                        href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                        style={{ color: 'inherit', zIndex: '3' }}
                        onClick={(e) => e.stopPropagation()}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {truncateText(event?.location?.address, 40)}
                      </a>
                    </Typography>
                  </div>
                ) : (
                  <div className='center-horizontal'>
                    <VideocamRounded color='primary' />
                    <Typography
                      color='primary'
                      style={{ textDecoration: 'underline' }}
                    >
                      <a
                        //component='a'
                        href={event?.link}
                        style={{ color: 'inherit', zIndex: '3' }}
                        onClick={(e) => e.stopPropagation()}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Online
                      </a>
                    </Typography>
                  </div>
                )}

                <Typography variant='body2'>
                  {`${event?.attendees?.length} Going`}
                </Typography>
              </div>
            </Card>
          ))}
      </CardContent>
    </Card>
  );
}
