import { useQuery } from '@apollo/client';
import {
    EventRounded,
    RoomRounded,
    VideocamRounded,
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
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Button } from '../../../components/Button';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { GET_BOOKMARKED_EVENTS, QUERY_LOAD_EVENTS } from '../utilities/queries';
import CreateEvent from './CreateEvent';
import CreateEventCard from './CreateEventCard';
import EventsFilter from './EventsFilter';

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
            <SEO
                title="Your Events | Bitnorm"
                url={`${window.location.origin}/events`}
                description={`All Events`}
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
                                setSelectedIndex={setSelectedIndex}
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
                profileData={user}
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
    setSelectedIndex,
    savedEvents,
    bookmarksLoading,
}) {
    const mdDown = useMediaQuery('(max-width:1279px)');
    const upcomingEvents = events?.filter(
        (event) => new Date(event?.endDate).getTime() > new Date().getTime()
    );

    const pastEvents = events?.filter(
        (event) => new Date(event?.endDate).getTime() < new Date().getTime()
    );

    return (
        <Card>
            <CardHeader
                title={
                    <div className="center-horizontal">
                        {mdDown ? (
                            <EventsFilter
                                eventsFilter={selectedIndex}
                                setEventsFilter={setSelectedIndex}
                            />
                        ) : (
                            <Typography variant="body1">Events</Typography>
                        )}
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
                        <Typography variant="body2" color="primary">
                            You have no upcoming events.
                        </Typography>
                    </Grid>
                )}
                {selectedIndex === 1 && pastEvents?.length < 1 && (
                    <Grid align="center">
                        <Typography variant="body2" color="primary">
                            You have no past events.
                        </Typography>
                    </Grid>
                )}
                {selectedIndex === 2 && savedEvents?.length < 1 && (
                    <Grid align="center">
                        <Typography variant="body2" color="primary">
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
                                {format(
                                    new Date(event?.startDate),
                                    'E, MMMM do y, h:mm aaa'
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
                                    variant="body2"
                                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                                    style={{
                                        color: 'inherit',
                                        zIndex: '3',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {truncateText(event?.location?.address, 40)}
                                </Typography>
                            </div>
                        ) : (
                            <div className="center-horizontal">
                                <VideocamRounded color="primary" />
                                <Typography
                                    component="a"
                                    color="primary"
                                    variant="body2"
                                    style={{
                                        textDecoration: 'underline',
                                        zIndex: '3',
                                    }}
                                    target="_blank"
                                    rel="noreferrer"
                                    href={event?.link}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Online
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
