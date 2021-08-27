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
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { getUserInitials } from '../../../utilities/Helpers';

export default function SuggestedPeopleCard({ suggestedUsers }) {
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
        {suggestedUsers?.slice(0, 3)?.map((item) => (
          <ListItem key={item?._id} divider>
            <ListItemAvatar>
              <Avatar
                src={
                  item?.profile_pic
                    ? process.env.REACT_APP_BACKEND_URL + item?.profile_pic
                    : ''
                }
              >
                {item?.profile_pic ? '' : getUserInitials(item?.displayName)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant='body2'>{item?.displayName}</Typography>
              }
              secondary={'@' + item?._id}
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
