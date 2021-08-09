import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  //CircularProgress,
  //Grid,
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
        {trending &&
          trending.map(post => (
            <ListItem key={post?._id} divider>
              <ListItemAvatar>
                <Avatar variant='square'>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={post.content}
                secondary={`${post?.reactions?.likes} Likes . ${post?.comments} Comments`}
              />
            </ListItem>
          ))}
        {/*         {loading && (
          <Grid align='center'>
            <CircularProgress color='primary' size={24} thickness={4} />
          </Grid>
        )}
        {trending &&
          trending.slice(0, 5).map((post) => (
            <ListItem key={post?._id} divider>
              <ListItemAvatar>
                <Avatar variant='square'>
                  <MessageOutlined />
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
          <Typography variant='body2'>
            Trending posts will appear hear..start commenting!!
          </Typography>
        )} */}
      </List>
    </Paper>
  );
}
