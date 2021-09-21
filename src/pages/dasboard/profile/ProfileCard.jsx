import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {
  AssignmentIndOutlined,
  CalendarTodayOutlined,
  Language,
  PeopleRounded,
  StarRounded,
  StorageRounded,
  TimelineRounded,
} from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import Button from '../../../components/Button';
import { getUserInitials } from '../../../utilities/Helpers';
import { generateRandomColor } from '../utilities/functions';

export default function ProfileCard({ profile, profileView }) {
  // const state = useSelector(st => st);
  // const user = state.auth.user;
  const profileInitials = getUserInitials(profile?.displayName);

  return (
    <div>
      <Card className='mb-3' variant={'outlined'}>
        <CardMedia
          style={{ height: 120, backgroundColor: '#ddd' }}
          image={profile?.cover_pic}
          component='img'
          // title='Contemplative Reptile'
        />
        <CardContent
          style={{
            position: 'relative',
            top: -60,
            marginBottom: -60,
          }}
        >
          <div className='d-flex'>
            <div>
              <Avatar
                src={profile?.profile_pic}
                variant='rounded'
                style={{
                  backgroundColor: generateRandomColor(),
                  marginRight: 12,
                  width: 80,
                  height: 80,
                }}
              >
                {profileInitials}
              </Avatar>
              <Typography className='pt-1' variant='body2'>
                {profile?.displayName}
              </Typography>
              <Typography gutterBottom color='textSecondary' variant='body2'>
                {`@${profile?._id}`}
              </Typography>
            </div>

            <div
              style={{
                flex: 1,
                position: 'relative',
                top: 60,
              }}
              className='space-between'
            >
              <Typography className='text-success' variant='body2'>
                Online
              </Typography>
              {!profileView && (
                <Typography color='primary' variant='body2'>
                  Edit Profile
                </Typography>
              )}
            </div>
          </div>
          <div className='my-4 center-horizontal'>
            <Button
              startIcon={<CalendarTodayOutlined />}
              textCase
              variant='text'
              color='inherit'
            >
              Joined {moment(profile?.date).format('LL')}
            </Button>
            <Button
              startIcon={<Language />}
              textCase
              variant='text'
              color='inherit'
            >
              {profile?.website || 'Website'}
            </Button>
            <Button
              startIcon={<AssignmentIndOutlined />}
              textCase
              variant='text'
              color='inherit'
            >
              {profile?.portfolio || 'Portfolio'}
            </Button>
          </div>
          <div className='my-4 space-between'>
            <IconInfo
              icon={<StarRounded />}
              value={profile?.reputation}
              text='Reputation'
            />
            <IconInfo
              icon={<StorageRounded />}
              value={profile?.bnTokens?.earned}
              text='BN Token'
            />
            <IconInfo
              icon={<TimelineRounded />}
              value={'$' + (profile?.earnings || '0')}
              text='Earnings'
            />
            <IconInfo
              icon={<PeopleRounded />}
              value={profile?.connections}
              text='Connections'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const IconInfo = ({ icon, text, value }) => (
  <div>
    <Typography
      variant='body2'
      style={{
        marginRight: 16,
      }}
    >
      <span className='center-horizontal'>
        <span className='mx-1'>{value}</span>
        {icon}
      </span>
    </Typography>
    <Typography variant='body2'>{text}</Typography>
  </div>
);
