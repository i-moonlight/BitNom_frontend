import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import TextField from '../../components/TextField';

export default function CreatePassword() {
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
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <div className='text-center my-3 px-sm-5'>
            <Typography color='textPrimary' variant='h5'>
              CREATE NEW PASSWORD
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Create a new memorable password.
            </Typography>
          </div>
          <Card elevated={false}>
            <CardContent>
              <div className='text-center my-3 mx-2'>
                <TextField
                  label='New Password'
                  variant='outlined'
                  size='small'
                  fullWidth
                />
                <TextField
                  label='Confirm New Password'
                  variant='outlined'
                  size='small'
                  fullWidth
                />

                <Button fullWidth>Create Password</Button>
                <div>
                  <Typography className='center-vertical mt-4'>
                    <Link color='primary' to='/auth/login'>
                      Back to login
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
