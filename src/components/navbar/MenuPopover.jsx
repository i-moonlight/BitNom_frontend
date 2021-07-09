import {
  Avatar,
  Divider,
  Hidden,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  AccountBalanceWalletOutlined,
  Brightness3,
  ChevronRight,
  ExitToAppRounded,
  PeopleRounded,
} from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../store/actions/authActions';

export default function MenuPopover({
  menuId,
  menuAnchorEl,
  isMenuOpen,
  handleMenuClose,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
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

      <Hidden mdUp>
        <MenuItem className='py-3' onClick={() => null}>
          <div className='w-100 center-horizontal space-between'>
            <Typography>English</Typography>
            <div className='px-2 center-horizontal'>
              <ChevronRight
                style={{
                  transform: 'rotateZ(90deg)',
                }}
              />
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem className='py-3' onClick={() => null}>
          <div className='w-100 center-horizontal space-between'>
            <div className='center-horizontal'>
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
              </Avatar>
              <Typography>USD</Typography>
            </div>
            <div className='px-2 center-horizontal'>
              <ChevronRight
                style={{
                  transform: 'rotateZ(90deg)',
                }}
              />
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem className='py-3' onClick={() => null}>
          <div className='w-100 center-horizontal space-between'>
            <Typography>Theme</Typography>
          </div>
          <div className='px-2 center-horizontal'>
            <Brightness3 />
          </div>
        </MenuItem>
        <Divider />
      </Hidden>

      <MenuItem className='py-3' onClick={handleMenuClose}>
        <div className='w-100 center-horizontal space-between'>
          <Typography>Referred Friends</Typography>
          <div className='px-2 center-horizontal '>
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
}
