import { useQuery } from '@apollo/client';
import {
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImagePreview from '../../../components/ImagePreview';
import Screen from '../../../components/Screen';
import CreatePost from '../bn_connect/scroll/CreatePost';
import UserCard from '../bn_connect/UserCard';
import {
  GET_BOOKMARKED_COMMENTS,
  GET_BOOKMARKED_SCROLLS,
  QUERY_FETCH_PROFILE,
  QUERY_LOAD_SCROLLS,
} from '../utilities/queries';
import SavedComment from './SavedComment';
import SavedPost from './SavedPost';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function SavedItems() {
  const [createScrollOpen, setCreateScrollOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [imageDisabled, setImageDisabled] = useState(false);
  const [value, setValue] = React.useState(0);
  const [allItems, setAllItems] = useState([]);
  const [allLoading, setAllLoading] = useState(false);
  const [savedScrolls, setSavedScrolls] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  //const [savedArticles, setSavedArticles] = useState([]);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState(null);
  const [sharedPost, setSharedPost] = useState(null);

  const state = useSelector((st) => st);
  const user = state.auth.user;
  const classes = useStyles();

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

  const { data: userScrolls } = useQuery(QUERY_LOAD_SCROLLS, {
    variables: { data: { author: user?._id, limit: 500 } },
  });

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
  useEffect(() => {
    setAllLoading(true);
    const all = [];
    savedScrolls?.forEach((item) => all.push(item));
    savedComments?.forEach((item) => all.push(item));
    const allSaved = all?.map((item) => {
      let newItem;
      if (item?.scroll) {
        newItem = Object.assign(
          { created: item?.scroll ? item?.creation_date : item?.createdAt },
          item
        );
      } else {
        newItem = Object.assign(
          { created: item?.scroll ? item?.creation_date : item?.createdAt },
          item
        );
      }
      return newItem;
    });
    setAllItems(allSaved);
    setAllLoading(false);
  }, [savedScrolls, savedComments]);

  return (
    <Screen>
      <div className={classes.root}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Hidden mdDown>
              <Grid item lg={3}>
                <UserCard
                  scrolls={userScrolls?.Posts?.get?.length}
                  following={profileData?.Users?.profile?.following?.length}
                  followers={profileData?.Users?.profile?.followers?.length}
                />
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <>
                <Card variant='outlined' style={{ marginBottom: 12 }}>
                  <CardHeader
                    avatar={
                      <Link to='/dashboard'>
                        <IconButton
                          size='small'
                          className='m-1 p-1'
                          aria-label='back'
                          color='inherit'
                        >
                          <ArrowBack />
                        </IconButton>
                      </Link>
                    }
                    title={
                      <div className='center-horizontal'>
                        <Typography variant='body1'>Saved Items</Typography>
                      </div>
                    }
                    subheader={
                      <Typography variant='body2' color='textSecondary'>
                        Anything saved under BNSocial is private.
                      </Typography>
                    }
                  />

                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    /* classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
            }} */
                  >
                    <Tab
                      /* classes={{
                    root: classes.tabRootButton,
                    label: classes.tabLabel,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper,
                  }} */
                      key={'allItems'}
                      label={'All'}
                      disableRipple
                      style={{ textTransform: 'none' }}
                    />
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
                    {/* <Tab
              key={'Articles'}
              label={'Articles'}
              style={{ textTransform: 'none' }}
              disableRipple
            /> */}
                  </Tabs>
                </Card>
                {value === 0 &&
                  (scrollsLoading || commentsLoading || allLoading) && (
                    <Grid align='center'>
                      <CircularProgress
                        color='primary'
                        size={24}
                        thickness={4}
                      />
                    </Grid>
                  )}
                {value === 0 &&
                  allItems?.length > 0 &&
                  !allLoading &&
                  allItems
                    ?.sort((a, b) => b.created - a.created)
                    .map((item) =>
                      item.scroll ? (
                        <SavedComment
                          key={item._id}
                          comment={item}
                          setImagePreviewURL={setImagePreviewURL}
                          setImagePreviewOpen={setImagePreviewOpen}
                        />
                      ) : (
                        <SavedPost
                          setImagePreviewURL={(url) => setImagePreviewURL(url)}
                          setImagePreviewOpen={(open) =>
                            setImagePreviewOpen(open)
                          }
                          key={item?._id}
                          scroll={item}
                        />
                      )
                    )}
                {value === 1 &&
                  savedScrolls?.length > 0 &&
                  savedScrolls?.map((scroll) => (
                    <SavedPost
                      setImagePreviewURL={(url) => setImagePreviewURL(url)}
                      setImagePreviewOpen={(open) => setImagePreviewOpen(open)}
                      key={scroll?._id}
                      scroll={scroll}
                    />
                  ))}
                {value === 2 &&
                  savedComments?.length > 0 &&
                  savedComments?.map((comment) => (
                    <SavedComment
                      key={comment._id}
                      comment={comment}
                      setImagePreviewURL={setImagePreviewURL}
                      setImagePreviewOpen={setImagePreviewOpen}
                    />
                  ))}
                {((value == 0 && allItems?.length < 1) ||
                  (value == 1 && savedScrolls?.length < 1) ||
                  (value == 2 && savedComments?.length < 1)) &&
                !scrollsLoading &&
                !commentsLoading &&
                !allLoading ? (
                  <Grid align='center'>
                    <Typography variant='body1' color='primary'>
                      No Saved items here yet..start bookmarking!!
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
