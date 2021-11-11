import { useQuery } from '@apollo/client';
import {
    ArrowBack,
    RoomRounded,
    VideocamRounded,
    EventRounded,
} from '@mui/icons-material';
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Screen from '../../../components/Screen';
import { Button } from '../../../components/Button';
import {
    GET_BOOKMARKED_EVENTS,
    QUERY_FETCH_PROFILE,
    QUERY_LOAD_EVENTS,
} from '../utilities/queries';
import CreateEvent from './CreateEvent';
import CreateEventCard from './CreateEventCard';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function Events() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [createEventOpen, setCreateEventOpen] = useState(false);

    const classes = useStyles();
    const state = useSelector((st) => st);
    const mdDown = useMediaQuery('(max-width:1279px)');

    const user = state.auth.user;

    const {
        //  loading,
        data: profileData,
    } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const { data: bookmarkedEvents, loading: bookmarksLoading } = useQuery(
        GET_BOOKMARKED_EVENTS,
        {
            variables: {
                data: {
                    sortAscending: true,
                },
            },
        }
    );

    const { loading: eventsLoading, data: eventsData } = useQuery(
        QUERY_LOAD_EVENTS,
        {
            variables: {
                data: { host: user?._id, limit: 50 },
            },
        }
    );

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <CreateEventCard
                                    setSelectedIndex={setSelectedIndex}
                                    selectedIndex={selectedIndex}
                                    setOpen={(open) => setCreateEventOpen(open)}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            {mdDown && (
                                <Card
                                    style={{
                                        marginBottom: '5px',
                                    }}
                                >
                                    <CardContent>
                                        <Grid align="center">
                                            <div>
                                                <EventRounded
                                                    style={{
                                                        //marginRight: 16,
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                />

                                                <Typography variant="body2">
                                                    Host an event on BitNorm and
                                                    invite your network
                                                </Typography>
                                            </div>
                                            <Button
                                                textCase
                                                onClick={() =>
                                                    setCreateEventOpen(true)
                                                }
                                            >
                                                Create Event
                                            </Button>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}
                            <EventListCard
                                selectedIndex={selectedIndex}
                                loading={eventsLoading}
                                events={eventsData?.Events?.get}
                                savedEvents={
                                    bookmarkedEvents?.Events?.getBookmarked
                                }
                                bookmarksLoading={bookmarksLoading}
                            />
                        </Grid>
                        <Grid item md={4} lg={3}>
                            {/* {!smDown && } */}
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

function EventListCard({
    events,
    loading,
    selectedIndex,
    savedEvents,
    bookmarksLoading,
}) {
    const upcomingEvents = events?.filter(
        (event) => new Date(event?.endDate).getTime() > new Date().getTime()
    );

    const pastEvents = events?.filter(
        (event) => new Date(event?.endDate).getTime() < new Date().getTime()
    );
    const history = useHistory();
    return (
        <Card>
            <CardHeader
                avatar={
                    <IconButton
                        size="small"
                        className="m-1 p-1"
                        aria-label="back"
                        color="inherit"
                        onClick={() => history.goBack()}
                    >
                        <ArrowBack />
                    </IconButton>
                }
                title={
                    <div className="center-horizontal">
                        <Typography>Your Events</Typography>
                    </div>
                }
            />
            <Divider />
            <CardContent>
                <Grid item align="center">
                    {(selectedIndex === 0 || selectedIndex === 1) &&
                        loading && (
                            <CircularProgress
                                color="primary"
                                size={60}
                                thickness={6}
                            />
                        )}
                    {selectedIndex === 2 && bookmarksLoading && (
                        <CircularProgress
                            color="primary"
                            size={60}
                            thickness={6}
                        />
                    )}
                </Grid>
                {selectedIndex === 0 && upcomingEvents?.length < 1 && (
                    <Grid align="center">
                        <Typography variant="body1" color="primary">
                            You have no upcoming events.
                        </Typography>
                    </Grid>
                )}
                {selectedIndex === 1 && pastEvents?.length < 1 && (
                    <Grid align="center">
                        <Typography variant="body1" color="primary">
                            You have no past events.
                        </Typography>
                    </Grid>
                )}
                {selectedIndex === 2 && savedEvents?.length < 1 && (
                    <Grid align="center">
                        <Typography variant="body1" color="primary">
                            You have not saved any events.
                        </Typography>
                    </Grid>
                )}
                {selectedIndex === 0 &&
                    upcomingEvents?.map((event) => (
                        <EventPreview key={event?._id} event={event} />
                    ))}
                {selectedIndex === 1 &&
                    pastEvents?.map((event) => (
                        <EventPreview key={event?._id} event={event} />
                    ))}
                {selectedIndex === 2 &&
                    savedEvents?.map((event) => (
                        <EventPreview key={event?._id} event={event} />
                    ))}
            </CardContent>
        </Card>
    );
}

function EventPreview({ event }) {
    const history = useHistory();
    const smDown = useMediaQuery('(max-width:959px)');

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
        <Card elevation={0} key={event?._id} className="mb-2">
            <CardActionArea
                onClick={() => history.push(`/events/${event?._id}`)}
            >
                <CardContent
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                    }}
                >
                    <div
                        style={{
                            backgroundImage:
                                event?.image !== null &&
                                'url(' +
                                    process.env.REACT_APP_BACKEND_URL +
                                    event?.image +
                                    ')',
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
                        {!smDown && (
                            <Typography color="textSecondary" variant="body2">
                                {moment(event?.startDate).format(
                                    'ddd, MMMM Do YYYY, h:mm a'
                                )}
                            </Typography>
                        )}
                        <Typography
                            style={{ textTransform: 'capitalize' }}
                            variant="body2"
                        >
                            {event?.location?.type === 'physical'
                                ? event?.title
                                : `${event?.title} - Virtual `}
                        </Typography>
                        {event?.location?.type === 'physical' ? (
                            <div className="center-horizontal">
                                <RoomRounded color="primary" />
                                <Typography
                                    color="primary"
                                    style={{ textDecoration: 'underline' }}
                                    variant="body2"
                                >
                                    <a
                                        href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                                        style={{
                                            color: 'inherit',
                                            zIndex: '3',
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {truncateText(
                                            event?.location?.address,
                                            40
                                        )}
                                    </a>
                                </Typography>
                            </div>
                        ) : (
                            <div className="center-horizontal">
                                <VideocamRounded color="primary" />
                                <Typography
                                    color="primary"
                                    style={{ textDecoration: 'underline' }}
                                    variant="body2"
                                >
                                    <a
                                        //component='a'
                                        href={event?.link}
                                        style={{
                                            color: 'inherit',
                                            zIndex: '3',
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Online
                                    </a>
                                </Typography>
                            </div>
                        )}

                        <Typography variant="body2">
                            {`${event?.attendees?.length} ${
                                new Date(event?.endDate).getTime() <
                                new Date().getTime()
                                    ? 'Attended'
                                    : 'Going'
                            }`}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
