import { Divider, MenuItem, Popover, Typography } from '@material-ui/core';
import {
  AccountBalanceWalletOutlined,
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
}
