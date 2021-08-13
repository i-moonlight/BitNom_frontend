import { useMutation } from '@apollo/client';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import DividerText from '../../components/DividerText';
import Form from '../../components/Form';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import TextField from '../../components/TextField';
import { login } from '../../store/actions/authActions';
import { loginUserInitialValues } from './utilities/initial_values';
import {
  MUTATION_GOOGLE_LOGIN,
  MUTATION_LOGIN_USER,
} from './utilities/queries';
import { loginUserValidationSchema } from './utilities/validation_schemas';

export default function Login() {
  const [loginErr, setLoginErr] = useState(null);
  const [googleErr, setGoogleErr] = useState(null);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = state.auth.user;
  // const errors = state.auth.err;

  const [loginUser, { loading: loginLoading }] =
    useMutation(MUTATION_LOGIN_USER);
  const [googleLogin, { loading: googleLoading }] = useMutation(
    MUTATION_GOOGLE_LOGIN
  );

  useEffect(() => {
    JSON.stringify(user) !== '{}' && history.push('/');
  });

  const responseGoogle = response => {
    console.log('googleresponse: ', response);

    googleLogin({
      variables: {
        token: response.tokenId,
      },
      errorPolicy: 'all',
    }).then(({ data, errors }) => {
      let userData = data?.Users?.googleLogin ? data?.Users?.googleLogin : {};
      let userErrors = errors ? errors : null;
      setGoogleErr(userErrors);
      dispatch(login(userData, null));
    });
  };

  const failureGoogle = response => {
    console.log('googleErr: ', response);
  };

  return (
    <>
      <NavBarAuth />
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
                Hi! WELCOME BACK
              </Typography>
              <Typography color='textPrimary' variant='body1'>
                Stay updated and get full access to a thousand opportunities
                across the globe.
              </Typography>
            </div>
            <Card elevation={0}>
              <CardContent>
                <Form
                  initialValues={loginUserInitialValues}
                  validationSchema={loginUserValidationSchema}
                  onSubmit={({ username, password }) => {
                    loginUser({
                      variables: {
                        username,
                        password,
                      },
                      errorPolicy: 'all',
                    }).then(({ data, errors }) => {
                      let userData = data?.Users?.login
                        ? data?.Users?.login
                        : {};

                      errors &&
                        errors.map(err => {
                          err?.state[''] && setLoginErr(err?.state['']);
                        });

                      dispatch(login(userData, null));
                    });

                    // For debugging
                    // const mockuserData = {
                    //   _id: 'mark',
                    //   email: {
                    //     address: 'mbenjerminne@gmail.com',
                    //     verified: true,
                    //   },
                    //   displayName: 'Mark Aloo',
                    // };

                    // dispatch(login(mockuserData, null));
                    //end debugging
                  }}
                >
                  <div className='text-center my-3 mx-2'>
                    <TextField
                      error={loginErr && true}
                      errorText={loginErr && loginErr[0]}
                      name='username'
                      label='Email or Username'
                      variant='outlined'
                      fullWidth
                    />
                    <TextField
                      error={loginErr && true}
                      errorText={loginErr && loginErr[0]}
                      name='password'
                      label='Password'
                      variant='outlined'
                      type='password'
                      fullWidth
                    />
                    <div>
                      <Typography className='end-horizontal mb-2'>
                        <Link color='primary' to='/auth/request_reset_link'>
                          Forgot Password?
                        </Link>
                      </Typography>
                    </div>
                    <Button fullWidth submit disabled={loginLoading}>
                      Sign In
                    </Button>
                    <DividerText>or</DividerText>

                    {googleErr &&
                      googleErr.map(err => (
                        <Alert
                          className='mb-2'
                          key={Math.random() * 100}
                          severity='error'
                        >
                          {err?.state?.email && err?.state?.email[0]}
                          {err?.state?._id && err?.state?._id[0]}
                          {err?.state[''] && err?.state['']}
                        </Alert>
                      ))}

                    <GoogleLogin
                      clientId='705645298803-6e7phqmcmacbedmortua8t3obsqfif37.apps.googleusercontent.com'
                      buttonText='Login Google'
                      onSuccess={responseGoogle}
                      onFailure={failureGoogle}
                      render={renderProps => (
                        <Button
                          onClick={renderProps.onClick}
                          textCase
                          google
                          fullWidth
                          disabled={googleLoading}
                        >
                          Continue With Google
                        </Button>
                      )}
                      cookiePolicy={'single_host_origin'}
                    />

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
                </Form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
