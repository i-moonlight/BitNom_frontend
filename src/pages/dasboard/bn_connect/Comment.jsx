import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  ImageRounded,
  MoreHorizRounded,
  PersonRounded,
  Send,
} from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import {
  MUTATION_CREATE_REACTION,
  QUERY_GET_COMMENTS,
} from '../utilities/queries';

export default function Comment({
  comment,
  style,
  setOpenImage,
  onCreateComment,
  comment_image,
  scroll,
  setImagePreviewURL,
  setImagePreviewOpen,
}) {
  const [openReplies, setOpenReplies] = useState(false);
  const [reply, setReply] = useState('');
  const [responseTo, setResponseTo] = useState('');
  const [replyErr, setReplyErr] = useState(false);
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
  const {
    data: commentsData,
    // loading: commentsLoading,
    // error: commentsError,
  } = useQuery(QUERY_GET_COMMENTS, {
    variables: { data: { scroll_id: comment?.scroll } },
  });

  const handleCreateReaction = reaction => {
    createReaction({
      variables: {
        data: {
          _id: comment?._id,
          type: 'comment',
          reaction: reaction,
        },
      },
      refetchQueries: [
        {
          query: QUERY_GET_COMMENTS,
          variables: { data: { scroll_id: comment?.scroll } },
        },
      ],
    });
  };

  const handleCreateReply = e => {
    e.preventDefault();
    if (reply.trim() == '') return setReplyErr(true);
    onCreateComment({
      content: reply,
      scroll: scroll._id,
      image: comment_image,
      response_to: responseTo,
    });
    setReply('');
  };

  return (
    <>
      <div style={style} className='d-flex flex-row flex-start'>
        <Avatar src={comment?.author?.image} className='mx-2'>
          <PersonRounded />
        </Avatar>
        <div className='mb-3 flex-1'>
          <Card variant='outlined'>
            <CardContent>
              <div className='center-horizontal space-between w-100'>
                <Typography variant='body2' display='inline'>
                  {comment?.author?.displayName}{' '}
                  <Typography display='inline' variant='body2'>
                    . @{comment?.author?._id}
                  </Typography>{' '}
                  <Typography display='inline' variant='body2'>
                    . {moment(comment.creation_date).fromNow()}
                  </Typography>
                </Typography>
                <IconButton size='small'>
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
          <span>
            <Button
              color='default'
              onClick={() => handleCreateReaction('like')}
              textCase
              variant='text'
            >
              Like
            </Button>
            {comment?.response_to ? '' : '.'}
            {!comment?.response_to && (
              <Button
                color='default'
                onClick={() => {
                  setOpenReplies(true);
                  setResponseTo(comment?._id);
                }}
                textCase
                variant='text'
              >
                Reply
              </Button>
            )}
          </span>
          {openReplies && (
            <div className='center-horizontal'>
              <Avatar src={scroll?.author?.image} className='mx-2'>
                <PersonRounded />
              </Avatar>
              <TextField
                error={replyErr}
                errorText={replyErr && 'The reply cannot be empty'}
                rows={5}
                rowsMax={10}
                id='reply-field'
                placeholder='Reply'
                onChange={e =>
                  setReply(
                    reply?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value
                  )
                }
                adornment={
                  <IconButton
                    onClick={() => {
                      setOpenImage(true);
                    }}
                    size='small'
                  >
                    <ImageRounded />
                  </IconButton>
                }
                adornmentType='end'
                value={reply}
              />
              <IconButton
                className='mx-3'
                onClick={handleCreateReply}
                // size='small'
              >
                <Send />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {commentsData &&
        commentsData?.Comments?.get
          .filter(
            commentInner => commentInner?.response_to?._id === comment?._id
          )
          .map(commentInner => (
            <Comment
              style={{
                marginLeft: 30,
              }}
              key={commentInner._id}
              comment={commentInner}
              setImagePreviewURL={setImagePreviewURL}
              setImagePreviewOpen={setImagePreviewOpen}
            />
          ))}
    </>
  );
}
