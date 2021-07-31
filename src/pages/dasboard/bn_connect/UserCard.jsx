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

export default function UserCard({ setOpen }) {
  const state = useSelector((state) => state);
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
                src={user?.image}
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
              <Typography className='pt-1' variant='body2'>
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
          {/* <Typography variant='body2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            perferendis ratione.
          </Typography> */}
          <Divider style={{ marginTop: 8, marginBottom: 8 }} />

          <div className='center-horizontal space-between'>
            <div>
              <Typography variant='body2'>Scrolls</Typography>
              <div className='center-horizontal'>
                <CollectionsBookmarkRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body2'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body2'>Following</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body2'>0</Typography>
              </div>
            </div>
            <div>
              <Typography variant='body2'>Followers</Typography>
              <div className='center-horizontal'>
                <PersonRounded
                  color='primary'
                  className='mx-2'
                  fontSize='small'
                />
                <Typography variant='body2'>0</Typography>
              </div>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <BookmarkRounded />
          </IconButton>
          <Typography variant='body2'>Saved Items</Typography>
        </CardActions>
        <Divider />
        <CardActions className='py-0'>
          <IconButton>
            <EventRounded />
          </IconButton>
          <Typography variant='body2'>
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
      <Button onClick={setOpen} color='primary' fullWidth>
        Start Scroll
      </Button>
    </div>
  );
}
