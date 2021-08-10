import {
  AppBar,
  Avatar,
  Container,
  Divider,
  Hidden,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  ArrowRightAltRounded,
  ChevronRight,
  Navigation,
} from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo_light from '../../assets/logo_light.svg';
import useColors from '../../hooks/useColors';
import Button from '../Button';
import StatusBar from './StatusBar';

export default function NavBarLanding() {
  const theme = useTheme();
  const colors = useColors();
  const history = useHistory();

  return (
    <AppBar
      position='fixed'
      style={{
        background: theme.palette.background.default,
      }}
      elevation={0}
    >
      <StatusBar />
      <Divider />
      <Container>
        <div className='space-between my-3'>
          <div className='center-horizontal'>
            <Avatar src={logo_light} style={{ marginRight: 8 }}>
              B
            </Avatar>
            <Hidden smDown>
              <Typography variant='h6' noWrap>
                BITNORM
              </Typography>
              {/* <Typography
                style={{ marginLeft: 16, color: '#F59301' }}
                variant='body2'
                noWrap
              >
                NEW
              </Typography> */}
            </Hidden>
          </div>
          <div className='center-horizontal'>
            <Button
              color={colors.buttonAlt}
              variant='text'
              textCase
              endIcon={<ChevronRight style={{ transform: 'rotate(90deg)' }} />}
            >
              Home
            </Button>
            <Button
              color={colors.buttonAlt}
              variant='text'
              textCase
              endIcon={<ChevronRight style={{ transform: 'rotate(90deg)' }} />}
            >
              Ecosystem
            </Button>
            <Button
              color={colors.buttonAlt}
              variant='text'
              textCase
              endIcon={<ChevronRight style={{ transform: 'rotate(90deg)' }} />}
            >
              Product
            </Button>
            <Button color={colors.buttonAlt} variant='text' textCase>
              BN for Business
            </Button>
            <Button color={colors.buttonAlt} variant='text' textCase>
              Learn
            </Button>
          </div>
          <div className='center-horizontal'>
            <Button
              className='mx-2'
              color={colors.buttonAlt}
              variant='text'
              textCase
              onClick={() => {
                history.push('/auth/login');
              }}
            >
              Sign In
            </Button>
            <Button
              textCase
              endIcon={<ArrowRightAltRounded />}
              onClick={() => {
                history.push('/auth/signup');
              }}
            >
              Explore BN
            </Button>
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
