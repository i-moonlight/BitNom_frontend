import { useQuery, useMutation } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { MoreHorizRounded, PersonRounded } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import {
  QUERY_GET_COMMENTS,
  MUTATION_CREATE_REACTION,
  QUERY_LOAD_SCROLLS,
} from '../utilities/queries';
import Button from '../../../components/Button';

export default function Comment({
  comment,
  style,
  setResponseTo,
  setOpenReplies,
}) {
  const [createReaction] = useMutation(MUTATION_CREATE_REACTION);
  const {
    data: commentsData,
    // loading: commentsLoading,
    // error: commentsError,
  } = useQuery(QUERY_GET_COMMENTS, {
    variables: { data: { scroll_id: comment?.scroll } },
  });
  const handleCreateReaction = (reaction) => {
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
                <Typography display='inline'>
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
                    <Grid className='mt-2' key={comment?.image} item xs={12}>
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
          </Typography>
        </div>
      </div>
      {commentsData &&
        commentsData?.Comments?.get
          .filter(
            (commentInner) => commentInner?.response_to?._id === comment?._id
          )
          .map((commentInner) => (
            <Comment
              style={{
                marginLeft: 30,
              }}
              key={commentInner._id}
              comment={commentInner}
            />
          ))}
    </>
  );
}
