import {
  AppBar,
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Hidden,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Tab,
  Tabs,
  Typography,
  useTheme,
  withStyles,
} from '@material-ui/core';
import {
  AccountBalanceWalletOutlined,
  Brightness3,
  ChevronRight,
  ChevronRightRounded,
  ExitToAppRounded,
  ForumRounded,
  MenuRounded,
  MoreVert,
  Notifications,
  PeopleRounded,
  PersonRounded,
  Search,
  SettingsRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logo_light from '../assets/logo_light.svg';
import { signout } from '../store/actions/authActions';
import { status } from '../store/local/dummy';
import Button from './Button';
import { useStyles } from './styles.components';

const BitTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: 0,
    '&:focus': {
      opacity: 1,
      color: '#fff',
    },
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const menuId = 'menu-profile';
const tabOptionsId = 'menu-tab-options';
const notificationId = 'menu-notifications';
const notificationOptionId = 'menu-notification-option';

export default function NavBar({ handleScrollOptionOpen }) {
  const [value, setValue] = useState(0);
  const [tabOptions, setTabOptions] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [tabOptionAnchorEl, setTabOptionAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationOptionAnchorEl, setNotificationOptionAnchorEl] =
    useState(null);

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const isMenuOpen = Boolean(menuAnchorEl);
  const isTabOptionOpen = Boolean(tabOptionAnchorEl);
  const isNotificationOpen = Boolean(notificationAnchorEl);
  const isNotificationOptionOpen = Boolean(notificationOptionAnchorEl);

  const handleMenuOpen = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTabOptionsOpen = event => {
    setTabOptionAnchorEl(event.currentTarget);
  };

  const handleTabOptionsClose = event => {
    setTabOptionAnchorEl(null);
  };

  const handleNotificationsOpen = event => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = event => {
    setNotificationAnchorEl(null);
  };

  const handleNotificationOptionOpen = event => {
    setNotificationOptionAnchorEl(event.currentTarget);
  };

  const handleNotificationOptionClose = event => {
    setNotificationOptionAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderMenu = (
    <Popover
      anchorEl={menuAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className='py-3' onClick={handleMenuClose}>
        My Profile
      </MenuItem>
      <MenuItem className='py-3' onClick={handleMenuClose}>
        Watchlist
      </MenuItem>
      <MenuItem className='py-3' onClick={handleMenuClose}>
        Account and Billing
      </MenuItem>
      <MenuItem className='py-3' onClick={handleMenuClose}>
        Settings
      </MenuItem>
      <MenuItem className='py-3' onClick={handleMenuClose}>
        <div className='center-horizontal'>
          <Typography>Referred Friends</Typography>
          <div className='px-2 center-horizontal'>
            <Typography className='px-1'>0</Typography>
            <PeopleRounded />
          </div>
        </div>
      </MenuItem>
      <Divider />
      <MenuItem className='py-3' onClick={handleMenuClose}>
        <div className='w-100 center-horizontal space-between'>
          <Typography>BN Token</Typography>
          <div className='px-2 center-horizontal'>
            <Typography className='px-1'>0</Typography>
            <AccountBalanceWalletOutlined />
          </div>
        </div>
      </MenuItem>
      <Divider />
      <MenuItem className='py-3' onClick={() => dispatch(signout())}>
        <div className='w-100 center-horizontal space-between'>
          <Typography color='secondary'>Sign Out</Typography>
          <div className='px-2 center-horizontal'>
            <ExitToAppRounded color='secondary' />
          </div>
        </div>
      </MenuItem>
    </Popover>
  );

  const renderTabOptions = (
    <Popover
      anchorEl={tabOptionAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      id={tabOptionsId}
      keepMounted
      open={isTabOptionOpen}
      onClose={handleTabOptionsClose}
    >
      {tabOptions &&
        tabOptions.map(({ label }) => (
          <MenuItem
            className='py-3 space-between'
            style={{
              width: tabOptionAnchorEl && tabOptionAnchorEl.offsetWidth,
            }}
            onClick={handleTabOptionsClose}
          >
            {label}
            <ChevronRightRounded />
          </MenuItem>
        ))}
    </Popover>
  );

  const renderNotifications = (
    <Popover
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationId}
      // keepMounted
      open={isNotificationOpen}
      onClose={handleNotificationsClose}
    >
      <List
        style={{ padding: 8, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <div className='space-between center-horizontal'>
          <Typography style={{ marginLeft: 8 }} variant='body1'>
            Notifications
          </Typography>
          <IconButton>
            <SettingsRounded />
          </IconButton>
        </div>
        <Divider />
        {[1, 2, 3].map(item => (
          <ListItem className='space-between' key={item} divider>
            <ListItemAvatar>
              <Avatar>
                <PersonRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <div>
                  <Typography>Andy bo Wu</Typography>
                  <Typography>sent a friend request</Typography>
                </div>
              }
              secondary='50 minutes ago'
            />
            <ListItemIcon
              aria-label='show more'
              aria-controls={notificationOptionId}
              aria-haspopup='true'
              onClick={handleNotificationOptionOpen}
              color='inherit'
              style={{
                marginRight: 0,
                paddingRight: 0,
                minWidth: 20,
                '&.MuiListItemIcon-root': {
                  minWidth: 20,
                },
              }}
            >
              <MoreVert />
            </ListItemIcon>
          </ListItem>
        ))}
        <Divider />
        <Typography className='my-2' color='primary'>
          Show more
        </Typography>
      </List>
    </Popover>
  );

  const renderNotificationOption = (
    <Popover
      anchorEl={notificationOptionAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationOptionId}
      // keepMounted
      open={isNotificationOptionOpen}
      onClose={handleNotificationOptionClose}
      style={{ marginLeft: 16, width: '100%' }}
    >
      <List
        style={{ padding: 0, paddingBottom: 0 }}
        component={Card}
        variant='outlined'
      >
        <ListItem button divider>
          <ListItemText secondary='Mark as read' />
        </ListItem>
        <ListItem button divider>
          <ListItemText secondary='Remove This Notification' />
        </ListItem>
        <ListItem button divider>
          <ListItemText
            secondary='Turn off Notifications from 
 this account'
          />
        </ListItem>
      </List>
    </Popover>
  );

  return (
    <AppBar
      position='fixed'
      style={{
        background: theme.palette.background.default,
      }}
      elevation={0}
    >
      <Box className={classes.root}>
        <Container maxWidth='lg'>
          <div className={classes.statusBar}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                overflowX: 'auto',
                minHeight: 36,
              }}
            >
              {status.map(({ title, value }) => (
                <div>
                  <Typography key={title} style={{ marginRight: 16 }} noWrap>
                    {title}: <span className={classes.textTheme}>{value}</span>
                  </Typography>
                </div>
              ))}
            </div>
            <Hidden smDown>
              <div className='center-horizontal'>
                <Button
                  variant='text'
                  color='textPrimary'
                  endIcon={
                    <ChevronRight
                      style={{
                        transform: 'rotateZ(90deg)',
                      }}
                    />
                  }
                >
                  English
                </Button>
                <Button
                  variant='text'
                  color='textPrimary'
                  endIcon={
                    <ChevronRight
                      style={{
                        transform: 'rotateZ(90deg)',
                      }}
                    />
                  }
                >
                  <Avatar
                    style={{
                      height: 24,
                      width: 24,
                      background: '#0F986E',
                      marginRight: 8,
                      color: theme.palette.text.primary,
                    }}
                    variant='square'
                  >
                    $
                  </Avatar>{' '}
                  USD
                </Button>

                <IconButton
                  className='p-o'
                  aria-label='show 4 new mails'
                  color='inherit'
                >
                  <Brightness3 />
                </IconButton>
              </div>
            </Hidden>
          </div>
        </Container>
      </Box>
      <Divider />
      <Box className={classes.root}>
        <Container>
          <Card class={classes.appBar}>
            <Avatar src={logo_light} style={{ marginRight: 8 }}>
              B
            </Avatar>
            <Hidden smDown>
              <Typography variant='h6' noWrap>
                BITNORM
              </Typography>
              <Typography
                style={{ marginLeft: 16, color: '#F59301' }}
                variant='body2'
                noWrap
              >
                NEW
              </Typography>
            </Hidden>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                color='inherit'
                aria-label='account of current user'
                aria-controls={notificationId}
                aria-haspopup='true'
                onClick={handleNotificationsOpen}
              >
                <Notifications />
              </IconButton>
              <IconButton style={{ marginRight: 30 }} color='inherit'>
                <ForumRounded />
              </IconButton>

              <Button
                className='py-0'
                variant='text'
                color='textPrimary'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleMenuOpen}
              >
                <Avatar
                  variant='rounded'
                  style={{
                    backgroundColor: '#fed132',
                    marginRight: 12,
                    // marginLeft: 16,
                    width: 30,
                    height: 30,
                  }}
                >
                  L
                </Avatar>
                <Typography style={{ marginRight: 4 }}>Mahmud Zayn</Typography>
                <IconButton className='p-0 m-0' color='inherit' edge='end'>
                  <ChevronRight
                    style={{
                      transform: 'rotateZ(90deg)',
                    }}
                  />
                </IconButton>
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleMenuOpen}
                color='inherit'
              >
                <MenuRounded />
              </IconButton>
            </div>
          </Card>

          {/*  */}
          <div className={classes.tabBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              variant='scrollable'
              scrollButtons='auto'
            >
              {[
                {
                  label: 'BN Connect',
                },
                {
                  label: 'BN Knowledge Center',
                  menuItems: [
                    { label: 'Crypto-tinder' },
                    { label: 'Forum' },
                    { label: 'Cryptocurrency' },
                    { label: 'Bitcointalk' },
                  ],
                },
                { label: 'Exchange' },
                { label: 'Services' },
                { label: 'Job Board' },
                {
                  label: 'Product',
                  menuItems: [
                    { label: 'Investor page' },
                    { label: 'Crypto API' },
                    { label: 'Widgets and bots' },
                    { label: 'Mobile App' },
                  ],
                },
                {
                  label: 'More',
                  menuItems: [
                    { label: 'Help Center' },
                    { label: 'BN Community' },
                    { label: 'About' },
                    { label: 'BN for business' },
                    { label: 'BN Moderators' },
                  ],
                },
              ].map(({ label, menuItems }) => (
                <BitTab
                  label={label}
                  aria-controls={tabOptionsId}
                  aria-haspopup='true'
                  onClick={event => {
                    menuItems && setTabOptions(menuItems);
                    menuItems && handleTabOptionsOpen(event);
                  }}
                />
              ))}
            </Tabs>
          </div>
        </Container>
      </Box>
      <Divider />
      {renderTabOptions}
      {renderMenu}
      {renderNotifications}
      {renderNotificationOption}
    </AppBar>
  );
}
