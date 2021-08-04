import { useQuery } from '@apollo/client';
import {
  CircularProgress,
  Container,
  Grid,
  Hidden,
  Typography,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import { QUERY_LOAD_SCROLLS } from '../utilities/queries';
import CreateScroll from './CreateScroll';
import CreatePost from './create_scroll/CreatePost';
import UpdatePost from './update_scroll/UpdatePost';
import FlagResource from './flag_resource/FlagResource';
import Scroll from './Scroll';
import SuggestedPeople from './SuggestedPeople';
import TrendingPosts from './TrendingPosts';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function BnConnect() {
  const [createScrollOpen, setCreateScrollOpen] = useState(false);
  const [updateScrollOpen, setUpdateScrollOpen] = useState(false);
  //const [trending, setTrending] = useState([]);
  const [createFlagOpen, setCreateFlagOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [imageDisabled, setImageDisabled] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const [sharedPost, setSharedPost] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [flaggedResource, setFlaggedResource] = useState(null);

  const classes = useStyles();

  const { error, loading, data } = useQuery(QUERY_LOAD_SCROLLS);
  /* const { data: trendingData, loading: loadingTrending } = useQuery(
    QUERY_LOAD_SCROLLS,
    {
      variables: { data: { sortByField: 'comments' } },
    }
  ); */

  useEffect(() => {
    console.log(error);
    console.log(loading);
  }, [data]);

  /* useEffect(() => {
    if (trendingData?.Posts?.get) {
      let posts = trendingData?.Posts?.get;
      setTrending(posts);
    }
  }, [trendingData]); */

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard setOpen={(open) => setCreateScrollOpen(open)} />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <CreateScroll
                setOpenImage={setOpenImage}
                setImageDisabled={setImageDisabled}
                setVideoDisabled={setVideoDisabled}
                setOpenVideo={setOpenVideo}
                setOpen={(open) => setCreateScrollOpen(open)}
              />
              <Grid item align='center'>
                {loading && (
                  <CircularProgress color='primary' size={60} thickness={6} />
                )}
              </Grid>
              {data?.Posts?.get &&
                data?.Posts?.get?.map((scroll) => (
                  <Scroll
                    setOpen={() => setCreateScrollOpen(true)}
                    setUpdateOpen={setUpdateScrollOpen}
                    setOpenFlag={setCreateFlagOpen}
                    setFlaggedResource={setFlaggedResource}
                    setImagePreviewURL={(url) => setImagePreviewURL(url)}
                    setImagePreviewOpen={(open) => setImagePreviewOpen(open)}
                    setSharedPost={setSharedPost}
                    setPostToEdit={setPostToEdit}
                    key={scroll?._id}
                    scroll={scroll}
                  />
                ))}
              {data?.Posts?.get?.length < 1 && (
                <Grid align='center'>
                  <Typography color='primary'>
                    There are no scrolls yet..Let yours be the first!!
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item md={4} lg={3}>
              <Hidden smDown>
                <TrendingPosts
                  //trending={trending}
                  //loading={loadingTrending}
                  posts={[1, 2, 3]}
                />
                <SuggestedPeople />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      </div>
      <CreatePost
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
        sharedPost={sharedPost}
        setSharedPost={setSharedPost}
      />
      <UpdatePost
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
      <ImagePreview
        open={imagePreviewOpen}
        imgURL={imagePreviewURL}
        onClose={() => {
          setImagePreviewOpen(false);
          setImagePreviewURL(null);
        }}
      />
      <FlagResource
        openFlag={createFlagOpen}
        setOpenFlag={(openFlag) => setCreateFlagOpen(openFlag)}
        flaggedResource={flaggedResource}
        setFlaggedResource={setFlaggedResource}
      />
    </Screen>
  );
}
