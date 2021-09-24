import { useQuery, useMutation } from '@apollo/client';
import {
  Card,
  CardHeader,
  Container,
  CardMedia,
  CardContent,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Typography,
  CircularProgress,
  Avatar,
  Tabs,
  Tab,
  CardActions,
  Divider,
  List,
  Tooltip,
} from '@material-ui/core';
import {
  ArrowBack,
  MoreHorizRounded,
  Launch,
  Public,
  RoomRounded,
  ShareOutlined,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';
import Screen from '../../../components/Screen';
import { generateRandomColor } from '../utilities/functions';
import {
  QUERY_FETCH_PROFILE,
  QUERY_EVENT_BY_ID,
  MUTATION_ATTEND_EVENT,
  MUTATION_REMOVE_EVENT_ATTENDANCE,
} from '../utilities/queries';
import CreateEvent from './CreateEvent';
import UpdateEvent from './UpdateEvent';
import CreateEventCard from './CreateEventCard';
import GoogleApiWrapper from './EventMap';
import AttendeeComponent from './AttendeeComponent';
import CreatePost from '../bn_connect/scroll/CreatePost';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '3fr 2fr',
    },
  },
  avatar: {
    backgroundColor: generateRandomColor(),
    marginRight: '8px',
    [theme.breakpoints.up('md')]: {
      width: 80,
      height: 80,
    },
  },
}));

