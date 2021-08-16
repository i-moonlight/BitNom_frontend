import { useMutation } from '@apollo/client';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { parse } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import { login } from '../../store/actions/authActions';
import { MUTATION_VERIFY_EMAIL } from './utilities/queries';

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const [verifyErr, setVerifyErr] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const state = useSelector(state => state);
  const user = state.auth.user;

  const [verifyEmail] = useMutation(MUTATION_VERIFY_EMAIL);

  useEffect(() => {
    console.log(user?.email?.verified);
    user?.email?.verified && history.push('/auth/update_info_register');

    verifyEmail({
      variables: {
        verificationCode: parse(location.search)['?evc'],
      },
      errorPolicy: 'all',
    }).then(({ data, errors }) => {
      setVerifying(false);
      let userErrors = errors ? errors : null;
      setVerifyErr(userErrors);
      console.log(data);

      setTimeout(() => {
        dispatch(login({}, null));
        history.push('/auth/login');
      }, 2000);
    });
  }, [state]);

  return (
    <>
      <NavBarAuth />
      <div className='center-horizontal center-vertical py-5'>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={11} sm={7} md={6} lg={4}>
            {/* <div className='text-center my-3 px-sm-5'>
            <Typography color='textPrimary' variant='h5'>
              Hi! WELCOME TO BITNORM
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Please check your inbox and verify your email address to continue.
            </Typography>
          </div> */}
            <Card elevation={4}>
              <CardContent>
                <div className='text-center my-3 mx-2'>
                  <div className='text-center my-3 px-sm-0'>
                    <Typography variant='body1'>
                      <span style={{ marginTop: 10 }}></span>
                      {verifying
                        ? `Verifying email ...`
                        : `Verification ${
                            verifyErr && verifyErr[0]?.state?.verificationCode
                              ? 'failed!'
                              : 'finished. Redirecting ...'
                          } `}
                    </Typography>
                    {verifyErr &&
                      verifyErr.map(err => (
                        <Alert
                          className='mb-2 mt-2'
                          key={Math.random() * 100}
                          severity='error'
                        >
                          {err?.state?.verificationCode &&
                            err?.state?.verificationCode[0]}
                        </Alert>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
