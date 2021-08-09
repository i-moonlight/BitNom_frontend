import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import botImg from '../../assets/landing/bot.svg';
import ghostImg from '../../assets/landing/ghost.svg';
import infrastructureImg from '../../assets/landing/infrastructure.svg';
import useColors from '../../hooks/useColors';
import { useStyles } from './Landing';

export default function InfrastructureSection() {
  const classes = useStyles();
  const colors = useColors();
  return (
    <Grid style={{ backgroundColor: '#242526' }}>
      <Container container component={Grid} maxWidth='lg' className='py-5'>
        <Grid item lg={7} className='my-5'>
          <Card
            className='d-flex flex-row'
            style={{
              backgroundColor: colors.cardAlt,
            }}
          >
            <img
              style={{
                height: 160,
              }}
              src={infrastructureImg}
              alt=''
            />
            <div className='p-3'>
              <Typography variant='h5' gutterBottom color='textPrimary'>
                Highly secure and flexible infrastructure
              </Typography>
              <Typography className={classes.sectionText} color='textPrimary'>
                We aim to construct seamless integrations between these elements
                that will allow you, our user, to unceremoniously wear the hats
                of a learner, seller, investor, and master as you use our
                platform.
              </Typography>
            </div>
          </Card>
        </Grid>
        <Grid item lg={5} className='my-5'>
          <div className='m-3'>
            <Divider style={{ width: '30%' }} className='my-4 b-2' />
            <Typography variant='h6' color='textSecondary'>
              Integrate battle-hardened and time-tested solutions.
            </Typography>
          </div>
        </Grid>
        <Grid item lg={4} className='my-5'>
          <div className='m-3'>
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
        <Grid item lg={4} className='my-5 p-3'>
          <Card
            style={{
              backgroundColor: colors.cardAlt,
              overflow: 'visible',
            }}
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
              <Typography className={classes.sectionText} color='textPrimary'>
                Learn how to create, backtest and start your own crypto trading
                bots
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} className='my-5 p-3'>
          <Card
            style={{
              backgroundColor: colors.cardAlt,
              overflow: 'visible',
            }}
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
              <Typography className={classes.sectionText} color='textPrimary'>
                Stay updated and get the latest job listing conveniently.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Grid>
  );
}
