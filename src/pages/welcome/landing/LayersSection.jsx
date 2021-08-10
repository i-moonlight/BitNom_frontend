import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import media2Img from '../../../assets/landing/img7.png';
import media1Img from '../../../assets/landing/img8.png';
import media3Img from '../../../assets/landing/img9.png';
import { INVESTOR_CARD_DISPLACEMENT, useStyles } from './Landing';

export default function LayersSection() {
  const classes = useStyles();
  return (
    <Grid
      style={{
        backgroundColor: '#242526',
        paddingBottom: INVESTOR_CARD_DISPLACEMENT,
      }}
    >
      <Container maxWidth='lg'>
        <Grid spacing={5} container className='py-5'>
          <Grid item lg={12}>
            <Typography variant='h6' color='textPrimary'>
              BitNorm Platform Layers
            </Typography>
            <Grid container>
              <Grid item lg={8}>
                <Typography className={classes.sectionText} color='textPrimary'>
                  By leveraging BitNorm, you will have click away access to
                  guides, tools, goods, and services all of which feed into your
                  understanding of the cryptocurrencies ecosystem and friends,
                  mentors, and consultants to hold your hand when you need it.
                  What more could you ask for?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {[media1Img, media2Img, media3Img].map(card => (
            <Grid key={`${card}`} item lg={3}>
              <Card>
                <CardMedia style={{ height: 140 }} image={card} />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    BN Social Center
                  </Typography>
                  <Typography
                    className={classes.sectionText}
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    BN connect is a platform that allows our users from all over
                    the world to connect and share ideas about cryptocurrencies.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item lg={3}></Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
