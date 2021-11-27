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
import {
    loadScrolls,
    loadTrending,
    loadUsers,
} from '../../../store/actions/postActions';
import { getFeed } from '../utilities/functions';
import { QUERY_GET_USERS, QUERY_LOAD_SCROLLS } from '../utilities/queries';
import ExternalShareModal from './popovers/ExternalShareModal';
import FlagResourceModal from './popovers/FlagResourceModal';
import ReactionsModal from './popovers/ReactionsModal';
import UpdateComment from './scroll/comment/UpdateComment';
import CreatePostModal from './scroll/CreatePost';
import UpdatePostModal from './scroll/UpdatePost';
import SkeletonCreateScrollCard from './skeleton/SkeletonCreateScrollCard';
import SkeletonScrollCard from './skeleton/SkeletonScrollCard';
import SkeletonSuggestedPeopleCard from './skeleton/SkeletonSuggestedPeopleCard';
import SkeletonTrendingPostsCard from './skeleton/SkeletonTrendingPostCard';
import SkeletonUserCard from './skeleton/SkeletonUserCard';

const Scroll = React.lazy(() => import('./scroll/Scroll'));
const CreateScrollCard = React.lazy(() => import('./CreateScrollCard'));
const SuggestedPeopleCard = React.lazy(() => import('./SuggestedPeopleCard'));
const TrendingPostsCard = React.lazy(() => import('./TrendingPostsCard'));
const UserCard = React.lazy(() => import('./UserCard'));

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

    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);

    const user = state.auth.user;
    const posts = state.posts.list;
    // const comments = state.posts.comments;
    const trending = state.posts.trending;
    const users = state.posts.users;

    // console.log(comments);

    const mdDown = useMediaQuery('(max-width:1279px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const {
        loading: usersLoading,
        data: usersData,
        error: usersError,
    } = useQuery(QUERY_GET_USERS, {
        params: { data: { limit: 8 } },
        context: { clientName: 'users' },
    });

    const {
        loading: scrollLoading,
        data: scrollData,
        error: scrollError,
    } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: { ids: getFeed(user), limit: 220 },
        },
    });

    const {
        loading: trendingLoading,
        data: trendingData,
        error: trendingError,
    } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: {
            data: {
                ids: getFeed(user),
                sortByField: 'trending',
                limit: 5,
            },
        },
    });

    const following = [];
    user?.following?.forEach((item) => following.push(item?.userId?._id));

    const suggestedUsers = users?.filter(
        (item) =>
            item?._id !== 'bn-ai' &&
            item?._id !== user?._id &&
            !following.includes(item?._id) &&
            item?.displayName
    );

    useEffect(() => {
        !usersError &&
            !usersLoading &&
            dispatch(loadUsers(usersData?.Users?.get));
        !trendingError &&
            !trendingLoading &&
            dispatch(loadTrending(trendingData?.Posts?.get));
        !scrollError &&
            !scrollLoading &&
            dispatch(loadScrolls(scrollData?.Posts?.get));
    }, [
        dispatch,
        scrollData?.Posts?.get,
        scrollError,
        scrollLoading,
        trendingData?.Posts?.get,
        trendingError,
        trendingLoading,
        usersData?.Users?.get,
        usersError,
        usersLoading,
    ]);

    return (
        <Screen>
            <SEO
                title="BitNorm | The ultimate Cryptocurrency suite"
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
                                        following={user?.following?.length}
                                        followers={user?.followers?.length}
                                        setOpen={(open) =>
                                            setCreateScrollOpen(open)
                                        }
                                    />
                                </Suspense>
                            </Grid>
                        )}
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                            lg={6}
                            className={classes.mainCard}
                        >
                            <Suspense
                                className={classes.createScrollCard}
                                fallback={<SkeletonCreateScrollCard />}
                            >
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
                                    <Typography
                                        className="my-2"
                                        color="primary"
                                    >
                                        Updating ...
                                    </Typography>
                                )}
                            </Grid>

                            {posts?.map((scroll) => (
                                <Suspense
                                    key={scroll?._id}
                                    fallback={<SkeletonScrollCard />}
                                >
                                    <Scroll
                                        id={scroll?._id}
                                        setOpen={() =>
                                            setCreateScrollOpen(true)
                                        }
                                        setOpenShareModal={setOpenShareModal}
                                        setUpdateOpen={setUpdateScrollOpen}
                                        profileData={user}
                                        setUpdateCommentOpen={
                                            setUpdateCommentOpen
                                        }
                                        setOpenFlag={setCreateFlagOpen}
                                        setFlaggedResource={setFlaggedResource}
                                        setOpenReactions={setOpenReactions}
                                        setResourceReactions={
                                            setResourceReactions
                                        }
                                        setSharedResource={setSharedResource}
                                        setImageIndex={setImageIndex}
                                        setPostToPreview={setPostToPreview}
                                        setCommentToEdit={setCommentToEdit}
                                        setPostToEdit={setPostToEdit}
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
                                </Suspense>
                            ))}

                            {posts?.length < 1 && (
                                <Grid align="center">
                                    <Typography variant="body2" color="primary">
                                        Connect.
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
                                            trending={trending}
                                            loading={trendingLoading}
                                        />
                                    </Suspense>
                                    <Suspense
                                        fallback={
                                            <SkeletonSuggestedPeopleCard />
                                        }
                                    >
                                        <SuggestedPeopleCard
                                            profileData={user}
                                            suggestedUsers={suggestedUsers}
                                        />
                                    </Suspense>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <CreatePostModal
                profileData={user}
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
            <UpdatePostModal
                profileData={user}
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
                profileData={user}
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
            {postToPreview && (
                <ImageModal
                    open={imageModalOpen}
                    setImagePreviewURL={(url) => {
                        setImagePreviewURL(url);
                    }}
                    setImagePreviewOpen={(open) => {
                        setImagePreviewOpen(open);
                    }}
                    setImageIndex={setImageIndex}
                    imageIndex={imageIndex}
                    post={postToPreview}
                    onClose={() => {
                        setImageModalOpen(false);
                        setPostToPreview(null);
                        setImageIndex(null);
                    }}
                    setOpen={() => setCreateScrollOpen(true)}
                    profileData={user}
                    setUpdateCommentOpen={setUpdateCommentOpen}
                    setOpenFlag={setCreateFlagOpen}
                    setFlaggedResource={setFlaggedResource}
                    setOpenReactions={setOpenReactions}
                    setResourceReactions={setResourceReactions}
                    setSharedResource={setSharedResource}
                    setCommentToEdit={setCommentToEdit}
                />
            )}
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

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));
