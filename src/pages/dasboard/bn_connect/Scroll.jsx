import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  CommentRounded,
  ImageRounded,
  MoreHorizRounded,
  MoreVert,
  PersonRounded,
  PostAddRounded,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import {
  MUTATION_CREATE_REACTION,
  GET_SCROLL_BY_ID,
  QUERY_LOAD_SCROLLS,
  QUERY_GET_COMMENTS,
} from '../utilities/queries';
// import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';
import moment from 'moment';
import Comment from './Comment';

const scrollOptionId = 'menu-scroll-option';

export default function Scroll({ scroll: scroll2 }) {
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);

  let scroll = {
    ...scroll2,
    // images: ['https://picsum.photos/200', 'https://picsum.photos/200'],
  };

  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
  const { error, loading, data } = useQuery(GET_SCROLL_BY_ID, {
    variables: { _id: scroll?._id },
  });

  const {
    loading: commentsLoading,
    data: commentsData,
    error: commentsError,
  } = useQuery(QUERY_GET_COMMENTS, {
    variables: { scroll_id: scroll._id },
  });

  console.log('cdts', commentsData?.Comments);

  const handleScrollOptionOpen = event => {
    setScrollOptionAnchorEl(event.currentTarget);
  };

  const handleScrollOptionClose = () => {
    setScrollOptionAnchorEl(null);
  };

  const handleCreateReaction = reaction => {
    createReaction({
      variables: {
        data: {
          _id: scroll?._id,
          type: 'post',
          reaction: reaction,
        },
      },
      refetchQueries: [{ query: QUERY_LOAD_SCROLLS }],
    });
  };

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader
          avatar={
            <Avatar src={scroll?.author?.image} aria-label='recipe'>
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label='show more'
              aria-controls={scrollOptionId}
              aria-haspopup='true'
              onClick={handleScrollOptionOpen}
              color='inherit'
            >
              <MoreVert />
            </IconButton>
          }
          title={
            <div className='center-horizontal'>
              <Typography style={{ marginRight: 8 }}>
                {scroll?.author?.displayName}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {`@${scroll?.author?._id}`}
              </Typography>
            </div>
          }
          subheader={moment(scroll?.createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {scroll?.content}
            <br />
            <Grid container spacing={2} className='mb-2'>
              {scroll?.video && (
                <Grid item xs={12}>
                  <CardMedia
                    component='video'
                    src={`http://localhost:3000${scroll?.video}`}
                    controls
                  />
                </Grid>
              )}
              {scroll?.images.length > 0 &&
                scroll?.images?.map(imageURL => (
                  <Grid
                    className='mt-3'
                    key={imageURL}
                    item
                    xs={scroll?.images.length > 1 ? 6 : 12}
                  >
                    <div
                      style={{
                        height: 200,
                        borderRadius: 8,
                        width: '100%',
                        backgroundImage:
                          'url(http://localhost:3000' + imageURL + ')',
                        backgroundSize: 'cover',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        backgroundBlendMode: 'soft-light',
                        cursor: 'pointer',
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
            <br />
            {`${scroll?.reactions?.likes} ${
              scroll?.reactions?.likes === 1 ? 'Like' : 'Likes'
            } . ${scroll?.comments} ${
              scroll?.comments === 1 ? 'Comment' : 'Comments'
            }`}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className='space-around'>
          <Button
            color='default'
            textCase
            onClick={() => handleCreateReaction('like')}
            variant='text'
            startIcon={<ThumbUpRounded />}
          >
            Like
          </Button>
          <Button
            color='default'
            textCase
            variant='text'
            startIcon={<CommentRounded />}
          >
            Comment
          </Button>
          <Button
            color='default'
            textCase
            variant='text'
            startIcon={<ShareRounded />}
          >
            Share
          </Button>
        </CardActions>
        <Divider />
        <CardContent>
          <div className='center-horizontal'>
            <Avatar src={scroll?.author?.image} className='mx-2'>
              <PersonRounded />
            </Avatar>
            <TextField
              endAdornment={
                <IconButton size='small'>
                  <ImageRounded />
                </IconButton>
              }
            />
          </div>
          {commentsData &&
            commentsData?.Comments?.get
              .filter(comment => !comment.response_to)
              .map(comment => <Comment key={comment._id} comment={comment} />)}
        </CardContent>
      </Card>
      <ScrollOptionsPopover
        scrollId={scroll?._id}
        scrollOptionId={scrollOptionId}
        scrollOptionAnchorEl={scrollOptionAnchorEl}
        isScrollOptionOpen={isScrollOptionOpen}
        handleScrollOptionClose={handleScrollOptionClose}
      />
    </>
  );
}
