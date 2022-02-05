/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@apollo/client';
import {
    ArrowBack,
    BookmarkBorderRounded,
    Launch,
    MoreHorizRounded,
    Public,
    RoomRounded,
    ShareRounded,
} from '@mui/icons-material';
import {
    Alert,
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
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '../../../components/Button';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import ExternalShareModal from '../bn_connect/popovers/ExternalShareModal';
import FlagResourceModal from '../bn_connect/popovers/FlagResourceModal';
import CreatePost from '../bn_connect/scroll/CreatePost';
import { contentBodyFactory, getDateOrdinal } from '../utilities/functions';
import {
    GET_BOOKMARKED_EVENTS,
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

export default function EventView() {
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
    const [openShareModal, setOpenShareModal] = useState(false);
    const [getEventErr, setGetEventErr] = useState(null);

    const classes = useStyles();
    const history = useHistory();
    const { eventId } = useParams();

    const mdDown = useMediaQuery('(max-width:1279px)');
    const lgUp = useMediaQuery('(min-width:1280px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const isEventOptionsOpen = Boolean(eventOptionsAnchorEl);

    const {
        loading: eventLoading,
        data: eventData,
        error: eventError,
    } = useQuery(QUERY_EVENT_BY_ID, {
        variables: { _id: eventId },
    });

    useEffect(() => {
        eventError &&
            eventError.graphQLErrors.length > 0 &&
            eventError.graphQLErrors?.forEach((err) => {
                if (
                    err?.state?._id[0] ==
                    'We did not find an event with the ID you provided!'
                ) {
                    setGetEventErr(
                        'This event might have been deleted by the host.'
                    );
                }
            });
    }, [eventError]);

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
                    variables: { _id: eventId },
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
                    variables: { _id: eventId },
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
            refetchQueries: [
                {
                    query: GET_BOOKMARKED_EVENTS,
                    variables: {
                        data: {
                            sortAscending: true,
                        },
                    },
                },
            ],
        });
        toast.success('Added to saved items');
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
            <SEO
                title={`Event | Bitnorm`}
                url={`${window.location.origin}/events/${eventData?.Events?.getById?._id}`}
                description={eventData?.Events?.getById?.description}
                image={
                    eventData?.Events?.getById?.image
                        ? process.env.REACT_APP_BACKEND_URL +
                          eventData?.Events?.getById?.image
                        : null
                }
                resource={eventData?.Events?.getById}
            />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={true}
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
                            <Grid item>
                                {getEventErr && (
                                    <Alert severity="error">
                                        <Typography>{getEventErr}</Typography>
                                    </Alert>
                                )}
                            </Grid>
                            {eventData?.Events?.getById && (
                                <div>
                                    {!lgUp && (
                                        <Grid
                                            item
                                            lg={3}
                                            style={{ marginBottom: '5px' }}
                                        >
                                            <Card>
                                                <CardContent>
                                                    <Grid align="center">
                                                        <div>
                                                            <div>
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
                                                                {/*  <EventRounded
                                                                    style={{
                                                                        //marginRight: 16,
                                                                        width: 30,
                                                                        height: 30,
                                                                    }}
                                                                /> */}
                                                            </div>
                                                            <Typography variant="body2">
                                                                Host an event on
                                                                BitNorm and
                                                                invite your
                                                                network
                                                            </Typography>
                                                        </div>
                                                        <Button
                                                            textCase
                                                            onClick={() =>
                                                                setCreateEventOpen(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Create Event
                                                        </Button>
                                                    </Grid>
                                                </CardContent>
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
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
                                                    eventData?.Events?.getById
                                                        ?.image
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
                                                            format(
                                                                new Date(
                                                                    eventData?.Events?.getById?.startDate
                                                                ),
                                                                'd'
                                                            )
                                                        )}
                                                    </Avatar>
                                                    <Typography
                                                        className="pt-1"
                                                        variant="h6"
                                                        color="primary"
                                                        gutterBottom
                                                    >
                                                        {format(
                                                            new Date(
                                                                eventData?.Events?.getById?.startDate
                                                            ),
                                                            'E, MMMM do y, h:mm aaa'
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
                                                        component="div"
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
                                        <CardActions className="space-between pb-0">
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
                                                        <ShareRounded color="primary" />
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
                                                        Description
                                                    </Typography>
                                                    <Typography
                                                        component="div"
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
                                                                overflowWrap:
                                                                    'break-word',
                                                                wordWrap:
                                                                    'break-word',
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
                                                        Details
                                                    </Typography>
                                                    <div
                                                        className={
                                                            classes.details
                                                        }
                                                    >
                                                        <div>
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
                                                                        {format(
                                                                            new Date(
                                                                                eventData?.Events?.getById?.endDate
                                                                            ),
                                                                            'E, MMMM do y, h:mm aaa'
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            </Typography>
                                                            <Typography
                                                                display="inline-flex"
                                                                className="center-horizontal"
                                                                gutterBottom
                                                                component="div"
                                                            >
                                                                <Typography variant="body2">
                                                                    Organizers :
                                                                </Typography>
                                                                <Typography
                                                                    display="inline-flex"
                                                                    className="center-horizontal"
                                                                    component="div"
                                                                >
                                                                    {eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                        ?.organizers
                                                                        ?.length <
                                                                        1 && (
                                                                        <Typography
                                                                            variant="body2"
                                                                            style={{
                                                                                margin: '0px 4px',
                                                                            }}
                                                                        >
                                                                            N/A
                                                                        </Typography>
                                                                    )}
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
                                                                component="div"
                                                            >
                                                                <Typography variant="body2">
                                                                    Tags :
                                                                </Typography>
                                                                <Typography
                                                                    display="inline-flex"
                                                                    className="center-horizontal"
                                                                    component="div"
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
                                                                                onClick={() =>
                                                                                    history.push(
                                                                                        `/hashtags/${tag.substring(
                                                                                            1
                                                                                        )}`
                                                                                    )
                                                                                }
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
                                                                component="div"
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
                                                        Host
                                                    </Typography>
                                                    <div className="space-between">
                                                        <div className="center-horizontal">
                                                            <Avatar
                                                                variant="rounded"
                                                                src={
                                                                    eventData
                                                                        ?.Events
                                                                        ?.getById
                                                                        ?.host
                                                                        ?.profile_pic &&
                                                                    process.env
                                                                        .REACT_APP_BACKEND_URL +
                                                                        eventData
                                                                            ?.Events
                                                                            ?.getById
                                                                            ?.host
                                                                            ?.profile_pic
                                                                }
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
                                                        <div>
                                                            <Button variant="outlined">
                                                                Subscribe
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <Typography
                                                        style={{
                                                            marginTop: '8px',
                                                            overflowWrap:
                                                                'break-word',
                                                            wordWrap:
                                                                'break-word',
                                                        }}
                                                        variant="body2"
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
                                                                ? '0 Attendees. Invite your network or share to your friends'
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
                setOpenShareModal={setOpenShareModal}
                setSharedResource={setSharedResource}
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
            <ExternalShareModal
                openShareModal={openShareModal}
                sharedResource={sharedResource}
                setSharedResource={setSharedResource}
                setOpenShareModal={setOpenShareModal}
            />
        </Screen>
    );
}

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
