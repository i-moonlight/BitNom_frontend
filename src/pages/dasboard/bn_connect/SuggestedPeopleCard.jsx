import {
  Avatar,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { PersonRounded } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export default function SuggestedPeopleCard() {
  return (
    <Paper>
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <Typography style={{ marginLeft: 8 }} variant='body1'>
          People you may know
        </Typography>
        {[1, 2, 3].map(item => (
          <ListItem key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant='body2'>Andy Bo Wu</Typography>}
              secondary='@andybowu'
            />
            <ListItemIcon>
              {/* <SendRounded /> */}
              <Button size='small' variant='outlined' textCase>
                Follow
              </Button>
            </ListItemIcon>
          </ListItem>
        ))}
        <Divider />
        <Link to='/dashboard/people'>
          <Typography variant='body2' className='my-2' color='primary'>
            Show more
          </Typography>
        </Link>
      </List>
    </Paper>
  );
}
