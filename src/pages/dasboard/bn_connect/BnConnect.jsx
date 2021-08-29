import { useQuery, useSubscription } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ImagePreview from "../../../components/ImagePreview";
import Screen from "../../../components/Screen";
import {
  QUERY_LOAD_SCROLLS,
  QUERY_GET_USERS,
  NOTIFICATIONS_SUBSCRIPTION,
} from "../utilities/queries";
import CreateScrollCard from "./CreateScrollCard";
import CreatePost from "./scroll/CreatePost";
import FlagResourceModal from "./popovers/FlagResourceModal";
import { useSelector } from "react-redux";
import Scroll from "./scroll/Scroll";
import SuggestedPeopleCard from "./SuggestedPeopleCard";
import TrendingPostsCard from "./TrendingPostsCard";
import UpdateComment from "./scroll/comment/UpdateComment";
import UpdatePost from "./scroll/UpdatePost";
import UserCard from "./UserCard";

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
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [imageDisabled, setImageDisabled] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const [sharedPost, setSharedPost] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [flaggedResource, setFlaggedResource] = useState(null);
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const classes = useStyles();

  const { data: subscribeData } = useSubscription(NOTIFICATIONS_SUBSCRIPTION, {
    variables: { _id: user._id },
  });
  const { loading, data } = useQuery(QUERY_LOAD_SCROLLS, {
    variables: { data: { limit: 220 } },
  });

  const { data: usersData } = useQuery(QUERY_GET_USERS, {
    params: { data: { limit: 8 } },
    context: { clientName: "users" },
  });

  const suggestedUsers = usersData?.Users?.get?.filter(
    (item) => item?._id !== "bn-ai" && item?._id !== user?._id
  );
  console.log(subscribeData);
  const { loading: trendingLoading, data: trendingData } = useQuery(
    QUERY_LOAD_SCROLLS,
    {
      variables: { data: { sortByField: "comments", limit: 5 } },
    }
  );
  //onesignal
  const OneSignal = window.OneSignal || [];
  useEffect(() => {
    OneSignal.push(() => {
      OneSignal.init({
        appId: "97869740-c9fd-42b4-80de-bfd368eb1715",
      });

      OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
          var externalUserId = user._id;
          OneSignal.setExternalUserId(externalUserId);
        } else {
          console.log("Push notifications are not enabled yet.");
        }
      });
    });
  }, [data]);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard setOpen={(open) => setCreateScrollOpen(open)} />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <CreateScrollCard
                setOpenImage={setOpenImage}
                setImageDisabled={setImageDisabled}
                setVideoDisabled={setVideoDisabled}
                setOpenVideo={setOpenVideo}
                setOpen={(open) => setCreateScrollOpen(open)}
              />
              <Grid item align="center">
                {loading && (
                  <CircularProgress color="primary" size={60} thickness={6} />
                )}
              </Grid>
              {data?.Posts?.get &&
                data?.Posts?.get?.map((scroll) => (
                  <Scroll
                    setOpen={() => setCreateScrollOpen(true)}
                    setUpdateOpen={setUpdateScrollOpen}
                    setUpdateCommentOpen={setUpdateCommentOpen}
                    setOpenFlag={setCreateFlagOpen}
                    setFlaggedResource={setFlaggedResource}
                    setImagePreviewURL={(url) => setImagePreviewURL(url)}
                    setImagePreviewOpen={(open) => setImagePreviewOpen(open)}
                    setSharedPost={setSharedPost}
                    setCommentToEdit={setCommentToEdit}
                    setPostToEdit={setPostToEdit}
                    key={scroll?._id}
                    scroll={scroll}
                  />
                ))}
              {data?.Posts?.get?.length < 1 && (
                <Grid align="center">
                  <Typography color="primary">
                    There are no scrolls yet..Let yours be the first!!
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item md={4} lg={3}>
              <Hidden smDown>
                <TrendingPostsCard
                  trending={trendingData?.Posts?.get}
                  loading={trendingLoading}
                />
                <SuggestedPeopleCard suggestedUsers={suggestedUsers} />
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
      <UpdateComment
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
      <FlagResourceModal
        openFlag={createFlagOpen}
        setOpenFlag={(openFlag) => setCreateFlagOpen(openFlag)}
        flaggedResource={flaggedResource}
        setFlaggedResource={setFlaggedResource}
      />
    </Screen>
  );
}
