import { useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Typography,
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
        <Card variant='outlined' className='mb-2 flex-1'>
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
          </CardContent>
        </Card>
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
            />
          ))}
    </>
  );
}
