import { useQuery } from '@apollo/client';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ImageModal from '../../../components/ImageModal';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { loadScrolls, loadTrending } from '../../../store/actions/postActions';
import { getFeed } from '../utilities/functions';
import {
    QUERY_FETCH_PROFILE,
    QUERY_GET_USERS,
    QUERY_LOAD_SCROLLS,
} from '../utilities/queries';
import ExternalShareModal from './popovers/ExternalShareModal';
import FlagResourceModal from './popovers/FlagResourceModal';
import ReactionsModal from './popovers/ReactionsModal';
import UpdateComment from './scroll/comment/UpdateComment';
import CreatePost from './scroll/CreatePost';
import Scroll from './scroll/Scroll';
import UpdatePost from './scroll/UpdatePost';
import SkeletonCreateScrollCard from './skeleton/SkeletonCreateScrollCard';
import SkeletonSuggestedPeopleCard from './skeleton/SkeletonSuggestedPeopleCard';
import SkeletonTrendingPostsCard from './skeleton/SkeletonTrendingPostCard';
import SkeletonUserCard from './skeleton/SkeletonUserCard';

const CreateScrollCard = React.lazy(() => import('./CreateScrollCard'));
const SuggestedPeopleCard = React.lazy(() => import('./SuggestedPeopleCard'));
const TrendingPostsCard = React.lazy(() => import('./TrendingPostsCard'));
const UserCard = React.lazy(() => import('./UserCard'));

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function BnConnect() {
    const [createScrollOpen, setCreateScrollOpen] = useState(false);
    const [updateScrollOpen, setUpdateScrollOpen] = useState(false);
    const [updateCommentOpen, setUpdateCommentOpen] = useState(false);
    const [createFlagOpen, setCreateFlagOpen] = useState(false);
    const [openReactions, setOpenReactions] = useState(false);
    const [resourceReactions, setResourceReactions] = useState(null);
    const [openImage, setOpenImage] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [videoDisabled, setVideoDisabled] = useState(false);
    const [imageDisabled, setImageDisabled] = useState(false);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(null);
    const [postToPreview, setPostToPreview] = useState(null);
    const [sharedResource, setSharedResource] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [flaggedResource, setFlaggedResource] = useState(null);
    const [openShareModal, setOpenShareModal] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const user = state.auth.user;
    const posts = state.posts.list;

    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const profile = profileData?.Users?.profile;

    const {
        loading: scrollLoading,
        data: scrollData,
        error: scrollError,
    } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: { ids: getFeed(profile), limit: 220 },
        },
    });

    const { data: usersData } = useQuery(QUERY_GET_USERS, {
        params: { data: { limit: 8 } },
        context: { clientName: 'users' },
    });

    const suggestedUsers = usersData?.Users?.get?.filter(
        (item) => item?._id !== 'bn-ai' && item?._id !== user?._id
    );

    const {
        loading: trendingLoading,
        data: trendingData,
        error: trendingError,
    } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: {
                ids: getFeed(profile),
                sortByField: 'trending',
                limit: 5,
            },
        },
    });

    useEffect(() => {
        !scrollError &&
            !scrollLoading &&
            dispatch(loadScrolls(scrollData?.Posts?.get));
        !trendingError &&
            trendingLoading &&
            dispatch(loadTrending(trendingData?.Posts?.get));
    }, [
        dispatch,
        scrollData?.Posts?.get,
        scrollError,
        scrollLoading,
        trendingData?.Posts?.get,
        trendingError,
        trendingLoading,
    ]);

    useEffect(() => {
        const OneSignal = window.OneSignal || [];

        OneSignal.push(() => {
            OneSignal.init({
                appId: '97869740-c9fd-42b4-80de-bfd368eb1715',
            });
            OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                if (isEnabled) {
                    var externalUserId = user._id;
                    OneSignal.setExternalUserId(externalUserId);
                } else {
                    console.log('Push notifications are not enabled yet.');
                }
            });
        });
    }, [user._id]);

    return (
        <Screen>
            <SEO
                title="BN Connect"
                url={`${window.location.origin}/connect`}
                description={`Bitnorm Community Platform`}
            />
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
                                <Suspense fallback={<SkeletonUserCard />}>
                                    <UserCard
                                        following={
                                            profileData?.Users?.profile
                                                ?.following?.length
                                        }
                                        followers={
                                            profileData?.Users?.profile
                                                ?.followers?.length
                                        }
                                        setOpen={(open) =>
                                            setCreateScrollOpen(open)
                                        }
                                    />
                                </Suspense>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Suspense fallback={<SkeletonCreateScrollCard />}>
                                <CreateScrollCard
                                    setOpenImage={setOpenImage}
                                    setImageDisabled={setImageDisabled}
                                    setVideoDisabled={setVideoDisabled}
                                    setOpenVideo={setOpenVideo}
                                    setOpen={(open) =>
                                        setCreateScrollOpen(open)
                                    }
                                />
                            </Suspense>
                            <Grid item align="center">
                                {scrollLoading && (
                                    // <CircularProgress
                                    //     color="primary"
                                    //     size={60}
                                    //     thickness={6}
                                    // />
                                    <Typography
                                        className="my-2"
                                        color="primary"
                                    >
                                        Updating ...
                                    </Typography>
                                )}
                            </Grid>

                            {posts?.map((scroll) => (
                                <Scroll
                                    setOpen={() => setCreateScrollOpen(true)}
                                    setOpenShareModal={setOpenShareModal}
                                    setUpdateOpen={setUpdateScrollOpen}
                                    profileData={profileData?.Users?.profile}
                                    setUpdateCommentOpen={setUpdateCommentOpen}
                                    setOpenFlag={setCreateFlagOpen}
                                    setFlaggedResource={setFlaggedResource}
                                    setOpenReactions={setOpenReactions}
                                    setResourceReactions={setResourceReactions}
                                    setSharedResource={setSharedResource}
                                    setImageIndex={setImageIndex}
                                    setPostToPreview={setPostToPreview}
                                    setCommentToEdit={setCommentToEdit}
                                    setPostToEdit={setPostToEdit}
                                    key={scroll?._id}
                                    scroll={scroll}
                                    setImagePreviewURL={(url) => {
                                        setImagePreviewURL(url);
                                    }}
                                    setImagePreviewOpen={(open) => {
                                        setImagePreviewOpen(open);
                                    }}
                                    setImageModalOpen={(open) => {
                                        setImageModalOpen(open);
                                    }}
                                />
                            ))}
                            {scrollData?.Posts?.get?.length < 1 && (
                                <Grid align="center">
                                    <Typography variant="h5" color="primary">
                                        .
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item md={4} lg={3}>
                            {!smDown && (
                                <>
                                    <Suspense
                                        fallback={<SkeletonTrendingPostsCard />}
                                    >
                                        <TrendingPostsCard
                                            trending={
                                                trendingData?.Posts?.get
                                                // state.posts.trending
                                            }
                                            loading={
                                                trendingLoading
                                                // false
                                            }
                                        />
                                    </Suspense>
                                    <Suspense
                                        fallback={
                                            <SkeletonSuggestedPeopleCard />
                                        }
                                    >
                                        <SuggestedPeopleCard
                                            profileData={
                                                profileData?.Users?.profile
                                            }
                                            suggestedUsers={suggestedUsers}
                                        />
                                    </Suspense>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </div>
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
            <UpdatePost
                profileData={profileData?.Users?.profile}
                updateScrollOpen={updateScrollOpen}
                postToEdit={postToEdit}
                setPostToEdit={setPostToEdit}
                setUpdateScrollOpen={(UpdateScrollOpen) =>
                    setUpdateScrollOpen(UpdateScrollOpen)
                }
                openImage={openImage}
                imageDisabled={imageDisabled}
                videoDisabled={videoDisabled}
                setImageDisabled={setImageDisabled}
                setVideoDisabled={setVideoDisabled}
                setOpenImage={setOpenImage}
                openVideo={openVideo}
                setOpenVideo={setOpenVideo}
            />
            <UpdateComment
                profileData={profileData?.Users?.profile}
                updateCommentOpen={updateCommentOpen}
                commentToEdit={commentToEdit}
                setCommentToEdit={setCommentToEdit}
                setUpdateCommentOpen={(UpdateCommentOpen) =>
                    setUpdateCommentOpen(UpdateCommentOpen)
                }
                openImage={openImage}
                setOpenImage={setOpenImage}
            />
            <ImagePreview
                open={imagePreviewOpen}
                imgURL={imagePreviewURL}
                onClose={() => {
                    setImagePreviewOpen(false);
                    setImagePreviewURL(null);
                }}
            />
            <ImageModal
                open={imageModalOpen}
                setImageIndex={setImageIndex}
                imageIndex={imageIndex}
                post={postToPreview}
                onClose={() => {
                    setImageModalOpen(false);
                    setPostToPreview(null);
                    setImageIndex(null);
                }}
                setOpen={() => setCreateScrollOpen(true)}
                profileData={profileData?.Users?.profile}
                setUpdateCommentOpen={setUpdateCommentOpen}
                setOpenFlag={setCreateFlagOpen}
                setFlaggedResource={setFlaggedResource}
                setOpenReactions={setOpenReactions}
                setResourceReactions={setResourceReactions}
                setSharedResource={setSharedResource}
                setCommentToEdit={setCommentToEdit}
            />
            <FlagResourceModal
                openFlag={createFlagOpen}
                setOpenFlag={(openFlag) => setCreateFlagOpen(openFlag)}
                flaggedResource={flaggedResource}
                setFlaggedResource={setFlaggedResource}
            />
            <ReactionsModal
                openReactions={openReactions}
                setOpenReactions={setOpenReactions}
                resourceReactions={resourceReactions}
                setResourceReactions={setResourceReactions}
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
