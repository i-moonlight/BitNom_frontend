import { useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';
import { MoreHorizRounded, PersonRounded } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { QUERY_GET_COMMENTS } from '../utilities/queries';

export default function Comment({ comment, style }) {
  const {
    loading: commentsLoading,
    data: commentsData,
    error: commentsError,
  } = useQuery(QUERY_GET_COMMENTS, {
    variables: { scroll_id: comment.scroll },
  });

  console.log('cmtdt: ', commentsData);

  return (
    <>
      <div style={style} className='d-flex flex-row flex-start'>
        <Avatar src={comment?.author?.image} className='mx-2'>
          <PersonRounded />
        </Avatar>
        <div className='mb-2 flex-1'>
          <Card variant='outlined'>
            <CardContent>
              <div className='center-horizontal space-between w-100'>
                <Typography>
                  {comment?.author?.displayName} . @{comment?.author?._id} .{' '}
                  {moment(comment.creation_date).fromNow()}
                </Typography>
                <IconButton size='small'>
                  <MoreHorizRounded />
                </IconButton>
              </div>
              <Typography>{comment?.content}</Typography>
              <br />
              <Grid container spacing={2} className='mb-2'>
                {comment?.image.length > 0 && (
                  <Grid className='mt-3' key={comment?.image} item xs={12}>
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
                )}
              </Grid>
            </CardContent>
          </Card>
          <Typography>Like 12 | Reply . 5 Replies</Typography>
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
