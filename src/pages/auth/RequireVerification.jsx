import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MUTATION_SEND_EMAIL_VERIFICATION } from './utilities/queries';

export default function RequireVerification() {
  const state = useSelector(state => state);
  const theme = useTheme();
  const history = useHistory();
  const user = state.auth.user;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sendEmailVerification] = useMutation(MUTATION_SEND_EMAIL_VERIFICATION);

  useEffect(() => {
    JSON.stringify(user) === '{}' && history.push('/auth/login');
    user?.email?.verified && history.push('/');
  }, [state]);

  return (
    <div className='center-horizontal center-vertical'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={11} sm={7} md={6} lg={4}>
          <div className='text-center my-3 px-sm-5'>
            <Typography color='textPrimary' variant='h5'>
              Hi! WELCOME TO BITNORM
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Please check your inbox and verify your email address to continue.
            </Typography>
          </div>
          <Card elevation={0}>
            <CardContent>
              <div className='text-center my-3 mx-2'>
                <div className='text-center my-3 px-sm-0'>
                  <Typography variant='body1'>
                    <span style={{ marginTop: 10 }}></span>
                    {sent
                      ? `Verification code has been resent to ${user?.email?.address}`
                      : 'Didnt receive a verification code? '}
                    {!sent && (
                      <span
                        onClick={() => {
                          setLoading(true);

                          sendEmailVerification({
                            errorPolicy: 'all',
                          }).then(({ data, errors }) => {
                            setLoading(false);

                            data?.Users?.createEmailVerificationCode &&
                              setSent(true);

                            errors && setSent(false);
                          });
                        }}
                        style={{
                          color: theme.palette.primary.main,
                          cursor: 'pointer',
                        }}
                      >
                        {loading ? 'Sending ... ' : 'Resend Code'}
                      </span>
                    )}
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
