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

export default function NavBarAuth() {
  const history = useHistory();

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
            <Avatar src={logo_light} style={{ marginRight: 8 }}>
              B
            </Avatar>
            <Hidden smDown>
              <Typography variant='h6' noWrap>
                BITNORM
              </Typography>
            </Hidden>
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
