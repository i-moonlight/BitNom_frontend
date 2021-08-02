import { useQuery } from '@apollo/client';
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { MessageOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

import { QUERY_LOAD_SCROLLS } from '../utilities/queries';

export default function TrendingPosts() {
  const [trending, setTrending] = useState([]);
  const { data, loading } = useQuery(QUERY_LOAD_SCROLLS, {
    variables: { data: { sortByField: 'comments' } },
  });
  useEffect(() => {
    if (data?.Posts?.get) {
      let posts = data?.Posts?.get;
      setTrending(posts);
    }
  }, [data]);
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
        )}
      </List>
    </Paper>
  );
}
