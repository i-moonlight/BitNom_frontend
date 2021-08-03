import { useMutation } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { MoreHorizRounded, LaunchRounded } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../components/Button';
//import TextField from '../../../components/TextField';
import CommentOptionsPopover from './CommentOptionsPopover';
import {
  MUTATION_CREATE_REACTION,
  QUERY_GET_COMMENTS,
  GET_BOOKMARKED_COMMENTS,
} from '../utilities/queries';

const commentOptionId = 'menu-comment-option';
export default function SavedComment({
  comment,
  style,
  setFlaggedResource,
  setOpenFlag,
  setImagePreviewURL,
  setImagePreviewOpen,
}) {
  const [commentOptionAnchorEl, setCommentOptionAnchorEl] = useState(null);
  const isCommentOptionOpen = Boolean(commentOptionAnchorEl);
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);

  const handleCommentOptionOpen = (event) => {
    setCommentOptionAnchorEl(event.currentTarget);
  };

  const handleCommentOptionClose = () => {
    setCommentOptionAnchorEl(null);
  };

  const handleCreateReaction = (event) => {
    event.preventDefault();
    event.stopPropagation();
    createReaction({
      variables: {
        data: {
          _id: comment?._id,
          type: 'comment',
          reaction: 'like',
        },
      },
      refetchQueries: [
        {
          query: QUERY_GET_COMMENTS,
          variables: { data: { scroll_id: comment?.scroll } },
        },
        {
          query: GET_BOOKMARKED_COMMENTS,
          variables: {
            data: {
              sortAscending: false,
            },
          },
        },
      ],
    });
  };

  return (
    <>
      <div style={style} className='d-flex flex-row flex-start'>
        <Tooltip title='Go to scroll' aria-label='Scroll link'>
          <Avatar className='mx-2'>
            <LaunchRounded />
          </Avatar>
        </Tooltip>
        <div className='mb-3 flex-1'>
          <Card variant='outlined'>
            <CardContent>
              <div className='center-horizontal space-between w-100'>
                <Typography display='inline'>
                  {comment?.author?.displayName}{' '}
                  <Typography display='inline' variant='body2'>
                    . @{comment?.author?._id}
                  </Typography>{' '}
                  <Typography display='inline' variant='body2'>
                    . {moment(comment.creation_date).fromNow()}
                  </Typography>
                </Typography>
                <IconButton
                  aria-label='show more'
                  aria-controls={commentOptionId}
                  aria-haspopup='true'
                  onClick={handleCommentOptionOpen}
                  size='small'
                >
                  <MoreHorizRounded />
                </IconButton>
              </div>
              <Typography variant='body2' color='textSecondary' component='p'>
                {comment?.content}

                {comment?.image.length > 0 && (
                  <Grid container spacing={2}>
                    <Grid
                      className='mt-2'
                      key={comment?.image}
                      item
                      xs={12}
                      onClick={() => {
                        setImagePreviewURL &&
                          setImagePreviewURL(
                            'http://localhost:3000' + comment.image
                          );
                        setImagePreviewOpen(true);
                      }}
                    >
                      <div
                        style={{
                          height: 200,
                          borderRadius: 8,
                          width: '100%',
                          backgroundImage:
                            'url(http://localhost:3000' + comment.image + ')',
                          backgroundSize: 'cover',
                          backgroundColor: 'rgba(0,0,0,0.2)',
                          backgroundBlendMode: 'soft-light',
                          cursor: 'pointer',
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Typography>
              <br />
              <Typography variant='body2' color='textSecondary' component='p'>
                {`${comment?.reactions?.likes} ${
                  comment?.reactions?.likes === 1 ? 'Like' : 'Likes'
                } . ${comment?.replies} ${
                  comment?.replies === 1 ? 'Reply' : 'Replies'
                }`}
              </Typography>
            </CardContent>
          </Card>
          <Typography>
            <Button
              color='default'
              onClick={handleCreateReaction}
              textCase
              variant='text'
            >
              Like
            </Button>
          </Typography>
        </div>
      </div>
      <CommentOptionsPopover
        setFlaggedResource={setFlaggedResource}
        setOpenFlag={setOpenFlag}
        comment={comment}
        commentOptionId={commentOptionId}
        commentOptionAnchorEl={commentOptionAnchorEl}
        isCommentOptionOpen={isCommentOptionOpen}
        handleCommentOptionClose={handleCommentOptionClose}
      />
    </>
  );
}
