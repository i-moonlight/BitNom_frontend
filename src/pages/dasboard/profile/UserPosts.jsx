import { useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
    Card,
    CardHeader,
    Container,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import UserCard from '../bn_connect/UserCard';
import SavedPost from '../bookmarks/SavedPost';
import {
    QUERY_FETCH_PROFILE,
    QUERY_LOAD_EVENTS,
    QUERY_LOAD_SCROLLS,
} from '../utilities/queries';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function UserPosts() {
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);

    const state = useSelector((st) => st);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');

    const user = state.auth.user;

    const { data: userPosts } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: { data: { author: user?._id, limit: 220 } },
    });

    const {
        //  loading,
        data: profileData,
    } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const { data: userEvents } = useQuery(QUERY_LOAD_EVENTS, {
        variables: {
            data: { host: user?._id, limit: 20 },
        },
    });

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <UserCard
                                    scrolls={userPosts?.Posts?.get?.length}
                                    following={
                                        profileData?.Users?.profile?.following
                                            ?.length
                                    }
                                    followers={
                                        profileData?.Users?.profile?.followers
                                            ?.length
                                    }
                                    events={userEvents?.Events?.get?.length}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <>
                                <Card
                                    variant="outlined"
                                    style={{ marginBottom: 12 }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Link to="/dashboard">
                                                <IconButton
                                                    size="small"
                                                    className="m-1 p-1"
                                                    aria-label="back"
                                                    color="inherit"
                                                >
                                                    <ArrowBack />
                                                </IconButton>
                                            </Link>
                                        }
                                        title={
                                            <div className="center-horizontal">
                                                <Typography variant="body1">
                                                    Your Posts
                                                </Typography>
                                            </div>
                                        }
                                    />
                                </Card>
                                {userPosts?.Posts?.get?.length > 0 &&
                                    userPosts?.Posts?.get?.map((scroll) => (
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
                                {userPosts?.Posts?.get?.length < 1 && (
                                    <Grid align="center">
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                        >
                                            Create your posts to see them here.
                                        </Typography>
                                    </Grid>
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
