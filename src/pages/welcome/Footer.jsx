import { Container, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import googlePlayImg from '../../assets/google_play.svg';
import logoImg from '../../assets/logo_light.svg';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

export default function Footer() {
  return (
    <>
      <Grid style={{ backgroundColor: '#18191a' }}>
        <Container container component={Grid} maxWidth='lg'>
          <Grid className='center-horizontal my-3' item lg={6}>
            <Typography variant='h6' color='textSecondary'>
              Get BitNorm Updates to your Inbox
            </Typography>
          </Grid>
          <Grid item lg={6} className='my-3'>
            <div className='center-horizontal'>
              <TextField
                style={{ flex: 1 }}
                fullWidth={false}
                placeholder='Enter Your Email'
              />
              <Button className='mx-2' textCase>
                Join Mailing List
              </Button>
            </div>
          </Grid>
          <Grid item lg={12} className='mb-3'>
            <Divider />
          </Grid>
          {[1, 2, 3, 4].map(footer => (
            <Grid key={footer} item lg={3} className='my-3'>
              <Typography gutterBottom variant='body2' color='textSecondary'>
                COMPANY
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                Home
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                About Us
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                Whitepaper
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                Brand Guidelines
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                RoadMap
              </Typography>
              <Typography gutterBottom color='textPrimary'>
                Blogs
              </Typography>
            </Grid>
          ))}

          <Grid item lg={12} className='my-3'>
            <Divider />
          </Grid>
          <Grid item lg={6} className='my-2'>
            <div className='center-horizontal'>
              <img style={{ width: 50 }} src={logoImg} alt='' />
              <Typography className='mx-2' variant='h5' color='textPrimary'>
                BITNORM
              </Typography>
            </div>
          </Grid>
          <Grid item lg={6} className='my-2'>
            <img style={{ height: 50 }} src={googlePlayImg} alt='' />
          </Grid>
        </Container>
      </Grid>

      <Grid style={{ backgroundColor: '#141617' }}>
        <Container container component={Grid} maxWidth='lg' className='py-3'>
          <Grid item lg={6}>
            <Typography variant='body2' color='textPrimary'>
              Copyright &copy; {new Date().getFullYear()} {window.location.host}{' '}
              All rights reserved
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant='body2' color='textPrimary'>
              <Link to='/terms'> Terms And Conditions </Link>.
              <Link to='/privacy_policy'> Privacy Policy </Link>.
              <Link to='/cookie_policy'> Cookie Policy </Link>.
              <Link to='/disclaimer'> Disclaimer</Link>
            </Typography>
          </Grid>
        </Container>
      </Grid>
    </>
  );
}
