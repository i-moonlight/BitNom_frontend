/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@apollo/client';
import {
    ArrowBack,
    BookmarkBorderRounded,
    Launch,
    MoreHorizRounded,
    Public,
    RoomRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    Tab,
    Tabs,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
//import IosShareIcon from '@mui/icons-material/IosShare'
//import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import FlagResourceModal from '../bn_connect/popovers/FlagResourceModal';
import CreatePost from '../bn_connect/scroll/CreatePost';
import { contentBodyFactory, getDateOrdinal } from '../utilities/functions';
import {
    MUTATION_ATTEND_EVENT,
    MUTATION_CREATE_BOOKMARK,
    MUTATION_REMOVE_EVENT_ATTENDANCE,
    QUERY_EVENT_BY_ID,
    QUERY_FETCH_PROFILE,
} from '../utilities/queries';
import AttendeeComponent from './AttendeeComponent';
import CreateEvent from './CreateEvent';
import CreateEventCard from './CreateEventCard';
import MapContainer from './EventMap';
import EventOptionsPopover from './EventOptionsPopover';
import InviteFriends from './InviteFriends';
import UpdateEvent from './UpdateEvent';

const eventOptionsId = 'event-options-menu';

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

    endTime: {
        color: theme.palette.primary.main,
    },
    avatar: {
        backgroundColor: '#fed132',
        marginRight: '8px',
        [theme.breakpoints.up('md')]: {
            width: 80,
            height: 80,
        },
    },
}));

