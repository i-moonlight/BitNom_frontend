import { useMutation, useQuery } from '@apollo/client';
import { green, red } from '@material-ui/core/colors';
import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import {
  ImageRounded,
  MoreHorizRounded,
  Send,
  ThumbDownRounded,
  ThumbUpRounded,
  PanToolRounded,
  FavoriteRounded,
} from '@material-ui/icons';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../../../../components/Button';
import ReactionButton from '../../../../../components/ReactionButton';
import TextField from '../../../../../components/TextField';
import { getUserInitials } from '../../../../../utilities/Helpers';
import {
  contentBodyFactory,
  getReactionsSum,
  generateRandomColor,
} from '../../../utilities/functions';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  MUTATION_CREATE_REACTION,
  MUTATION_REMOVE_REACTION,
  QUERY_GET_COMMENTS,
} from '../../../utilities/queries';
import CommentOptionsPopover from './CommentOptionsPopover';

const useStyles = makeStyles(theme => ({
  clickableTypography: {
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('md')]: {
      textDecoration: 'underline',
    },
  },
  replies: {
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  primary: {
    color: '#006097',
  },
}));

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
  setOpenReactions,
  setResourceReactions,
  setImagePreviewURL,
  setImagePreviewOpen,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [commentOptionAnchorEl, setCommentOptionAnchorEl] = useState(null);
  const isCommentOptionOpen = Boolean(commentOptionAnchorEl);
  const [openReplies, setOpenReplies] = useState(false);
  const [reply, setReply] = useState('');
  const [userReaction, setUserReaction] = useState();
  const [likeHovered, setLikeHovered] = useState(false);
  const [responseTo, setResponseTo] = useState('');
  const [replyErr, setReplyErr] = useState(false);
  const state = useSelector(st => st);
  const user = state.auth.user;
  const history = useHistory();

  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
  const [removeReaction] = useMutation(MUTATION_REMOVE_REACTION);
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
    setUserReaction(reaction);
  };
  const handleRemoveReaction = () => {
    removeReaction({
      variables: {
        data: {
          _id: comment?._id,
          type: 'comment',
        },
      },
      refetchQueries: [
        {
          query: QUERY_GET_COMMENTS,
          variables: { data: { scroll_id: comment?.scroll } },
        },
      ],
    });
    setUserReaction();
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

  const getUserReaction = useCallback(
    resource => {
      let reaction;
      resource?.reacted_to_by?.forEach(item => {
        if (item?.user_id?._id === user?._id) reaction = item?.reaction_type;
      });
      console.log(resource, 'JSL');
      return reaction;
    },
    [user?._id]
  );

  const contentClickHandler = e => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;
    e.preventDefault();
    e.stopPropagation();
    history.push(targetLink.href.substring(location.origin.length));
  };

  useEffect(() => {
    const reaction = getUserReaction(comment);
    setUserReaction(reaction);
  }, [comment, getUserReaction]);

  const commentUserInitials = getUserInitials(comment?.author?.displayName);
  const currentUserInitials = getUserInitials(user?.displayName);

  return (
    <>
      <div style={style} className='d-flex flex-row flex-start'>
        <Avatar
          style={{
            backgroundColor: generateRandomColor(),
          }}
          src={comment?.author?.profile_pic}
          className='mx-2'
        >
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
                  onClick={e => contentClickHandler(e)}
                  dangerouslySetInnerHTML={{
                    __html: contentBodyFactory(comment),
                  }}
                  style={{ zIndex: 2 }}
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
          <Card
            style={{
              position: 'absolute',
              alignSelf: 'baseline',
              borderRadius: 10,
              backgroundColor: theme.palette.background.default,
              display: likeHovered ? 'block' : 'none',
              transform: 'translateY(-28px)',
              zIndex: 10,
            }}
            onMouseEnter={() => setLikeHovered(true)}
            onMouseLeave={() => setLikeHovered(false)}
          >
            <Button
              color='default'
              textCase
              onClick={() => {
                handleCreateReaction('like');
                setLikeHovered(false);
              }}
              variant='text'
              startIcon={<ThumbUpRounded className={classes.primary} />}
            >
              Like
            </Button>
            <Button
              color='default'
              textCase
              onClick={() => {
                handleCreateReaction('love');
                setLikeHovered(false);
              }}
              variant='text'
              startIcon={<FavoriteRounded className={classes.red} />}
            >
              Love
            </Button>
            <Button
              color='default'
              textCase
              onClick={() => {
                handleCreateReaction('dislike');
                setLikeHovered(false);
              }}
              variant='text'
              startIcon={<ThumbDownRounded className={classes.primary} />}
            >
              Dislike
            </Button>
            <Button
              color='default'
              textCase
              onClick={() => {
                handleCreateReaction('celebrate');
                setLikeHovered(false);
              }}
              variant='text'
              startIcon={<PanToolRounded className={classes.green} />}
            >
              Celebrate
            </Button>
          </Card>
          <div className='center-horizontal'>
            <ReactionButton
              handleRemoveReaction={handleRemoveReaction}
              reaction={userReaction}
              setLikeHovered={setLikeHovered}
              onMouseEnter={() => setLikeHovered(true)}
              onMouseLeave={() => setLikeHovered(false)}
              variant='text'
              color='default'
              textCase
            />
            <Typography
              className={classes.clickableTypography}
              variant='body2'
              color='textSecondary'
              onClick={() => {
                setOpenReactions(true);
                setResourceReactions(comment);
              }}
            >
              {`${getReactionsSum(comment)} ${
                getReactionsSum(comment) === 1 ? 'Reaction' : 'Reactions'
              }`}
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
              <Avatar
                style={{
                  backgroundColor: generateRandomColor(),
                }}
                src={scroll?.author?.profile_pic}
                className='mx-2'
              >
                {currentUserInitials}
              </Avatar>
              <TextField
                fullWidth
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
                      : e.target.value.substring(0, 250)
                  )
                }
                adornment={
                  <IconButton
                    size='small'
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
        setOpenReactions={setOpenReactions}
        setResourceReactions={setResourceReactions}
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
              setOpenReactions={setOpenReactions}
              setResourceReactions={setResourceReactions}
            />
          ))}
    </>
  );
}
