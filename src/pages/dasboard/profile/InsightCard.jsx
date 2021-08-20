import {
  Box,
  Card,
  CardContent,
  Divider,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';

export default function InsightCard() {
  const [tabValue, setTabValue] = React.useState(0);
  //   const state = useSelector(state => state);
  //   const user = state.auth.user;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
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
  );
}

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
