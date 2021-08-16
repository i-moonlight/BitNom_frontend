import {
  AppBar,
  Avatar,
  Container,
  Hidden,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo_light from '../../../assets/logo_light.svg';
import logo from '../../../assets/logo.svg';
import { useTheme } from '@material-ui/core';

export default function NavBarAuth() {
  const history = useHistory();
  const theme = useTheme();

  return (
    <AppBar
      className='mt-4'
      style={{
        background: 'transparent',
      }}
      elevation={0}
    >
      <Container>
        <div className='space-between my-3'>
          <div
            className='center-horizontal c-pointer'
            onClick={() => history.push('/')}
          >
            <Avatar
              src={theme.palette.type == 'light' ? logo : logo_light}
              style={{ marginRight: 8 }}
            >
              B
            </Avatar>
            <Hidden smDown>
              <Typography
                color={
                  theme.palette.type == 'light' ? 'primary' : 'textPrimary'
                }
                variant='h6'
                noWrap
              >
                BITNORM
              </Typography>
            </Hidden>
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
