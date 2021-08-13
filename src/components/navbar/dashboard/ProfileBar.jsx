import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Hidden,
  IconButton,
  InputBase,
  Paper,
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
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo_light from '../../../assets/logo_light.svg';
import Button from '../../Button';
import { useStyles } from '../../styles.components';

export default function ProfileBar({
  menuId,
  handleMenuOpen,
  notificationId,
  handleNotificationsOpen,
}) {
  const state = useSelector(state => state);
  const user = state.auth.user;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Container>
        <Card elevation={0} className={classes.appBar}>
          <div
            className='center-horizontal c-pointer'
            onClick={() => history.push('/')}
          >
            <Avatar className='c-pointer me-2' src={logo_light}>
              B
            </Avatar>
            <Hidden smDown>
              <Typography className='c-pointer' variant='h6' noWrap>
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
          </div>

          <Paper elevation={0} component='form' className={classes.paperSearch}>
            {/* <IconButton className={classes.iconButton} aria-label="menu">
              <Menu />
            </IconButton> */}
            <Button
              textCase
              // className="py-0"
              variant='text'
              // aria-label="account of current user"
              // aria-controls={menuId}
              // aria-haspopup="true"
              // onClick={handleMenuOpen}
            >
              <Typography variant='body2' color='textSecondary'>
                General
              </Typography>
              <ChevronRight
                style={{
                  transform: 'rotateZ(90deg)',
                }}
              />
            </Button>
            <Divider className={classes.divider} orientation='vertical' />
            <InputBase
              className={classes.input}
              placeholder='Search Bitnorm'
              inputProps={{ 'aria-label': 'search bitnorm' }}
            />
            <IconButton
              type='submit'
              className={classes.iconButton}
              aria-label='search'
            >
              <Search />
            </IconButton>
            {/* <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              <Directions />
            </IconButton> */}
          </Paper>

          {/* <div className={classes.grow} /> */}
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
            <IconButton color='inherit'>
              <ForumRounded />
            </IconButton>

            <Button
              textCase
              className='py-0'
              variant='text'
              color='default'
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
                  width: 30,
                  height: 30,
                }}
              >
                L
              </Avatar>
              <Typography variant='body2' style={{ marginRight: 4 }}>
                {user?.displayName}
              </Typography>
              <ChevronRight
                style={{
                  transform: 'rotateZ(90deg)',
                }}
              />
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
