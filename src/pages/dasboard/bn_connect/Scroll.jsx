import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  CommentRounded,
  MoreVert,
  PlayCircleFilled,
  ShareRounded,
  ThumbUpRounded,
} from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { MUTATION_CREATE_REACTION } from '../utilities/queries';
import Button from '../../../components/Button';
import LinkCard from './LinkCard';
import ScrollOptionsPopover from './ScrollOptionsPopover';

const scrollOptionId = 'menu-scroll-option';

export default function Scroll({ scroll }) {
  const [scrollOptionAnchorEl, setScrollOptionAnchorEl] = useState(null);
  const isScrollOptionOpen = Boolean(scrollOptionAnchorEl);
  const [createReaction, { loading, data, error }] = useMutation(
    MUTATION_CREATE_REACTION
  );

  const handleScrollOptionOpen = (event) => {
    setScrollOptionAnchorEl(event.currentTarget);
  };

  const handleScrollOptionClose = () => {
    setScrollOptionAnchorEl(null);
  };
  const handleCreateReaction = (reaction) => {
    createReaction({
      variables: {
        data: {
          _id: scroll?._id,
          type: 'post',
          reaction: reaction,
        },
      },
    });
  };

  const getCreationTime = (time) => {
    let ms = new Date().getTime() - time;
    let seconds = Math.round(ms / 1000);
    let minutes = Math.round(ms / (1000 * 60));
    let hours = Math.round(ms / (1000 * 60 * 60));
    let days = Math.round(ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) return 'a few seconds ago';
    else if (minutes < 60) return minutes + 'm ago';
    else if (hours < 24) return hours + 'h ago';
    else return days + 'd ago';
  };
  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader
          avatar={<Avatar aria-label='recipe'>R</Avatar>}
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
          subheader={getCreationTime(scroll?.createdAt)}
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {scroll?.content}
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
