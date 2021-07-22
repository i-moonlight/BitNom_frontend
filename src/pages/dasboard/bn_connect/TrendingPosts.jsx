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

export default function TrendingPosts() {
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
          Trending Post
        </Typography>
        {[1, 2, 3, 4, 5].map((item) => (
          <ListItem key={item} divider>
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
