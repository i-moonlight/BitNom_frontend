import {
  Avatar,
  Box,
  Container,
  Hidden,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Brightness3, ChevronRight } from '@material-ui/icons';
import React from 'react';
import { status } from '../../store/local/dummy';
import Button from '../Button';
import { useStyles } from '../styles.components';

export default function StatusBar() {
  const classes = useStyles();
  const theme = useTheme();

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
              <Button
                textCase
                variant='text'
                color='default'
                // endIcon={
                //   <ChevronRight
                //     style={{
                //       transform: 'rotateZ(90deg)',
                //     }}
                //   />
                // }
              >
                <Brightness3 />
              </Button>
            </div>
          </Hidden>
        </div>
      </Container>
    </Box>
  );
}
