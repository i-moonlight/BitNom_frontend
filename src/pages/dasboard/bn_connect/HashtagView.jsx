import { useQuery } from '@apollo/client';
import { ArrowBack, RoomRounded, VideocamRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import UserCard from '../bn_connect/UserCard';
//import SavedComment from './SavedComment';
//import SavedEvent from './SavedEvent';
import SavedPost from '../bookmarks/SavedPost';
import {
    QUERY_EVENTS_BY_HASHTAG,
    QUERY_FETCH_PROFILE,
    QUERY_POSTS_BY_HASHTAG,
} from '../utilities/queries';
//import EventPreview from '../events/EventPreview';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function HashtagView() {
    const [value, setValue] = React.useState(0);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);

    const history = useHistory();
    const classes = useStyles();
    const { hashtag } = useParams();
    const mdDown = useMediaQuery('(max-width:1279px)');

    const { data: taggedPosts, loading: taggedPostsLoading } = useQuery(
        QUERY_POSTS_BY_HASHTAG,
        {
            variables: {
                hashtag: `#${hashtag}`,
            },
        }
    );

    const { data: taggedEvents, loading: taggedEventsLoading } = useQuery(
        QUERY_EVENTS_BY_HASHTAG,
        {
            variables: {
                hashtag: `#${hashtag}`,
            },
        }
    );

    const {
        //  loading,
        data: profileData,
    } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const handleChange = (event, val) => {
        setValue(val);
    };

    const getTopPosts = (resource) => {
        return (
            resource?.reactions?.likes +
            resource?.reactions?.dislikes +
            resource?.reactions?.loves +
            resource?.reactions?.celebrations +
            resource?.comments
        );
    };

    const topPosts = taggedPosts?.Posts?.getByHashtag
        ?.slice()
        ?.sort((a, b) => getTopPosts(b) - getTopPosts(a));
    const postsWithImages = taggedPosts?.Posts?.getByHashtag?.filter(
        (post) => post?.images?.length > 0
    );
    const postsWithVideo = taggedPosts?.Posts?.getByHashtag?.filter(
        (post) => post?.video?.path
    );

    return (
        <Screen>
            <SEO
                title="Hashtag | Bitnorm"
                url={`${window.location.origin}/hashtags/${hashtag}`}
                description={`#${hashtag}`}
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <UserCard
                                    following={
                                        profileData?.Users?.profile?.following
                                            ?.length
                                    }
                                    followers={
                                        profileData?.Users?.profile?.followers
                                            ?.length
                                    }
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={7}>
                            <>
                                <Card
                                    variant="outlined"
                                    style={{ marginBottom: 12 }}
                                >
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
                                                <Typography variant="h6">
                                                    {`#${hashtag}`}
                                                </Typography>
                                            </div>
                                        }
                                    />

                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                    >
                                        <Tab
                                            key={'Top'}
                                            label={'Top'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                        <Tab
                                            key={'Latest'}
                                            label={'Latest'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                        <Tab
                                            key={'Images'}
                                            label={'Images'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                        <Tab
                                            key={'Videos'}
                                            label={'Videos'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                        <Tab
                                            key={'Events'}
                                            label={'Events'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                    </Tabs>
                                </Card>
                                {value === 0 && taggedPostsLoading && (
                                    <Grid align="center">
                                        <CircularProgress
                                            color="primary"
                                            size={24}
                                            thickness={4}
                                        />
                                    </Grid>
                                )}
                                {value === 0 &&
                                    topPosts?.length > 0 &&
                                    topPosts?.map((scroll) => (
                                        <SavedPost
                                            setImagePreviewURL={(url) =>
                                                setImagePreviewURL(url)
                                            }
                                            setImagePreviewOpen={(open) =>
                                                setImagePreviewOpen(open)
                                            }
                                            key={scroll?._id}
                                            scroll={scroll}
                                        />
                                    ))}
                                {value === 1 &&
                                    taggedPosts?.Posts?.getByHashtag?.length >
                                        0 &&
                                    taggedPosts?.Posts?.getByHashtag?.map(
                                        (scroll) => (
                                            <SavedPost
                                                setImagePreviewURL={(url) =>
                                                    setImagePreviewURL(url)
                                                }
                                                setImagePreviewOpen={(open) =>
                                                    setImagePreviewOpen(open)
                                                }
                                                key={scroll?._id}
                                                scroll={scroll}
                                            />
                                        )
                                    )}
                                {value === 2 &&
                                    postsWithImages?.length > 0 &&
                                    postsWithImages?.map((scroll) => (
                                        <SavedPost
                                            setImagePreviewURL={(url) =>
                                                setImagePreviewURL(url)
                                            }
                                            setImagePreviewOpen={(open) =>
                                                setImagePreviewOpen(open)
                                            }
                                            key={scroll?._id}
                                            scroll={scroll}
                                        />
                                    ))}
                                {value === 3 &&
                                    postsWithVideo.length > 0 &&
                                    postsWithVideo.map((scroll) => (
                                        <SavedPost
                                            setImagePreviewURL={(url) =>
                                                setImagePreviewURL(url)
                                            }
                                            setImagePreviewOpen={(open) =>
                                                setImagePreviewOpen(open)
                                            }
                                            key={scroll?._id}
                                            scroll={scroll}
                                        />
                                    ))}
                                {value === 4 &&
                                    taggedEvents?.Events?.getByHashtag?.length >
                                        0 &&
                                    taggedEvents?.Events?.getByHashtag?.map(
                                        (event) => (
                                            <EventPreview
                                                key={event?._id}
                                                event={event}
                                            />
                                        )
                                    )}
                                {((value == 0 && topPosts?.length < 1) ||
                                    (value == 1 &&
                                        taggedPosts?.Posts?.getByHashtag
                                            ?.length < 1) ||
                                    (value == 2 &&
                                        postsWithImages?.length < 1) ||
                                    (value == 3 &&
                                        postsWithVideo?.length < 1) ||
                                    (value == 4 &&
                                        taggedEvents?.Events?.getByHashtag
                                            ?.length < 1)) &&
                                !taggedPostsLoading &&
                                !taggedEventsLoading ? (
                                    <Grid align="center">
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                        >
                                            {`0 results for #${hashtag}`}
                                        </Typography>
                                    </Grid>
                                ) : (
                                    ''
                                )}
                            </>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <ImagePreview
                open={imagePreviewOpen}
                imgURL={imagePreviewURL}
                onClose={() => {
                    setImagePreviewOpen(false);
                    setImagePreviewURL(null);
                }}
            />
        </Screen>
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
        <Card
            elevation={0}
            key={event?._id}
            onClick={() => history.push(`/events/${event?._id}`)}
            className="mb-2"
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
                        style={{ textTransform: 'uppercase' }}
                        variant="body2"
                    >
                        {event?.location?.type === 'physical'
                            ? event?.title
                            : `${event?.title} (Virtual) `}
                    </Typography>
                    {event?.location?.type === 'physical' ? (
                        <div className="center-horizontal">
                            <RoomRounded color="primary" />
                            <Typography
                                color="primary"
                                style={{ textDecoration: 'underline' }}
                            >
                                <a
                                    href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                                    style={{ color: 'inherit', zIndex: '3' }}
                                    onClick={(e) => e.stopPropagation()}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {truncateText(event?.location?.address, 40)}
                                </a>
                            </Typography>
                        </div>
                    ) : (
                        <div className="center-horizontal">
                            <VideocamRounded color="primary" />
                            <Typography
                                color="primary"
                                style={{ textDecoration: 'underline' }}
                            >
                                <a
                                    //component='a'
                                    href={event?.link}
                                    style={{ color: 'inherit', zIndex: '3' }}
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
        </Card>
    );
}
