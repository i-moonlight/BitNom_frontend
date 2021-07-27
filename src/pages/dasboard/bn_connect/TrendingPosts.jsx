import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { MessageOutlined } from '@material-ui/icons';
import React from 'react';

export default function TrendingPosts({ posts }) {
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
        {posts &&
          posts.map(post => (
            <ListItem key={post?._id} divider>
              <ListItemAvatar>
                <Avatar variant='square'>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='What is crypto currency?'
                secondary='12.1K Likes . 120 Comments'
              />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
}
