import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import DividerText from '../../components/DividerText';
import TextField from '../../components/TextField';
import { login } from '../../store/actions/authActions';

export default function Login() {
  const state = useSelector(state => state);
  const history = useHistory();
  const dispatch = useDispatch();
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
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <div className='text-center my-3 px-sm-5'>
            <Typography color='textPrimary' variant='h5'>
              Hi! WELCOME BACK
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Stay updated and get full access to a thousand opportunities
              across the globe.
            </Typography>
          </div>
          <Card elevated={false}>
            <CardContent>
              <div className='text-center my-3 mx-2'>
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
                  fullWidth
                />
                <div>
                  <Typography className='end-horizontal mb-2'>
                    <Link color='primary' to='/auth/request_reset_link'>
                      Forgot Password?
                    </Link>
                  </Typography>
                </div>
                <Button
                  fullWidth
                  onClick={() => {
                    dispatch(login('', ''));
                  }}
                >
                  Sign In
                </Button>
                <DividerText>or</DividerText>
                <Button google fullWidth>
                  Continue With Google
                </Button>

                <div className='text-center my-3 px-sm-0'>
                  <Typography variant='body1'>
                    <div style={{ marginTop: 10 }}></div>
                    New to Bitnorm?{' '}
                    <Link color='primary' to='/auth/signup'>
                      Join now
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
