import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  ImageRounded,
  MoreHorizRounded,
  PersonRounded,
  Send,
} from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import TextField from '../../../../components/TextField';
import { getUserInitials } from '../../../../utilities/Helpers';
import { contentBodyFactory } from '../../utilities/functions';
import {
  MUTATION_CREATE_REACTION,
  QUERY_GET_COMMENTS,
} from '../../utilities/queries';
import CommentOptionsPopover from './CommentOptionsPopover';

const commentOptionId = 'menu-comment-option';
export default function Comment({
  comment,
  style,
  setOpenImage,
  onCreateComment,
  comment_image,
  scroll,
  setCommentToEdit,
  setUpdateCommentOpen,
  setFlaggedResource,
  setOpenFlag,
  setImagePreviewURL,
  setImagePreviewOpen,
}) {
  const theme = useTheme();
  const [commentOptionAnchorEl, setCommentOptionAnchorEl] = useState(null);
  const isCommentOptionOpen = Boolean(commentOptionAnchorEl);
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

  const handleCommentOptionOpen = event => {
    setCommentOptionAnchorEl(event.currentTarget);
  };

  const handleCommentOptionClose = () => {
    setCommentOptionAnchorEl(null);
  };

  const handleCreateReaction = event => {
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

  const commentUserInitials = getUserInitials(comment?.author?.displayName);
  const scrollUserInitials = getUserInitials(scroll?.author?.displayName);

  return (
    <>
      <div style={style} className='d-flex flex-row flex-start'>
        <Avatar src={comment?.author?.profile_pic} className='mx-2'>
          {commentUserInitials}
        </Avatar>
        <div className='mb-3 flex-1'>
          <Card
            style={{
              backgroundColor: theme.palette.background.comment,
            }}
            elevation={0}
          >
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
                  size='small'
                  className='m-1 p-1'
                  aria-label='show more'
                  aria-controls={commentOptionId}
                  aria-haspopup='true'
                  onClick={handleCommentOptionOpen}
                >
                  <MoreHorizRounded />
                </IconButton>
              </div>
              <Typography variant='body2' color='textSecondary' component='p'>
                <Typography
                  dangerouslySetInnerHTML={{
                    __html: contentBodyFactory(comment),
                  }}
                ></Typography>

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
                            process.env.REACT_APP_BACKEND_URL + comment.image
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
                            'url(' +
                            process.env.REACT_APP_BACKEND_URL +
                            comment.image +
                            ')',
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
            </CardContent>
          </Card>
          <div className='center-horizontal'>
            <Typography
              colorAlt='inherit'
              component={Button}
              variantAlt='text'
              onClick={handleCreateReaction}
              textCase
              className='p-0 my-2'
            >
              Like
            </Typography>
            <Typography
              className='mx-1 my-2'
              variant='body2'
              color='textSecondary'
            >
              {`${comment?.reactions?.likes}`}
            </Typography>
            <Divider orientation='vertical' />
            {/* {comment?.response_to ? '' : '.'} */}
            {!comment?.response_to && (
              <Typography
                colorAlt='inherit'
                component={Button}
                onClick={() => {
                  setOpenReplies(true);
                  setResponseTo(comment?._id);
                }}
                textCase
                variantAlt='text'
                className='p-0 my-1'
              >
                Reply
              </Typography>
            )}
            {!comment?.response_to && (
              <>
                {' '}
                <Typography
                  className='mx-2 my-2'
                  variant='body2'
                  color='textSecondary'
                >
                  .
                </Typography>
                <Typography
                  className='p-0 my-2'
                  variant='body2'
                  color='textSecondary'
                >
                  {`${comment?.replies} ${
                    comment?.replies === 1 ? 'Reply' : 'Replies'
                  }`}
                </Typography>
              </>
            )}
          </div>
          {openReplies && (
            <div className='center-horizontal'>
              <Avatar src={scroll?.author?.profile_pic} className='mx-2'>
                {scrollUserInitials}
              </Avatar>
              <TextField
                error={replyErr}
                multiline
                errorText={replyErr && 'The reply cannot be empty'}
                rowsMax={10}
                id='reply-field'
                placeholder='Reply'
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleCreateReply(e);
                  }
                }}
                onChange={e =>
                  setReply(
                    reply?.length >= 250
                      ? e.target.value.substring(0, e.target.value.length - 1)
                      : e.target.value
                  )
                }
                adornment={
                  <IconButton
                    size='small'
                    className='m-1 p-1'
                    onClick={() => {
                      setOpenImage(true);
                    }}
                  >
                    <ImageRounded />
                  </IconButton>
                }
                adornmentType='end'
                value={reply}
              />
              <IconButton
                size='small'
                className='m-1 p-1'
                // className='mx-3'
                onClick={handleCreateReply}
                // size='small'
              >
                <Send />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <CommentOptionsPopover
        setFlaggedResource={setFlaggedResource}
        setOpenFlag={setOpenFlag}
        setUpdateCommentOpen={setUpdateCommentOpen}
        setCommentToEdit={setCommentToEdit}
        comment={comment}
        commentOptionId={commentOptionId}
        commentOptionAnchorEl={commentOptionAnchorEl}
        isCommentOptionOpen={isCommentOptionOpen}
        handleCommentOptionClose={handleCommentOptionClose}
      />
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
              setUpdateCommentOpen={setUpdateCommentOpen}
              setCommentToEdit={setCommentToEdit}
              setImagePreviewURL={setImagePreviewURL}
              setImagePreviewOpen={setImagePreviewOpen}
              setFlaggedResource={setFlaggedResource}
              setOpenFlag={setOpenFlag}
            />
          ))}
    </>
  );
}
