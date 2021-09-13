import { AppBar, Container, useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo_full from '../../../assets/logo_full.svg';
import logo_light_full from '../../../assets/logo_light_full.svg';

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
            <div>
              <img
                style={{
                  height: 40,
                }}
                src={
                  theme.palette.type == 'light' ? logo_full : logo_light_full
                }
                alt=''
              />
            </div>
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
