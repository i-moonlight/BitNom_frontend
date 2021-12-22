import { useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
    Card,
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
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import UserCard from '../bn_connect/UserCard';
import {
    GET_BOOKMARKED_COMMENTS,
    GET_BOOKMARKED_EVENTS,
    GET_BOOKMARKED_SCROLLS,
    QUERY_FETCH_PROFILE,
} from '../utilities/queries';
import SavedComment from './SavedComment';
import SavedEvent from './SavedEvent';
import SavedPost from './SavedPost';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function SavedItems() {
    const [value, setValue] = React.useState(0);
    const [savedScrolls, setSavedScrolls] = useState([]);
    const [savedComments, setSavedComments] = useState([]);
    //const [savedArticles, setSavedArticles] = useState([]);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);

    const history = useHistory();
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    const { data: bookmarkedScrolls, loading: scrollsLoading } = useQuery(
        GET_BOOKMARKED_SCROLLS,
        {
            variables: {
                data: {
                    sortAscending: false,
                },
            },
        }
    );

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

    const { data: bookmarkedComments, loading: commentsLoading } = useQuery(
        GET_BOOKMARKED_COMMENTS,
        {
            variables: {
                data: {
                    sortAscending: false,
                },
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
    useEffect(() => {
        setSavedScrolls(bookmarkedScrolls?.Posts?.getBookmarked);
    }, [bookmarkedScrolls]);
    useEffect(() => {
        setSavedComments(bookmarkedComments?.Comments?.getBookmarked);
    }, [bookmarkedComments]);
    /* const savedScrolls = bookmarkedScrolls?.Posts?.getBookmarked;
  const savedComments = bookmarkedComments?.Comments?.getBookmarked; */

    return (
        <Screen>
            <SEO
                title="Saved Items | Bitnorm"
                url={`${window.location.origin}/profile/bookmarks`}
                description={'All your bookamrks in one place'}
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
                                                <Typography variant="body1">
                                                    Saved Items
                                                </Typography>
                                            </div>
                                        }
                                        subheader={
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                Anything saved under BNSocial is
                                                private.
                                            </Typography>
                                        }
                                    />

                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                    >
                                        <Tab
                                            key={'Posts'}
                                            label={'Posts'}
                                            disableRipple
                                            style={{ textTransform: 'none' }}
                                        />
                                        <Tab
                                            key={'Comments'}
                                            label={'Comments'}
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
                                {value === 0 && scrollsLoading && (
                                    <Grid align="center">
                                        <CircularProgress
                                            color="primary"
                                            size={24}
                                            thickness={4}
                                        />
                                    </Grid>
                                )}
                                {value === 0 &&
                                    savedScrolls?.length > 0 &&
                                    savedScrolls?.map((scroll) => (
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
                                    savedComments?.length > 0 &&
                                    savedComments?.map((comment) => (
                                        <SavedComment
                                            key={comment._id}
                                            comment={comment}
                                            setImagePreviewURL={
                                                setImagePreviewURL
                                            }
                                            setImagePreviewOpen={
                                                setImagePreviewOpen
                                            }
                                        />
                                    ))}
                                {value === 2 &&
                                    bookmarkedEvents?.Events?.getBookmarked
                                        ?.length > 0 &&
                                    bookmarkedEvents?.Events?.getBookmarked?.map(
                                        (event) => (
                                            <SavedEvent
                                                key={event._id}
                                                event={event}
                                            />
                                        )
                                    )}
                                {((value == 0 && savedScrolls?.length < 1) ||
                                    (value == 1 && savedComments?.length < 1) ||
                                    (value == 2 &&
                                        bookmarkedEvents?.Events?.getBookmarked
                                            ?.length < 1)) &&
                                !scrollsLoading &&
                                !commentsLoading &&
                                !bookmarksLoading ? (
                                    <Grid align="center">
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                        >
                                            Nothing here yet.
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
