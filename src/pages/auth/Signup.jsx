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
import TextField from '../../components/TextField';
import { login, register } from '../../store/actions/authActions';
import { createUserInitialValues } from './utilities/initial_values';
import {
  MUTATION_CREATE_USER,
  MUTATION_GOOGLE_SIGNUP,
} from './utilities/queries';
import { createUserValidationSchema } from './utilities/validation_schemas';

export default function Signup() {
  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [googleErr, setGoogleErr] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(state => state);
  const user = state.auth.user;
  const errors = state.auth.err;
  const justRegistered = state.auth.justRegistered;

  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [googleSignup] = useMutation(MUTATION_GOOGLE_SIGNUP);

  useEffect(() => {
    JSON.stringify(user) !== '{}' && history.push('/');
    // justRegistered && history.push('/auth/login');

    errors &&
      errors.map(err => {
        err?.state?.email ? setEmailErr(err?.state?.email) : setEmailErr(null);
        err?.state?._id
          ? setUsernameErr(err?.state?._id)
          : setUsernameErr(null);
      });
  }, [errors, state]);

  const responseGoogle = response => {
    console.log('googleresponse: ', response);

    googleSignup({
      variables: {
        token: response?.tokenId,
      },
      errorPolicy: 'all',
    }).then(({ data, errors }) => {
      let userData = data?.Users?.googleSignup ? data?.Users?.googleSignup : {};
      let userErrors = errors ? errors : null;
      setGoogleErr(userErrors);

      dispatch(login(userData, null));
    });
  };

  const failureGoogle = response => {
    console.log('googleErr: ', response);
  };

  return (
    <div className='center-horizontal center-vertical'>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
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
          <Card>
            <CardContent>
              <Form
                initialValues={createUserInitialValues}
                validationSchema={createUserValidationSchema}
                onSubmit={({ username, email, password }) => {
                  setUsernameErr(null);
                  setEmailErr(null);

                  createUser({
                    variables: {
                      id: username,
                      email: email,
                      password: password,
                      invitationCode: null,
                    },
                    errorPolicy: 'all',
                  }).then(({ data, errors }) => {
                    let userData = data?.Users?.create
                      ? data?.Users?.create
                      : {};
                    let userErrors = errors ? errors : null;
                    dispatch(register(userData, userErrors));
                  });
                }}
              >
                <div className='text-center my-3 mx-2'>
                  <TextField
                    error={usernameErr && true}
                    errorText={usernameErr && usernameErr[0]}
                    name='username'
                    label='Username'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    error={emailErr && true}
                    errorText={emailErr && emailErr[0]}
                    name='email'
                    label='Email Adress'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    name='password'
                    label='Password'
                    variant='outlined'
                    type='password'
                    fullWidth
                  />
                  <TextField
                    name='cpassword'
                    label='Confirm Password'
                    variant='outlined'
                    type='password'
                    fullWidth
                  />

                  {justRegistered && (
                    <Alert
                      className='mb-2'
                      key={Math.random() * 100}
                      severity='error'
                    >
                      Registration Successful
                    </Alert>
                  )}

                  <div className='text-center my-3 px-sm-0'>
                    <Typography color='textPrimary' variant='body1'>
                      By clicking Agree &amp; Join, you agree to the BitNorm
                      <Link to='#' color='primary'>
                        User Agreement
                      </Link>
                      ,{' '}
                      <Link to='#' color='primary'>
                        Privacy Policy
                      </Link>
                      , and
                      <Link to='#' color='primary'>
                        Cookie Policy
                      </Link>
                      .
                    </Typography>
                  </div>

                  <Button submit fullWidth>
                    Join BitNorm
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
                      >
                        Continue With Google
                      </Button>
                    )}
                    cookiePolicy={'single_host_origin'}
                  />
                  <div className='text-center'>
                    <Typography variant='body1'>
                      <span style={{ marginTop: 10 }}></span>
                      Already on Bitnorm?{' '}
                      <Link color='primary' to='/auth/login'>
                        Sign In
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
  );
}
