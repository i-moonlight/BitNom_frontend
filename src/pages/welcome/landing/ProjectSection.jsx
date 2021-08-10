import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import card1Img from '../../../assets/landing/card (1).svg';
import card2Img from '../../../assets/landing/card (2).svg';
import card3Img from '../../../assets/landing/card (3).svg';
import joinImg from '../../../assets/landing/img2.png';
import visionImg from '../../../assets/landing/vision.svg';
import Button from '../../../components/Button';
import { useStyles } from './Landing';

export default function ProjectSection() {
  const classes = useStyles();
  return (
    <Grid style={{ backgroundColor: '#18191a' }}>
      <Container container component={Grid} maxWidth='lg' className='py-5'>
        <Grid item lg={6} className='my-5'>
          <div className='m-3'>
            <Typography variant='h5' color='textPrimary'>
              Our Project &amp; Ecosystem
            </Typography>
            <Typography
              className={classes.sectionText}
              gutterBottom
              color='textPrimary'
            >
              BitNorm combines the four elements necessary to empower users
              venturing into cryptocurrencies and budding cryptocurrency-related
              projects and businesses: Blockchain technology, BNConnect,
              BNMarket, and BitNorm›s knowledge center.
            </Typography>
            <Typography className={classes.sectionText} color='textPrimary'>
              It is our goal to deliver on this promise. We aim to construct
              seamless integrations between these elements that will allow you,
              our user, to unceremoniously wear the hats of a learner, seller,
              investor, and master as you use our platform.
            </Typography>
          </div>
        </Grid>
        <Grid item lg={6} className='my-5 px-4 pt-3'>
          <div className='m-3'>
            <Grid container spacing={5}>
              <Grid item lg={3}>
                <Card className={classes.cardImg}>
                  <CardContent>
                    <img style={{ width: '100%' }} src={card1Img} alt='' />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3}>
                <Card className={classes.cardImg}>
                  <CardContent>
                    <img style={{ width: '100%' }} src={card2Img} alt='' />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3}>
                <Card className={classes.cardImg}>
                  <CardContent>
                    <img style={{ width: '100%' }} src={card3Img} alt='' />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3}></Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item lg={6} className='text-center my-5'>
          <div className='m-3'>
            <img style={{ width: '100%' }} src={joinImg} alt='' />
            <Button size='large' textCase>
              Join BN Community
            </Button>
          </div>
        </Grid>
        <Grid item lg={6} className='my-5'>
          <div className='m-3 pt-3'>
            <Typography gutterBottom variant='h5' color='textPrimary'>
              Share your vision instantly
            </Typography>
            <img
              style={{ width: '80%' }}
              src={visionImg}
              alt=''
              className='my-2'
            />
            <Typography
              className={classes.sectionText + 'mt-2'}
              gutterBottom
              color='textPrimary'
              // className='mt-2'
            >
              BN Social is a BitNorm›s social media tool that allows users from
              all over the world to connect and share ideas about
              cryptocurrencies. BNConnect allows users to build and manage
              profiles with an emphasis on their activity and interests in
              cryptocurrencies.
            </Typography>
            <Typography className={classes.sectionText} color='textPrimary'>
              <a href=''>Read more about this feature &gt;</a>
            </Typography>
          </div>
        </Grid>
      </Container>
    </Grid>
  );
}
