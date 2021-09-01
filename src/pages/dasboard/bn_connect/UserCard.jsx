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
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../../../components/Button';
import { getUserInitials } from '../../../utilities/Helpers';

export default function UserCard({ setOpen, followers, following, scrolls }) {
  const state = useSelector((state) => state);
  const user = state.auth.user;
  const card = useRef();
  const history = useHistory();
  const location = useLocation();
  const sticky =
    window.innerHeight < card?.current?.clientHeight + 176
      ? window.innerHeight - (card?.current?.clientHeight + 24)
      : 160;

  const userInitials = getUserInitials(user?.displayName);
  return (
    <div
      ref={card}
      style={{
        position: 'sticky',
        top: sticky,
        //176
      }}
    >
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardMedia
          style={{ height: 100 }}
          image={'https://picsum.photos/300/200'}
          component='img'
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
                src={user?.profile_pic}
                variant='rounded'
                style={{
                  backgroundColor: '#fed132',
                  marginRight: 12,
                  width: 80,
                  height: 80,
                }}
              >
                {userInitials}
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
              <IconButton size='small' className='m-1 p-1'>
                <Notifications />
              </IconButton>
              <IconButton size='small' className='m-1 p-1'>
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
                <Typography variant='body2'>{scrolls}</Typography>
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
                <Typography variant='body2'>{following}</Typography>
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
                <Typography variant='body2'>{followers}</Typography>
              </div>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardActions className='py-0'>
          <Button
            color='inherit'
            textCase
            startIcon={<BookmarkRounded />}
            variant='text'
            className='py-1 my-1'
            onClick={() => history.push('/dashboard/bookmarks')}
          >
            Saved Items
          </Button>
        </CardActions>
        <Divider />
        <CardActions className='py-0'>
          <Button
            color='inherit'
            textCase
            startIcon={<EventRounded />}
            variant='text'
            className='py-1 my-1 me-3'
            onClick={() => history.push('/dashboard/events')}
          >
            Events
          </Button>
          <Badge badgeContent='3' color='error'></Badge>
          <IconButton
            size='small'
            className=' p-1'
            color='primary'
            style={{ marginLeft: 'auto' }}
            onClick={() => history.push('/dashboard/events')}
          >
            <AddRounded />
          </IconButton>
        </CardActions>
      </Card>
      <Button
        style={{
          display: location.pathname.includes('people') ? 'none' : 'block',
        }}
        onClick={setOpen}
        color='primary'
        fullWidth
      >
        Start Scroll
      </Button>
    </div>
  );
}
