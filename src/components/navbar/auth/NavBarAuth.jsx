import {
  AppBar,
  Avatar,
  Container,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import logo_light from '../../../assets/logo_light.svg';

export default function NavBarAuth() {
  const history = useHistory();
  const theme = useTheme();

  return (
    <AppBar
      className='pt-2'
      style={{
        background: theme.palette.background.default,
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

            <Typography
              color={theme.palette.type == 'light' ? 'primary' : 'textPrimary'}
              variant='h6'
              noWrap
            >
              BITNORM
            </Typography>
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
