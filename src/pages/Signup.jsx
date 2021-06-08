import React, { useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import TextField from '../components/TextField';
import Button from '../components/Button';
import DividerText from '../components/DividerText';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Signup() {
  const state = useSelector(state => state);
  const history = useHistory();
  const user = state.auth.user;

  useEffect(() => {
    JSON.stringify(user) !== '{}' && history.push('/');
  });

  return (
    <div className='center-horizontal center-vertical'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'
        style={{ minHeight: '100vh', paddingTop: 50, paddingBottom: 50 }}
      >
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <div className='text-center my-3 px-sm-5'>
            <Typography color='textPrimary' variant='h5'>
              GET STARTED NOW
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Its free to join and gain full access to thousand opportunities
            </Typography>
          </div>
          <Card elevated={false}>
            <CardContent>
              <div className='text-center my-3 mx-2'>
                <TextField
                  label='Username'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  label='Email Adress'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  label='Password'
                  variant='outlined'
                  size='small'
                  type='password'
                  fullWidth
                />
                <TextField
                  label='Confirm Password'
                  variant='outlined'
                  size='small'
                  type='password'
                  fullWidth
                />
                <div className='text-center my-3 px-sm-0'>
                  <Typography color='textPrimary' variant='body1'>
                    By clicking Agree &amp; Join, you agree to the BitNorm
                    <Link color='primary'>User Agreement</Link>,{' '}
                    <Link color='primary'>Privacy Policy</Link>, and
                    <Link color='primary'>Cookie Policy</Link>.
                  </Typography>
                </div>
                <Button fullWidth>Join BitNorm</Button>
                <DividerText>or</DividerText>
                <Button google fullWidth>
                  Continue With Google
                </Button>

                <div className='text-center'>
                  <Typography variant='body1'>
                    <div style={{ marginTop: 10 }}></div>
                    Already on Bitnorm?{' '}
                    <Link color='primary' to='/auth/login'>
                      Sign In
                    </Link>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
