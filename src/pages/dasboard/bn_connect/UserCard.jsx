import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  AddRounded,
  BookmarkRounded,
  CollectionsBookmarkRounded,
  EventRounded,
  Notifications,
  PersonRounded,
  Settings,
} from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';

export default function UserCard() {
  const state = useSelector(state => state);
  const user = state.auth.user;

  return (
    <div
      style={{
        position: 'sticky',
        top: 176,
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardMedia
          style={{ height: 100 }}
          image={'https://picsum.photos/300/200'}
          // title='Contemplative Reptile'
        />
        <CardContent
          style={{
            position: 'relative',
            top: -80,
            marginBottom: -80,
          }}
        >
          <div className='space-between'>
            <div>
              <Avatar
                variant='rounded'
                style={{
                  backgroundColor: '#fed132',
                  marginRight: 12,
                  width: 80,
                  height: 80,
                }}
              >
                L
              </Avatar>
              <Typography className='pt-1' variant='body1'>
                {user?.displayName}
              </Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                {`@${user?._id}`}
              </Typography>
            </div>

            <div
              style={{
                position: 'relative',
                top: 60,
              }}
            >
              <IconButton>
                <Notifications />
              </IconButton>
              <IconButton>
                <Settings />
              </IconButton>
            </div>
          </div>
          {/* <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            perferendis ratione.
          </Typography> */}
          <Divider style={{ marginTop: 8, marginBottom: 8 }} />

          <div className='center-horizontal space-between'>
            <div>
              <Typography variant='body1'>Scrolls</Typography>
              <div className='center-horizontal'>
                <CollectionsBookmarkRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body1'>Following</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body1'>Followers</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body1'>0</Typography>
              </div>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <BookmarkRounded />
          </IconButton>
          <Typography>Saved Items</Typography>
        </CardActions>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <EventRounded />
          </IconButton>
          <Typography>
            Events
            <Badge badgeContent='3' color='secondary'>
              <span className='mx-2 '></span>
            </Badge>
          </Typography>
          <IconButton color='primary' style={{ marginLeft: 'auto' }}>
            <AddRounded />
          </IconButton>
        </CardActions>
      </Card>
      <Button color='primary' fullWidth>
        Start Scroll
      </Button>
    </div>
  );
}
