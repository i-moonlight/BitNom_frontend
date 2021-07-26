import { useMutation } from '@apollo/client';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { DoneRounded } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import { login } from '../../store/actions/authActions';
import { updateInfoInitialValues } from './utilities/initial_values';
import { MUTATION_UPDATE_PROFILE_INFO } from './utilities/queries';
import { updateInfoValidationSchema } from './utilities/validation_schemas';

export default function UpdateInfo() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = state.auth.user;

  const [updateProfileInfo] = useMutation(MUTATION_UPDATE_PROFILE_INFO);

  useEffect(() => {
    user?.email?.verified && user?.displayName && history.push('/');
    JSON.stringify(user) === '{}' && history.push('/auth/login');
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
              BEFORE WE PROCEED
            </Typography>
            <Typography color='textPrimary' variant='body1'>
              Please fill out the following details for a better experience.
            </Typography>
          </div>
          <Card elevation={0}>
            <CardContent>
              <Form
                initialValues={updateInfoInitialValues}
                validationSchema={updateInfoValidationSchema}
                onSubmit={({ displayName, bio }) => {
                  updateProfileInfo({
                    variables: {
                      displayName,
                      bio,
                    },
                    errorPolicy: 'all',
                  }).then(({ data, errors }) => {
                    let userData = data?.Users?.update
                      ? data?.Users?.update
                      : {};
                    let userErrors = errors ? errors : null;

                    console.log(userData);

                    dispatch(login(userData, null));
                  });
                }}
              >
                <div className='text-center my-3 mx-2'>
                  <TextField
                    disabled
                    label={user?._id}
                    variant='outlined'
                    fullWidth
                    adornment={<DoneRounded />}
                    adornmentType='end'
                  />
                  <TextField
                    name='displayName'
                    label='Full Name'
                    variant='outlined'
                    fullWidth
                  />
                  <TextField
                    name='bio'
                    label='Your Bio'
                    variant='outlined'
                    multiline
                    rows={3}
                    fullWidth
                  />
                  <Button fullWidth submit>
                    Update Details
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
