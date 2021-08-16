import { Hidden, useTheme } from '@material-ui/core';
import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import botImg from '../../../assets/landing/bot.svg';
import ghostImg from '../../../assets/landing/ghost.svg';
import infrastructureImg from '../../../assets/landing/infrastructure.svg';
import DarkTheme from '../../../utilities/DarkTheme';
import { useStyles } from './Landing';

export default function InfrastructureSection() {
  const classes = useStyles();
  const theme = useTheme();
  const imageContainer = useRef(null);
  const palette = useSelector(state => state.theme.palette);

  return (
    <Grid
      style={{
        backgroundColor:
          palette == 'dark' ? theme.palette.background.paper : '#F6F9FC',
      }}
    >
      <Container maxWidth='lg' className='py-5'>
        <Grid container spacing={5}>
          <Grid item md={7} className='my-4'>
            <Card
              ref={imageContainer}
              className='d-flex flex-row'
              style={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 16,
              }}
              elevation={4}
            >
              <Hidden xsDown>
                <img
                  style={{
                    maxWidth: '40%',
                    height: imageContainer.current?.clientHeight,
                  }}
                  src={infrastructureImg}
                  alt=''
                />
              </Hidden>
              <div className='p-3'>
                <Typography
                  className='mb-2'
                  variant='h5'
                  gutterBottom
                  color='textPrimary'
                >
                  Highly secure and flexible infrastructure
                </Typography>
                <Typography className={classes.sectionText} color='textPrimary'>
                  We aim to construct seamless integrations between these
                  elements that will allow you, our user, to unceremoniously
                  wear the hats of a learner, seller, investor, and master as
                  you use our platform.
                </Typography>
              </div>
            </Card>
          </Grid>
          <Hidden smDown>
            <Grid item md={5} className='my-5'>
              <div className='m-3'>
                <Divider style={{ width: '30%' }} className='my-4 b-2' />
                <Typography variant='h6' color='textSecondary'>
                  Integrate battle-hardened and time-tested solutions.
                </Typography>
              </div>
            </Grid>
          </Hidden>
        </Grid>

        <Grid container spacing={5}>
          <Grid item md={4} sm={12} className='my-5'>
            <div className='p-3'>
              <Divider style={{ width: '30%' }} className='my-4 b-2' />
              <Typography
                className={classes.sectionText}
                variant='h6'
                color='textSecondary'
              >
                Integrate battle-hardened and time-tested solutions.
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} sm={6}>
            <DarkTheme>
              <div className='my-5 p-3'>
                <Card
                  style={{
                    backgroundColor:
                      palette == 'dark'
                        ? theme.palette.background.default
                        : theme.palette.background.paperAlt,
                    overflow: 'visible',
                    borderRadius: 16,
                  }}
                  elevation={4}
                >
                  <CardContent>
                    <div className='space-between'>
                      <Typography variant='h5' color='textPrimary'>
                        Widgets and bots
                      </Typography>
                      <img
                        style={{
                          height: 100,
                          position: 'relative',
                          top: -50,
                          zIndex: 20,
                        }}
                        src={botImg}
                        alt=''
                      />
                    </div>
                    <Typography
                      className={classes.sectionText}
                      color='textPrimary'
                    >
                      Learn how to create, backtest and start your own crypto
                      trading bots
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </DarkTheme>
          </Grid>
          <Grid item md={4} sm={6}>
            <DarkTheme>
              <div className='my-5 p-3'>
                <Card
                  style={{
                    backgroundColor:
                      palette == 'dark'
                        ? theme.palette.background.default
                        : theme.palette.background.paperAlt,
                    overflow: 'visible',
                    borderRadius: 16,
                  }}
                  elevation={4}
                >
                  <CardContent>
                    <div className='space-between'>
                      <Typography
                        className={classes.sectionText}
                        variant='h5'
                        color='textPrimary'
                      >
                        Job Board
                      </Typography>
                      <img
                        style={{
                          height: 100,
                          position: 'relative',
                          top: -50,
                          zIndex: 20,
                        }}
                        src={ghostImg}
                        alt=''
                      />
                    </div>
                    <Typography
                      className={classes.sectionText}
                      color='textPrimary'
                    >
                      Stay updated and get the latest job listing conveniently.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </DarkTheme>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
