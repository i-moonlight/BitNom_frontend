import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  //Badge,
  //CardActions,
  //colors,
  //IconButton,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  //AddRounded,
  AssignmentIndOutlined,
  //BookmarkRounded,
  CalendarTodayOutlined,
  //CollectionsBookmarkRounded,
  //EventRounded,
  Language,
  //Notifications,
  PeopleRounded,
  //PersonRounded,
  //Settings,
  StarRounded,
  StorageRounded,
  //TimelapseOutlined,
  TimelineRounded,
} from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import useColors from '../../../hooks/useColors';

export default function ProfileCard() {
  const [tabValue, setTabValue] = React.useState(0);
  const state = useSelector(state => state);
  const user = state.auth.user;
  const colors = useColors();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
              color={colors.buttonAlt}
            >
              Joined April 2016
            </Button>
            <Button
              startIcon={<Language />}
              textCase
              variant='text'
              color={colors.buttonAlt}
            >
              Website
            </Button>
            <Button
              startIcon={<AssignmentIndOutlined />}
              textCase
              variant='text'
              color={colors.buttonAlt}
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
          {/* <Typography variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              perferendis ratione.
            </Typography> */}
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 16 }} variant={'outlined'}>
        <CardContent>
          <Typography className='mb-2' variant='body1'>
            Insight Overview
          </Typography>
          <Card variant='outlined'>
            <CardContent>
              <div className='space-between'>
                <Insight text='Profile Reached' value={108} />
                <Divider
                  style={{
                    width: 1,
                    height: 60,
                  }}
                  orientation='vertical'
                />
                <Insight text='Connection Gained' value={24} />
                <Divider
                  style={{
                    width: 1,
                    height: 60,
                  }}
                  orientation='vertical'
                />
                <Insight text='Search Appeared' value={5} />
              </div>
            </CardContent>
          </Card>
          <div>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              // aria-label='simple tabs example'
              indicatorColor='primary'
            >
              <ProfileTab label='Activities' />
              <ProfileTab label='Saved Items' />
              <ProfileTab label='My Connections' />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              No activities Yet
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              no Saved Items Yet
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              No connections yet
            </TabPanel>
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

const Insight = ({ value, text }) => (
  <div className='text-center'>
    <Typography color='primary' variant='body1'>
      {value}
    </Typography>
    <Typography variant='body1'>{text}</Typography>
  </div>
);

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ProfileTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(14),
    margin: 0,
    '&:focus': {
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(props => <Tab disableRipple {...props} />);
