import {
  Avatar,
  Box,
  Container,
  Hidden,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core';
import {
  Brightness4Rounded,
  Brightness7Rounded,
  ChevronRight,
} from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../store/actions/themeActions';
import { status } from '../../store/local/dummy';
import Button from '../Button';
import { useStyles } from '../styles.components';

export default function StatusBar() {
  const palette = useSelector(state => state.theme.palette);
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box className={classes.root}>
      <Container maxWidth='lg'>
        <div className={classes.statusBar}>
          <div
            className='scroll-hidden'
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'auto',
              // minHeight: 36,
            }}
          >
            {status.map(({ title, value }) => (
              <div key={`${Math.random() * 1000}`}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  key={title}
                  style={{ marginRight: 16 }}
                  noWrap
                >
                  {title}: <span className={classes.textTheme}>{value}</span>
                </Typography>
              </div>
            ))}
          </div>
          <Hidden smDown>
            <div className='center-horizontal'>
              <Button
                className='py-0 mx-1 my-1'
                textCase
                variant='text'
                color='default'
                endIcon={
                  <ChevronRight
                    style={{
                      transform: 'rotateZ(90deg)',
                    }}
                  />
                }
              >
                English
              </Button>
              <Button
                className='py-0 mx-1 my-1'
                textCase
                variant='text'
                color='default'
                endIcon={
                  <ChevronRight
                    style={{
                      transform: 'rotateZ(90deg)',
                    }}
                  />
                }
              >
                <Avatar
                  style={{
                    height: 20,
                    width: 20,
                    background: '#0F986E',
                    marginRight: 8,
                    color: theme.palette.text.primary,
                  }}
                  variant='rounded'
                >
                  <Typography variant='body2'>$</Typography>
                </Avatar>{' '}
                USD
              </Button>

              <IconButton
                size='small'
                onClick={() => {
                  palette == 'light'
                    ? dispatch(changeTheme('dark'))
                    : dispatch(changeTheme('light'));
                }}
              >
                {palette == 'light' ? (
                  <Brightness4Rounded
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                ) : (
                  <Brightness7Rounded
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
              </IconButton>
            </div>
          </Hidden>
        </div>
      </Container>
    </Box>
  );
}
