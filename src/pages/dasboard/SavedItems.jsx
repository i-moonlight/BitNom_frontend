import { useQuery } from '@apollo/client';
import {
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  GET_BOOKMARKED_SCROLLS,
  GET_BOOKMARKED_COMMENTS,
} from './utilities/queries';
import Scroll from './bn_connect/Scroll';
import SavedComment from './bn_connect/SavedComment';

export default function SavedItems({
  setOpenSavedItems,
  setSharedPost,
  setFlaggedResource,
  setOpenFlag,
  setOpen,
  setImagePreviewOpen,
  setImagePreviewURL,
}) {
  const [value, setValue] = React.useState(0);
  const [allItems, setAllItems] = useState([]);
  const [allLoading, setAllLoading] = useState(false);
  const [savedScrolls, setSavedScrolls] = useState([]);
  const [savedComments, setSavedComments] = useState([]);
  //const [savedArticles, setSavedArticles] = useState([]);

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

  const handleChange = (event, value) => {
    setValue(value);
  };
  useEffect(() => {
    setSavedScrolls(bookmarkedScrolls?.Posts?.getBookmarked);
  }, [bookmarkedScrolls]);
  useEffect(() => {
    setSavedComments(bookmarkedComments?.Comments?.getBookmarked);
  }, [bookmarkedComments]);

  useEffect(() => {
    setAllLoading(true);
    const all = [];
    savedScrolls?.forEach((item) => all.push(item));
    savedComments?.forEach((item) => all.push(item));
    let allSaved = all?.map((item) => {
      let newItem;
      if (item.scroll) {
        newItem = Object.assign(
          { created: item.scroll ? item.creation_date : item.createdAt },
          item
        );
      } else {
        newItem = Object.assign(
          { created: item.scroll ? item.creation_date : item.createdAt },
          item
        );
      }
      return newItem;
    });
    setAllItems(allSaved);
    setAllLoading(false);
  }, [savedScrolls, savedComments]);
  return (
    <>
      <Card variant='outlined' style={{ marginBottom: 12 }}>
        <CardHeader
          avatar={
            <IconButton
              onClick={() => setOpenSavedItems(false)}
              aria-label='back'
              color='inherit'
            >
              <ArrowBack />
            </IconButton>
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
            style={{ textTransform: 'none' }}
          />
          <Tab
            key={'Scrolls'}
            label={'Scrolls'}
            style={{ textTransform: 'none' }}
          />
          <Tab
            key={'Comments'}
            label={'Comments'}
            style={{ textTransform: 'none' }}
          />
          {/* <Tab
              key={'Articles'}
              label={'Articles'}
              style={{ textTransform: 'none' }}
              disabled
            /> */}
        </Tabs>
      </Card>
      {value === 0 && (scrollsLoading || commentsLoading || allLoading) && (
        <Grid align='center'>
          <CircularProgress color='primary' size={24} thickness={4} />
        </Grid>
      )}
      {value === 0 &&
        allItems.length > 1 &&
        !allLoading &&
        allItems
          ?.sort((a, b) => b.created - a.created)
          .map((item) =>
            item.scroll ? (
              <SavedComment
                key={item._id}
                comment={item}
                setFlaggedResource={setFlaggedResource}
                setOpenFlag={setOpenFlag}
                setImagePreviewURL={setImagePreviewURL}
                setImagePreviewOpen={setImagePreviewOpen}
              />
            ) : (
              <Scroll
                setOpen={setOpen}
                setOpenFlag={setOpenFlag}
                setFlaggedResource={setFlaggedResource}
                setImagePreviewURL={(url) => setImagePreviewURL(url)}
                setImagePreviewOpen={(open) => setImagePreviewOpen(open)}
                setSharedPost={setSharedPost}
                key={item?._id}
                scroll={item}
              />
            )
          )}
      {value === 1 &&
        savedScrolls.length > 1 &&
        savedScrolls?.map((scroll) => (
          <Scroll
            setOpen={setOpen}
            setOpenFlag={setOpenFlag}
            setFlaggedResource={setFlaggedResource}
            setImagePreviewURL={(url) => setImagePreviewURL(url)}
            setImagePreviewOpen={(open) => setImagePreviewOpen(open)}
            setSharedPost={setSharedPost}
            key={scroll?._id}
            scroll={scroll}
          />
        ))}
      {value === 2 &&
        savedComments.length > 0 &&
        savedComments?.map((comment) => (
          <SavedComment
            key={comment._id}
            comment={comment}
            setFlaggedResource={setFlaggedResource}
            setOpenFlag={setOpenFlag}
            setImagePreviewURL={setImagePreviewURL}
            setImagePreviewOpen={setImagePreviewOpen}
          />
        ))}
      {((value == 0 && allItems.length < 1) ||
        (value == 1 && savedScrolls.length < 1) ||
        (value == 2 && savedComments.length < 1)) &&
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
  );
}
