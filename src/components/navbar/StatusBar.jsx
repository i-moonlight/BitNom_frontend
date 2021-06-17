import {
  Avatar,
  Box,
  Container,
  Hidden,
  IconButton,
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
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'auto',
              minHeight: 36,
            }}
          >
            {status.map(({ title, value }) => (
              <div>
                <Typography key={title} style={{ marginRight: 16 }} noWrap>
                  {title}: <span className={classes.textTheme}>{value}</span>
                </Typography>
              </div>
            ))}
          </div>
          <Hidden smDown>
            <div className='center-horizontal'>
              <Button
                variant='text'
                color='textPrimary'
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
                variant='text'
                color='textPrimary'
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
                    height: 24,
                    width: 24,
                    background: '#0F986E',
                    marginRight: 8,
                    color: theme.palette.text.primary,
                  }}
                  variant='square'
                >
                  $
                </Avatar>{' '}
                USD
              </Button>

              <IconButton
                className='p-o'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <Brightness3 />
              </IconButton>
            </div>
          </Hidden>
        </div>
      </Container>
    </Box>
  );
}
