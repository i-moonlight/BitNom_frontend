import { useTheme } from '@material-ui/core';
import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import servicesImg from '../../../assets/landing/img3.png';
import { INVESTOR_CARD_DISPLACEMENT, useStyles } from './Landing';

export default function ServicesSection() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      style={{
        backgroundColor: theme.palette.background.paper,
        paddingTop: INVESTOR_CARD_DISPLACEMENT,
      }}
    >
      <Container maxWidth='lg'>
        <Grid spacing={5} container className='py-5'>
          <Grid item sm={10} md={6} className='py-5 mt-3'>
            <Typography
              className={classes.sectionText}
              variant='h6'
              color='textPrimary'
            >
              The fastest and easiest wayto bring your product to life
            </Typography>
            <Typography
              className={classes.sectionText}
              gutterBottom
              color='textPrimary'
            >
              Ultimately the key to value is need and use. If nobody needs or
              uses your product you have no business, to ensure you make
              profitable investments, Bitnorm aggregates and associates services
              and cryptocurrencies to provide you with a strong indicator of
              their usage and hence their true value. product to life
            </Typography>
            <Typography className={classes.sectionText} color='textPrimary'>
              <a href=''>Visit BN Services &gt;</a>
            </Typography>
          </Grid>
          <Grid item sm={10} md={6}>
            <img style={{ width: '100%' }} src={servicesImg} alt='' />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
