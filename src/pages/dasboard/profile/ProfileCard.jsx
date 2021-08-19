import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
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
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { getUserInitials } from '../../../utilities/Helpers';

export default function ProfileCard() {
  const state = useSelector(state => state);
  const user = state.auth.user;
  const theme = useTheme();
  const userInitials = getUserInitials(user?.displayName);

  return (
    <div>
      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardMedia
          style={{ height: 120 }}
          image={'https://picsum.photos/300/200'}
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
                flex: 1,
                position: 'relative',
                top: 60,
              }}
              className='space-between'
            >
              <Typography className='text-success' variant='body2'>
                Online
              </Typography>
              <Typography color='primary' variant='body2'>
                Edit Profile
              </Typography>
            </div>
          </div>
          <div className='my-4 center-horizontal'>
            <Button
              startIcon={<CalendarTodayOutlined />}
              textCase
              variant='text'
              color={theme.palette.text.primary}
            >
              Joined April 2016
            </Button>
            <Button
              startIcon={<Language />}
              textCase
              variant='text'
              color={theme.palette.text.primary}
            >
              Website
            </Button>
            <Button
              startIcon={<AssignmentIndOutlined />}
              textCase
              variant='text'
              color={theme.palette.text.primary}
            >
              Portfolio
            </Button>
          </div>
          <div className='my-4 space-between'>
            <IconInfo icon={<StarRounded />} value='39634' text='Reputation' />
            <IconInfo icon={<StorageRounded />} value='108' text='BN Token' />
            <IconInfo icon={<TimelineRounded />} value='$200' text='Earnings' />
            <IconInfo icon={<PeopleRounded />} value='47' text='Connections' />
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
