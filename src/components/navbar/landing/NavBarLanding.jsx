import {
  AppBar,
  Avatar,
  Container,
  Divider,
  Hidden,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  ArrowRightAltRounded,
  ChevronRight,
  MenuRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo_light from '../../../assets/logo_light.svg';
import Button from '../../Button';
import { menuEcosystem, menuProduct } from '../../data.components';
import NavBarMenu from './MenuOptions';
import LandingMenuMobile from './LandingMenuMobile';
import StatusBar from '../StatusBar';

export default function NavBarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuEcosystem, setShowMenuEcosystem] = useState(false);
  const [showMenuProduct, setShowMenuProduct] = useState(false);
  const theme = useTheme();
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
          <div
            className='center-horizontal c-pointer'
            onClick={() => history.push('/')}
          >
            <Avatar src={logo_light} style={{ marginRight: 8 }}>
              B
            </Avatar>
            <Hidden xsDown>
              <Typography variant='h6' noWrap>
                BITNORM
              </Typography>
            </Hidden>
          </div>
          <Hidden smDown>
            <div className='center-horizontal'>
              <Button
                className='mx-2'
                color={theme.palette.text.primary}
                variant='text'
                textCase
              >
                Home
              </Button>
              <Button
                className='mx-2'
                color={theme.palette.text.primary}
                variant='text'
                textCase
                endIcon={
                  <ChevronRight style={{ transform: 'rotate(90deg)' }} />
                }
                onMouseEnter={() => setShowMenuEcosystem(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowMenuEcosystem(false);
                  }, 500)
                }
              >
                Ecosystem
                <NavBarMenu show={showMenuEcosystem} items={menuEcosystem} />
              </Button>
              <Button
                className='mx-2'
                color={theme.palette.text.primary}
                variant='text'
                textCase
                endIcon={
                  <ChevronRight style={{ transform: 'rotate(90deg)' }} />
                }
                onMouseEnter={() => setShowMenuProduct(true)}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setShowMenuProduct(false);
                  }, 300)
                }
              >
                Product
                <NavBarMenu show={showMenuProduct} items={menuProduct} />
              </Button>
              <Button
                className='mx-2'
                color={theme.palette.text.primary}
                variant='text'
                textCase
              >
                BN for Business
              </Button>
              <Button
                className='mx-2'
                color={theme.palette.text.primary}
                variant='text'
                textCase
              >
                Learn
              </Button>
            </div>
          </Hidden>
          <div className='center-horizontal'>
            <Button
              className='mx-2'
              color={theme.palette.text.primary}
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
              endIcon={
                <Hidden xsDown>
                  <ArrowRightAltRounded />
                </Hidden>
              }
              onClick={() => {
                history.push('/auth/signup');
              }}
            >
              Explore
              <Hidden xsDown> BN</Hidden>
            </Button>
            <Hidden mdUp>
              <IconButton
                className='mx-1'
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MenuRounded />
              </IconButton>
            </Hidden>
            <LandingMenuMobile
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
            />
          </div>
        </div>
      </Container>
    </AppBar>
  );
}
