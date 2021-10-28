import { useMutation } from '@apollo/client';
import Alert from '@mui/lab/Alert';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FormikButton } from '../../components/Button';
import Form from '../../components/Form';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import TextField from '../../components/TextField';
import { requestResetInitialValues } from './utilities/initial_values';
import { MUTATION_REQUEST_RESET } from './utilities/queries';
import { requestResetValidationSchema } from './utilities/validation_schemas';

export default function ResetPassword() {
    const [emailErr, setEmailErr] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const state = useSelector((st) => st);
    const history = useHistory();
    const user = state.auth.user;

    const [requestReset] = useMutation(MUTATION_REQUEST_RESET, {
        context: { clientName: 'users' },
    });

    useEffect(() => {
        JSON.stringify(user) !== '{}' && history.push('/connect');
    }, [history, user]);

    return (
        <>
            <NavBarAuth />
            <div className="center-horizontal center-vertical py-5">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={11} sm={7} md={6} lg={4}>
                        <div className="text-center my-3 px-sm-5">
                            <Typography color="textPrimary" variant="h5">
                                FORGOT PASSWORD
                            </Typography>
                            <Typography color="textPrimary" variant="body1">
                                Enter the email address you registered with and
                                we will send you a link to reset your password.
                            </Typography>
                        </div>
                        <Card elevation={4}>
                            <CardContent>
                                <Form
                                    initialValues={requestResetInitialValues}
                                    validationSchema={
                                        requestResetValidationSchema
                                    }
                                    onSubmit={({ email }) => {
                                        requestReset({
                                            variables: {
                                                email,
                                            },
                                            errorPolicy: 'all',
                                        }).then(({ data, errors }) => {
                                            setEmailErr(null);

                                            data?.Users
                                                ?.createPasswordResetCode &&
                                                setRequestSent(true);

                                            errors &&
                                                errors.map((err) => {
                                                    err?.state?.username &&
                                                        setEmailErr(
                                                            err?.state?.username
                                                        );
                                                });
                                        });
                                    }}
                                >
                                    <div className="text-center my-3 mx-2">
                                        <TextField
                                            error={emailErr && true}
                                            errorText={emailErr && emailErr[0]}
                                            name="email"
                                            label="Email Address"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />

                                        {requestSent && (
                                            <Alert
                                                className="mb-2"
                                                severity="success"
                                            >
                                                Request sent! Check your email.
                                            </Alert>
                                        )}

                                        <FormikButton
                                            disabled={requestSent}
                                            fullWidth
                                        >
                                            Reset Password
                                        </FormikButton>
                                        <div>
                                            <Typography className="center-vertical mt-4">
                                                <Link
                                                    color="primary"
                                                    to="/auth/login"
                                                >
                                                    Back to login
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
