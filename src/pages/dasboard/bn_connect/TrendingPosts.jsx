import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  CircularProgress,
  Grid,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { MessageOutlined } from '@material-ui/icons';
import React from 'react';

export default function TrendingPosts({ trending, loading }) {
  console.log(trending, loading);

  return (
    <Paper
      style={{
        marginBottom: 16,
      }}
    >
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <Typography style={{ marginLeft: 8 }} variant='body1'>
          Trending Posts
        </Typography>
        {loading && (
          <Grid align='center'>
            <CircularProgress color='primary' size={24} thickness={4} />
          </Grid>
        )}
        {trending &&
          trending.slice(0, 4).map((post) => (
            <ListItem key={post?._id} divider>
              <ListItemAvatar>
                <Avatar
                  src={
                    post?.images?.length > 0
                      ? process.env.REACT_APP_BACKEND_URL + post?.images[0]
                      : ''
                  }
                  variant='square'
                >
                  <MessageOutlined
                    style={{
                      display: post?.images.length > 0 ? 'none' : 'block',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body2'>{post?.content}</Typography>
                }
                secondary={`${post?.reactions?.likes} ${
                  post?.reactions?.likes === 1 ? 'Like' : 'Likes'
                } . ${post?.comments} ${
                  post?.comments === 1 ? 'Comment' : 'Comments'
                }`}
              />
            </ListItem>
          ))}
        {!loading && trending.length === 0 && (
          <Grid align='center'>
            <Typography color='Primary' variant='body2'>
              Trending posts will appear hear..start commenting.
            </Typography>
          </Grid>
        )}
      </List>
    </Paper>
  );
}
