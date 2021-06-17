import {
  Avatar,
  Box,
  Card,
  Container,
  Hidden,
  IconButton,
  InputBase,
  Typography,
} from '@material-ui/core';
import {
  ChevronRight,
  ForumRounded,
  MenuRounded,
  Notifications,
  Search,
} from '@material-ui/icons';
import React from 'react';
import logo_light from '../../assets/logo_light.svg';
import Button from '../Button';
import { useStyles } from '../styles.components';

export default function ProfileBar({
  menuId,
  handleMenuOpen,
  notificationId,
  handleNotificationsOpen,
}) {
  const classes = useStyles();

  return (
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
      </Container>
    </Box>
  );
}