export default function EventView({ match }) {
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [updateEventOpen, setUpdateEventOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [value, setValue] = useState(0);
  const [attendanceText, setAttendanceText] = useState();

  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [imageDisabled, setImageDisabled] = useState(false);
  const [sharedResource, setSharedResource] = useState(null);
  const [createScrollOpen, setCreateScrollOpen] = useState(false);

  const classes = useStyles();

  const { loading: eventLoading, data: eventData } = useQuery(
    QUERY_EVENT_BY_ID,
    {
      variables: { _id: match?.params?.id },
    }
  );

  const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
    context: { clientName: 'users' },
  });

  const event = eventData?.Events?.getById;
  const profile = profileData?.Users?.profile;

  const [
    attendEvent,
    {
      data: attendData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_ATTEND_EVENT);

  const [
    removeAttendance,
    {
      data: removeAttendanceData,
      //  loading,
      //   error
    },
  ] = useMutation(MUTATION_REMOVE_EVENT_ATTENDANCE);

  // const state = useSelector(st => st);
  // const profile = state.auth.user;

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

  const handleAttendEvent = () => {
    attendEvent({
      variables: {
        _id: event?._id,
      },
      refetchQueries: [
        {
          query: QUERY_EVENT_BY_ID,
          variables: { _id: match?.params?.id },
        },
      ],
    });
  };

  const handleRemoveAttendance = () => {
    removeAttendance({
      variables: {
        _id: event?._id,
      },
      refetchQueries: [
        {
          query: QUERY_EVENT_BY_ID,
          variables: { _id: match?.params?.id },
        },
      ],
    });
    console.log(removeAttendanceData, attendData);
  };

  const handleChange = (e, val) => {
    setValue(val);
  };

  const getFollowStatus = (usr) => {
    let status;
    profileData?.Users?.profile?.following?.forEach((item) => {
      if (item?.userId?._id === usr?.attendee?._id) {
        status = true;
      }
    });
    return status;
  };

  useEffect(() => {
    if (getAttendeeStatus(event)) {
      setAttendanceText('Attending');
    } else {
      setAttendanceText('Attend');
    }
  }, [event]);

  const getAttendeeStatus = (input) => {
    let status;
    input?.attendees?.forEach((item) => {
      if (item?.attendee?._id === profile?._id) {
        status = true;
      } else {
        status = false;
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
                <Card variant='outlined' style={{ marginBottom: 12 }}>
                  <CardHeader
                    avatar={
                      <Link to='/dashboard/events'>
                        <IconButton
                          size='small'
                          aria-label='back'
                          color='inherit'
                        >
                          <ArrowBack />
                        </IconButton>
                      </Link>
                    }
                  />
                </Card>
                <CreateEventCard setOpen={(open) => setCreateEventOpen(open)} />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={7}>
              <Grid item align='center'>
                {eventLoading && (
                  <CircularProgress color='primary' size={60} thickness={6} />
                )}
              </Grid>
              {event && (
                <div>
                  <Hidden lgUp>
                    <Grid item lg={3}>
                      <Card variant='outlined' style={{ marginBottom: 12 }}>
                        <CardHeader
                          avatar={
                            <Link to='/dashboard/events'>
                              <IconButton
                                size='small'
                                aria-label='back'
                                color='inherit'
                              >
                                <ArrowBack />
                              </IconButton>
                            </Link>
                          }
                        />
                      </Card>
                    </Grid>
                  </Hidden>
                  <Card className='mb-3' variant={'outlined'}>
                    <CardMedia
                      style={{ height: 200, backgroundColor: '#ddd' }}
                      image={
                        event?.image && event?.image !== null
                          ? process.env.REACT_APP_BACKEND_URL + event?.image
                          : 'https://picsum.photos/400/500'
                      }
                      component='img'
                      // title='Contemplative Reptile'
                    />
                    <CardContent
                      style={{
                        position: 'relative',
                        top: -60,
                        marginBottom: -60,
                      }}
                    >
                      <div className='d-flex'>
                        <div>
                          <Avatar
                            variant='rounded'
                            style={{
                              backgroundColor: generateRandomColor(),
                              marginRight: 12,
                              marginBottom: 12,
                              width: 80,
                              height: 80,
                            }}
                          >
                            {moment.utc(event?.startDate)._d.getDate()}
                          </Avatar>
                          <Typography
                            className='pt-1'
                            variant='h6'
                            color='primary'
                            gutterBottom
                          >
                            {new Date(event?.startDate).toUTCString()}
                          </Typography>
                          <Typography
                            gutterBottom
                            color='textSecondary'
                            variant='body1'
                          >
                            {event?.title}
                          </Typography>
                          <Typography
                            gutterBottom
                            color='textSecondary'
                            variant='body2'
                          >
                            {`${event?.attendees?.length} Going`}
                          </Typography>
                        </div>

                        <div
                          style={{
                            flex: 1,
                            position: 'relative',
                            top: 60,
                          }}
                          className='space-between'
                        >
                          <Typography></Typography>
                          <Typography className='text-success' variant='body2'>
                            {event?.host?._id === profile?._id ? (
                              <Button
                                //onClick={handleAttendEvent}
                                color='primary'
                                onClick={() => {
                                  setEventToEdit(event);
                                  setUpdateEventOpen(true);
                                }}
                              >
                                Edit
                              </Button>
                            ) : (
                              <Button
                                color='primary'
                                onMouseEnter={() =>
                                  getAttendeeStatus(event) &&
                                  setAttendanceText('Remove Attendance')
                                }
                                onMouseLeave={() => {
                                  if (getAttendeeStatus(event)) {
                                    setAttendanceText('Attending');
                                  } else {
                                    setAttendanceText('Attend');
                                  }
                                }}
                                onClick={
                                  getAttendeeStatus(event)
                                    ? handleRemoveAttendance
                                    : handleAttendEvent
                                }
                              >
                                {attendanceText}
                              </Button>
                            )}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions className='space-between'>
                      <div>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor='primary'
                          variant='fullWidth'
                        >
                          <Tab
                            key={'About'}
                            label={'About'}
                            disableRipple
                            style={{ textTransform: 'none' }}
                          />
                          <Tab
                            key={'Attendees'}
                            label={'Attendees'}
                            disableRipple
                            style={{ textTransform: 'none' }}
                          />
                        </Tabs>
                      </div>
                      <Grid
                        style={{
                          display: 'inline-block',
                        }}
                        align='right'
                      >
                        <Hidden smDown>
                          <Button
                            size='small'
                            variant='outlined'
                            color='primary'
                            style={{
                              display:
                                event?.host?._id !== profile?._id && 'none',
                            }}
                          >
                            Invite friends
                          </Button>
                        </Hidden>
                        <Tooltip title='Share to followers'>
                          <IconButton>
                            <ShareOutlined
                              onClick={() => {
                                setCreateScrollOpen(true);
                                setSharedResource(event);
                              }}
                              color='primary'
                            />
                          </IconButton>
                        </Tooltip>
                        <IconButton>
                          <MoreHorizRounded />
                        </IconButton>
                      </Grid>
                    </CardActions>
                  </Card>
                  {value === 0 && (
                    <>
                      <Card className='mb-3'>
                        <CardContent>
                          <Typography gutterBottom variant='body1'>
                            Details
                          </Typography>
                          <div className={classes.details}>
                            <div>
                              <Typography
                                display='inline-flex'
                                className='center-horizontal'
                                variant='body2'
                              >
                                <Launch
                                  fontSize='small'
                                  style={{ marginRight: '5px' }}
                                />
                                Join here :
                                <Typography
                                  style={{ marginLeft: '2px' }}
                                  component='a'
                                  href={event?.link}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {event?.link}
                                </Typography>
                              </Typography>
                              <Typography
                                display='inline-flex'
                                className='center-horizontal'
                                variant='body2'
                              >
                                <Public
                                  fontSize='small'
                                  style={{ marginRight: '5px' }}
                                />
                                Public
                              </Typography>
                              <Typography
                                display='inline-flex'
                                className='center-horizontal'
                              >
                                <Typography variant='body2'>
                                  Tagged with :
                                </Typography>
                                <Typography
                                  display='inline-flex'
                                  className='center-horizontal'
                                >
                                  {event?.tags?.map((tag) => (
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      style={{
                                        margin: '0px 4px',
                                        textDecoration: 'underline',
                                      }}
                                      key={tag}
                                      href='#'
                                    >
                                      {tag}
                                    </Typography>
                                  ))}
                                </Typography>
                              </Typography>
                              <Typography display='inline-flex'>
                                <Typography variant='body2'>
                                  Ends On :
                                </Typography>
                                <Typography color='primary' variant='body2'>
                                  {String(new Date(event?.endDate))}
                                </Typography>
                              </Typography>
                            </div>
                            {event?.location?.type === 'physical' && (
                              <div>
                                <GoogleApiWrapper
                                  latitude={event?.location?.lat}
                                  longitude={event?.location?.long}
                                />
                                <div className='center-horizontal'>
                                  <RoomRounded color='primary' />
                                  <Typography
                                    color='primary'
                                    style={{ textDecoration: 'underline' }}
                                  >
                                    <a
                                      href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                                      style={{ color: 'inherit' }}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {truncateText(
                                        event?.location?.address,
                                        40
                                      )}
                                    </a>
                                  </Typography>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className='mb-3'>
                        <CardContent>
                          <Typography gutterBottom variant='body1'>
                            Description
                          </Typography>
                          <Typography component='p' variant='body2'>
                            {event?.description}
                          </Typography>
                        </CardContent>
                      </Card>
                      <Card className='mb-3'>
                        <CardContent>
                          <Typography gutterBottom variant='body1'>
                            Host
                          </Typography>
                          <div className='space-between'>
                            <div className='center-horizontal'>
                              <Avatar
                                variant='rounded'
                                className={classes.avatar}
                              ></Avatar>
                              <Typography variant='body1'>
                                {event?.host?.displayName}
                              </Typography>
                            </div>
                            <Typography>
                              <Button variant='outlined'>Subscribe</Button>
                            </Typography>
                          </div>
                          <Typography
                            style={{
                              marginTop: '8px',
                            }}
                            variant='body1'
                            component='p'
                          >
                            {event?.host?.bio}
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {value === 1 && (
                    <Card className='mb-3'>
                      <CardContent>
                        {event?.attendees?.length > 0 ? (
                          <>
                            <Typography variant='body1'>
                              Attending Event
                            </Typography>
                            <List>
                              {event?.attendees?.map((user) => (
                                <AttendeeComponent
                                  item={user}
                                  key={user?.attendee?._id}
                                  getFollowStatus={getFollowStatus}
                                  profile={profile}
                                />
                              ))}
                            </List>
                          </>
                        ) : (
                          <Grid align='center'>
                            <Typography variant='body1' color='primary'>
                              {event?.host?._id === profile?._id
                                ? 'Your event has not attendees yet. Invite your friends. or share to your followers'
                                : '0 Attendees'}
                            </Typography>
                          </Grid>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </Grid>
            <Grid item md={4} lg={2}></Grid>
          </Grid>
        </Container>
      </div>
      <CreateEvent
        profileData={profileData?.Users?.profile}
        open={createEventOpen}
        setOpen={(open) => setCreateEventOpen(open)}
      />
      <CreatePost
        profileData={profileData?.Users?.profile}
        open={createScrollOpen}
        setOpen={(open) => setCreateScrollOpen(open)}
        openImage={openImage}
        imageDisabled={imageDisabled}
        videoDisabled={videoDisabled}
        setImageDisabled={setImageDisabled}
        setVideoDisabled={setVideoDisabled}
        setOpenImage={setOpenImage}
        openVideo={openVideo}
        setOpenVideo={setOpenVideo}
        sharedResource={sharedResource}
        setSharedResource={setSharedResource}
      />
      <UpdateEvent
        profileData={profileData?.Users?.profile}
        openUpdate={updateEventOpen}
        setOpenUpdate={(open) => setUpdateEventOpen(open)}
        eventToEdit={eventToEdit}
        setEventToEdit={setEventToEdit}
      />
    </Screen>
  );
}
