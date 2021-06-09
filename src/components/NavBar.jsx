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
  Menu,
  MenuItem,
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
  ExitToAppRounded,
  ForumRounded,
  MenuRounded,
  Notifications,
  PeopleRounded,
  Search,
} from '@material-ui/icons';
import React from 'react';
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
  },
}))(props => <Tab disableRipple {...props} />);

export default function NavBar() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'desktop-menu';
  const mobileMenuId = 'mobile-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Watchlist</MenuItem>
      <MenuItem onClick={handleMenuClose}>Account and Billing</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <div className='center-horizontal'>
          <Typography>Referred Friends</Typography>
          <div className='px-2 center-horizontal'>
            <Typography className='px-1'>0</Typography>
            <PeopleRounded />
          </div>
        </div>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <div className='w-100 center-horizontal space-between'>
          <Typography>BN Token</Typography>
          <div className='px-2 center-horizontal'>
            <Typography className='px-1'>0</Typography>
            <AccountBalanceWalletOutlined />
          </div>
        </div>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => dispatch(signout())}>
        <div className='w-100 center-horizontal space-between'>
          <Typography color='secondary'>Sign Out</Typography>
          <div className='px-2 center-horizontal'>
            <ExitToAppRounded color='secondary' />
          </div>
        </div>
      </MenuItem>
    </Menu>
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
              <IconButton color='inherit'>
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
                onClick={handleProfileMenuOpen}
                style={
                  {
                    // display: 'flex',
                    // alignItems: 'center',
                    // '&:hover': {
                    //   background: theme.palette.background.paper,
                    // },
                  }
                }
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
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
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
              <BitTab label='BN Connect' />
              <BitTab label='BN Knowledge Center' />
              <BitTab label='Exchange' />
              <BitTab label='Services' />
              <BitTab label='Job Board' />
              <BitTab label='Product' />
              <BitTab label='More' />
            </Tabs>
          </div>
        </Container>
      </Box>
      <Divider />
      {/* {renderMobileMenu} */}
      {renderMenu}
    </AppBar>
  );
}