export default function EventView({ match }) {
    const [eventOptionsAnchorEl, setEventOptionsAnchorEl] = useState(null);
    const [openInvite, setOpenInvite] = useState(false);
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
    const [flaggedResource, setFlaggedResource] = useState(null);
    const [createScrollOpen, setCreateScrollOpen] = useState(false);
    const [createFlagOpen, setCreateFlagOpen] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    const mdDown = useMediaQuery('(max-width:1279px)');
    const lgUp = useMediaQuery('(min-width:1280px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const isEventOptionsOpen = Boolean(eventOptionsAnchorEl);
    const { loading: eventLoading, data: eventData } = useQuery(
        QUERY_EVENT_BY_ID,
        {
            variables: { _id: match?.params?.id },
        }
    );

    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const profile = profileData?.Users?.profile;

    const [attendEvent] = useMutation(MUTATION_ATTEND_EVENT);

    const [removeAttendance] = useMutation(MUTATION_REMOVE_EVENT_ATTENDANCE);

    const [createBookmark] = useMutation(MUTATION_CREATE_BOOKMARK);

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

    const handleEventOptionsClose = () => {
        setEventOptionsAnchorEl(null);
    };
    const handleEventOptionsOpen = (e) => {
        setEventOptionsAnchorEl(e.currentTarget);
    };

    const handleAttendEvent = () => {
        attendEvent({
            variables: {
                _id: eventData?.Events?.getById?._id,
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
                _id: eventData?.Events?.getById?._id,
            },
            refetchQueries: [
                {
                    query: QUERY_EVENT_BY_ID,
                    variables: { _id: match?.params?.id },
                },
            ],
        });
    };

    const handleCreateBookmark = () => {
        createBookmark({
            variables: {
                data: {
                    _id: eventData?.Events?.getById?._id,
                    type: 'event',
                },
            },
        });
        toast.success('Added to saved items', {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        handleEventOptionsClose();
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

    const getAttendeeStatus = useCallback(
        (input) => {
            let status = false;
            input?.attendees?.forEach((item) => {
                if (item?.attendee?._id === profile?._id) {
                    return (status = true);
                }
            });
            return status;
        },
        [profile?._id]
    );

    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        if (targetLink.target == '_blank') {
            window.open(targetLink.href, '_blank');
        } else {
            history.push(targetLink.href.substring(location.origin.length));
        }
    };

    useEffect(() => {
        if (getAttendeeStatus(eventData?.Events?.getById) == true) {
            setAttendanceText('Attending');
        } else {
            setAttendanceText('Attend');
        }
    }, [eventData?.Events?.getById, getAttendeeStatus]);

    return (
        <Screen>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Event | Bitnorm</title>
                <link
                    rel="canonical"
                    href={`${window.location.origin}/events/${eventData?.Events?.getById?._id}`}
                />
            </Helmet>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <Card
                                    variant="outlined"
                                    style={{ marginBottom: 12 }}
                                >
                                    <CardHeader
                                        avatar={
                                            <IconButton
                                                size="small"
                                                aria-label="back"
                                                color="inherit"
                                                onClick={() => history.goBack()}
                                            >
                                                <ArrowBack />
                                            </IconButton>
                                        }
                                    />
                                </Card>
                                <CreateEventCard
                                    setOpen={(open) => setCreateEventOpen(open)}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <Grid item align="center">
                                {eventLoading && (
                                    <CircularProgress
                                        color="primary"
                                        size={60}
                                        thickness={6}
                                    />
                                )}
                            </Grid>
                            {eventData?.Events?.getById && (
                                <div>
                                    {!lgUp && (
                                        <Grid item lg={3}>
                                            <Card
                                                variant="outlined"
                                                style={{ marginBottom: 12 }}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <IconButton
                                                            size="small"
                                                            aria-label="back"
                                                            color="inherit"
                                                            onClick={() =>
                                                                history.goBack()
                                                            }
                                                        >
                                                            <ArrowBack />
                                                        </IconButton>
                                                    }
                                                />
                                            </Card>
                                        </Grid>
                                    )}
                                    <Card className="mb-3" variant={'outlined'}>
                                        <CardMedia
                                            style={{
                                                height: 200,
                                                backgroundColor: '#ddd',
                                            }}
                                            image={
                                                eventData?.Events?.getById
                                                    ?.image &&
                                                eventData?.Events?.getById
                                                    ?.image !== null
                                                    ? process.env
                                                          .REACT_APP_BACKEND_URL +
                                                      eventData?.Events?.getById
                                                          ?.image
                                                    : 'https://picsum.photos/400/500'
                                            }
                                            component="img"
                                            // title='Contemplative Reptile'
                                        />
                                        <CardContent
                                            style={{
                                                position: 'relative',
                                                top: -60,
                                                marginBottom: -60,
                                            }}
                                        >
                                            <div className="d-flex">
                                                <div>
                                                    <Avatar
                                                        variant="rounded"
                                                        style={{
                                                            backgroundColor:
                                                                '#fed132',
                                                            marginRight: 12,
                                                            marginBottom: 12,
                                                            width: 80,
                                                            height: 80,
                                                        }}
                                                    >
                                                        {getDateOrdinal(
                                                            moment
                                                                .utc(
                                                                    eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                        ?.startDate
                                                                )
                                                                ._d.getDate()
                                                        )}
                                                    </Avatar>
                                                    <Typography
                                                        className="pt-1"
                                                        variant="h6"
                                                        color="primary"
                                                        gutterBottom
                                                    >
                                                        {moment(
                                                            eventData?.Events
                                                                ?.getById
                                                                ?.startDate
                                                        ).format(
                                                            'ddd, MMMM Do YYYY, h:mm a'
                                                        )}
                                                    </Typography>
                                                    <Typography
                                                        gutterBottom
                                                        color="textSecondary"
                                                        variant="body1"
                                                    >
                                                        {
                                                            eventData?.Events
                                                                ?.getById?.title
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        gutterBottom
                                                        color="textSecondary"
                                                        variant="body2"
                                                    >
                                                        {`${
                                                            eventData?.Events
                                                                ?.getById
                                                                ?.attendees
                                                                ?.length
                                                        } ${
                                                            new Date(
                                                                eventData?.Events?.getById?.endDate
                                                            ).getTime() <
                                                            new Date().getTime()
                                                                ? 'Attended'
                                                                : 'Going'
                                                        }`}
                                                    </Typography>
                                                </div>

                                                <div
                                                    style={{
                                                        flex: 1,
                                                        position: 'relative',
                                                        top: 60,
                                                    }}
                                                    className="space-between"
                                                >
                                                    <Typography></Typography>
                                                    <Typography
                                                        className="text-success"
                                                        variant="body2"
                                                    >
                                                        {eventData?.Events
                                                            ?.getById?.host
                                                            ?._id ===
                                                        profile?._id ? (
                                                            <Button
                                                                style={{
                                                                    display:
                                                                        new Date(
                                                                            eventData?.Events?.getById?.endDate
                                                                        ).getTime() <
                                                                            new Date().getTime() &&
                                                                        'none',
                                                                }}
                                                                color="primary"
                                                                onClick={() => {
                                                                    setEventToEdit(
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                    );
                                                                    setUpdateEventOpen(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                style={{
                                                                    display:
                                                                        new Date(
                                                                            eventData?.Events?.getById?.endDate
                                                                        ).getTime() <
                                                                            new Date().getTime() &&
                                                                        'none',
                                                                }}
                                                                color="primary"
                                                                onMouseOver={() =>
                                                                    getAttendeeStatus(
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                    ) &&
                                                                    setAttendanceText(
                                                                        'Remove Attendance'
                                                                    )
                                                                }
                                                                onMouseLeave={() => {
                                                                    if (
                                                                        getAttendeeStatus(
                                                                            eventData
                                                                                ?.Events
                                                                                ?.getById
                                                                        )
                                                                    ) {
                                                                        setAttendanceText(
                                                                            'Attending'
                                                                        );
                                                                    } else {
                                                                        setAttendanceText(
                                                                            'Attend'
                                                                        );
                                                                    }
                                                                }}
                                                                onClick={
                                                                    getAttendeeStatus(
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                    )
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
                                        <CardActions className="space-between">
                                            <div>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChange}
                                                    indicatorColor="primary"
                                                    variant="fullWidth"
                                                >
                                                    <Tab
                                                        key={'About'}
                                                        label={'About'}
                                                        disableRipple
                                                        style={{
                                                            textTransform:
                                                                'none',
                                                        }}
                                                    />
                                                    <Tab
                                                        key={'Attendees'}
                                                        label={'Attendees'}
                                                        disableRipple
                                                        style={{
                                                            textTransform:
                                                                'none',
                                                        }}
                                                    />
                                                </Tabs>
                                            </div>
                                            <Grid
                                                style={{
                                                    display: 'inline-block',
                                                }}
                                                align="right"
                                            >
                                                {!smDown && (
                                                    <>
                                                        <Button
                                                            size="small"
                                                            variant="outlined"
                                                            color="primary"
                                                            onClick={() => {
                                                                setOpenInvite(
                                                                    true
                                                                );
                                                            }}
                                                            style={{
                                                                display:
                                                                    (eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                        ?.host
                                                                        ?._id !==
                                                                        profile?._id ||
                                                                        new Date(
                                                                            eventData?.Events?.getById?.endDate
                                                                        ).getTime() <
                                                                            new Date().getTime()) &&
                                                                    'none',
                                                                marginRight:
                                                                    '3px',
                                                            }}
                                                        >
                                                            Invite friends
                                                        </Button>

                                                        <Tooltip title="Save this event">
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleCreateBookmark();
                                                                }}
                                                            >
                                                                <BookmarkBorderRounded color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                )}
                                                <Tooltip title="Share this event">
                                                    <IconButton
                                                        onClick={() => {
                                                            setCreateScrollOpen(
                                                                true
                                                            );
                                                            setSharedResource(
                                                                eventData
                                                                    ?.Events
                                                                    ?.getById
                                                            );
                                                        }}
                                                    >
                                                        <Launch color="primary" />
                                                    </IconButton>
                                                </Tooltip>
                                                <IconButton
                                                    onClick={
                                                        handleEventOptionsOpen
                                                    }
                                                >
                                                    <MoreHorizRounded />
                                                </IconButton>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                    {value === 0 && (
                                        <>
                                            <Card className="mb-3">
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="body1"
                                                    >
                                                        Details
                                                    </Typography>
                                                    <div
                                                        className={
                                                            classes.details
                                                        }
                                                    >
                                                        <div>
                                                            <Typography
                                                                display="inline-flex"
                                                                className="center-horizontal"
                                                                variant="body2"
                                                                gutterBottom
                                                            >
                                                                <Launch
                                                                    fontSize="small"
                                                                    style={{
                                                                        marginRight:
                                                                            '5px',
                                                                    }}
                                                                />
                                                                :
                                                                <Typography
                                                                    style={{
                                                                        marginLeft:
                                                                            '2px',
                                                                    }}
                                                                    component="a"
                                                                    href={
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                            ?.link
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    {
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                            ?.link
                                                                    }
                                                                </Typography>
                                                            </Typography>

                                                            <Typography
                                                                display="inline"
                                                                className="center-horizontal"
                                                                variant="body2"
                                                            >
                                                                <span>
                                                                    End date :{' '}
                                                                    <span
                                                                        className={
                                                                            classes.endTime
                                                                        }
                                                                    >
                                                                        {moment(
                                                                            eventData
                                                                                ?.Events
                                                                                ?.getById
                                                                                ?.endDate
                                                                        ).format(
                                                                            'ddd, MMMM Do YYYY, h:mm a'
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            </Typography>
                                                            <Typography
                                                                display="inline-flex"
                                                                className="center-horizontal"
                                                                gutterBottom
                                                            >
                                                                <Typography variant="body2">
                                                                    Organizers :
                                                                </Typography>
                                                                <Typography
                                                                    display="inline-flex"
                                                                    className="center-horizontal"
                                                                >
                                                                    {eventData?.Events?.getById?.organizers?.map(
                                                                        (
                                                                            org
                                                                        ) => (
                                                                            <Typography
                                                                                variant="body2"
                                                                                component="a"
                                                                                style={{
                                                                                    margin: '0px 4px',
                                                                                }}
                                                                                key={
                                                                                    org?._id
                                                                                }
                                                                                href="#"
                                                                            >
                                                                                {
                                                                                    org?.displayName
                                                                                }
                                                                            </Typography>
                                                                        )
                                                                    )}
                                                                </Typography>
                                                            </Typography>
                                                            <Typography
                                                                display="inline-flex"
                                                                className="center-horizontal"
                                                                gutterBottom
                                                            >
                                                                <Typography variant="body2">
                                                                    Tags :
                                                                </Typography>
                                                                <Typography
                                                                    display="inline-flex"
                                                                    className="center-horizontal"
                                                                >
                                                                    {eventData?.Events?.getById?.tags?.map(
                                                                        (
                                                                            tag
                                                                        ) => (
                                                                            <Typography
                                                                                variant="body2"
                                                                                component="a"
                                                                                style={{
                                                                                    margin: '0px 4px',
                                                                                }}
                                                                                key={
                                                                                    tag
                                                                                }
                                                                                href="#"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </Typography>
                                                                        )
                                                                    )}
                                                                </Typography>
                                                            </Typography>
                                                            <Typography
                                                                display="inline-flex"
                                                                className="center-horizontal"
                                                                variant="body2"
                                                                gutterBottom
                                                            >
                                                                <Public
                                                                    fontSize="small"
                                                                    style={{
                                                                        marginRight:
                                                                            '5px',
                                                                    }}
                                                                />
                                                                Public
                                                            </Typography>
                                                        </div>
                                                        {eventData?.Events
                                                            ?.getById?.location
                                                            ?.type ===
                                                            'physical' && (
                                                            <div>
                                                                <MapContainer
                                                                    latitude={
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                            ?.location
                                                                            ?.lat
                                                                    }
                                                                    longitude={
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                            ?.location
                                                                            ?.long
                                                                    }
                                                                />
                                                                <div className="center-horizontal">
                                                                    <RoomRounded color="primary" />
                                                                    <Typography
                                                                        color="primary"
                                                                        style={{
                                                                            textDecoration:
                                                                                'underline',
                                                                        }}
                                                                    >
                                                                        <a
                                                                            href={`https://www.google.com/maps/@?api=1&map_action=map&center=${eventData?.Events?.getById?.location?.lat}%2C${eventData?.Events?.getById?.location?.long}`}
                                                                            style={{
                                                                                color: 'inherit',
                                                                            }}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                        >
                                                                            {truncateText(
                                                                                eventData
                                                                                    ?.Events
                                                                                    ?.getById
                                                                                    ?.location
                                                                                    ?.address,
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
                                            <Card className="mb-3">
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="body1"
                                                    >
                                                        Description
                                                    </Typography>
                                                    <Typography
                                                        component="p"
                                                        variant="body2"
                                                    >
                                                        <Typography
                                                            onClick={(e) =>
                                                                contentClickHandler(
                                                                    e
                                                                )
                                                            }
                                                            style={{
                                                                zIndex: 2,
                                                            }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: contentBodyFactory(
                                                                    eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                ),
                                                            }}
                                                        ></Typography>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                            <Card className="mb-3">
                                                <CardContent>
                                                    <Typography
                                                        gutterBottom
                                                        variant="body1"
                                                    >
                                                        Host
                                                    </Typography>
                                                    <div className="space-between">
                                                        <div className="center-horizontal">
                                                            <Avatar
                                                                variant="rounded"
                                                                className={
                                                                    classes.avatar
                                                                }
                                                            ></Avatar>
                                                            <Typography variant="body1">
                                                                {
                                                                    eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                        ?.host
                                                                        ?.displayName
                                                                }
                                                            </Typography>
                                                        </div>
                                                        <Typography>
                                                            <Button variant="outlined">
                                                                Subscribe
                                                            </Button>
                                                        </Typography>
                                                    </div>
                                                    <Typography
                                                        style={{
                                                            marginTop: '8px',
                                                        }}
                                                        variant="body1"
                                                        component="p"
                                                    >
                                                        {
                                                            eventData?.Events
                                                                ?.getById?.host
                                                                ?.bio
                                                        }
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </>
                                    )}
                                    {value === 1 && (
                                        <Card className="mb-3">
                                            <CardContent>
                                                {eventData?.Events?.getById
                                                    ?.attendees?.length > 0 ? (
                                                    <>
                                                        <Typography variant="body1">
                                                            Attending Event
                                                        </Typography>
                                                        <List component="div">
                                                            {eventData?.Events?.getById?.attendees?.map(
                                                                (user) => (
                                                                    <AttendeeComponent
                                                                        item={
                                                                            user
                                                                        }
                                                                        key={
                                                                            user
                                                                                ?.attendee
                                                                                ?._id
                                                                        }
                                                                        getFollowStatus={
                                                                            getFollowStatus
                                                                        }
                                                                        profile={
                                                                            profile
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </List>
                                                    </>
                                                ) : (
                                                    <Grid align="center">
                                                        <Typography
                                                            variant="body1"
                                                            color="primary"
                                                        >
                                                            {eventData?.Events
                                                                ?.getById?.host
                                                                ?._id ===
                                                            profile?._id
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
            <InviteFriends
                setOpenInvite={setOpenInvite}
                profile={profile}
                openInvite={openInvite}
                eventId={eventData?.Events?.getById?._id}
            />
            <EventOptionsPopover
                event={eventData?.Events?.getById}
                profile={profile}
                eventOptionsAnchorEl={eventOptionsAnchorEl}
                eventOptionsId={eventOptionsId}
                setOpenInvite={setOpenInvite}
                isEventOptionsOpen={isEventOptionsOpen}
                setFlaggedResource={setFlaggedResource}
                setOpenFlag={setCreateFlagOpen}
                handleEventOptionsClose={handleEventOptionsClose}
                handleCreateBookmark={handleCreateBookmark}
            />
            <FlagResourceModal
                openFlag={createFlagOpen}
                setOpenFlag={(openFlag) => setCreateFlagOpen(openFlag)}
                flaggedResource={flaggedResource}
                setFlaggedResource={setFlaggedResource}
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
