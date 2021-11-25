import { useMutation } from '@apollo/client';
import { DoneRounded } from '@mui/icons-material';
import { Alert, Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormikButton } from '../../components/Button';
import Form from '../../components/Form';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import TextField from '../../components/TextField';
import { login } from '../../store/actions/authActions';
import { updateInfoInitialValues } from './utilities/initial_values';
import { MUTATION_UPDATE_PROFILE_INFO } from './utilities/queries';
import { updateInfoValidationSchema } from './utilities/validation_schemas';

export default function UpdateInfo() {
    const state = useSelector((st) => st);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = state.auth.user;

    const [updateProfileInfo] = useMutation(MUTATION_UPDATE_PROFILE_INFO, {
        context: { clientName: 'users' },
    });

    useEffect(() => {
        JSON.stringify(user) === '{}' && history.push('/auth/login');
    }, [history, user]);

    return (
        <>
            <NavBarAuth />
            <div className="center-horizontal center-vertical py-5">
                <Grid
                    container
                    spacing={0}
                    style={{ minHeight: '100vh', marginTop: 80 }}
                >
                    <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <div className="text-center my-3 px-sm-5">
                            <Typography color="textPrimary" variant="h5">
                                BEFORE WE PROCEED
                            </Typography>
                            <Typography color="textPrimary" variant="body1">
                                Please fill out the following details for a
                                better experience.
                            </Typography>
                        </div>
                        <Card elevation={4}>
                            <CardContent>
                                <Form
                                    enterSubmit
                                    initialValues={updateInfoInitialValues}
                                    validationSchema={
                                        updateInfoValidationSchema
                                    }
                                    onSubmit={({ displayName }) => {
                                        updateProfileInfo({
                                            variables: {
                                                displayName,
                                            },
                                            errorPolicy: 'all',
                                        }).then(({ data }) => {
                                            const userData = data?.Users?.update
                                                ? data?.Users?.update
                                                : {};

                                            data?.Users?.update &&
                                                dispatch(login(userData, null));
                                        });
                                    }}
                                >
                                    <div className="text-center my-3 mx-2">
                                        <TextField
                                            disabled
                                            label={user?._id}
                                            variant="outlined"
                                            fullWidth
                                            adornment={<DoneRounded />}
                                            adornmentType="end"
                                        />
                                        <TextField
                                            name="displayName"
                                            label="Full Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <FormikButton
                                            fullWidth
                                            className="mt-2"
                                            disabled={
                                                user?.email?.verified &&
                                                user?.displayName
                                            }
                                        >
                                            Update Details
                                        </FormikButton>
                                        {user?.email?.verified &&
                                            user?.displayName && (
                                                <div className="mt-3">
                                                    <Alert>
                                                        Info Updated
                                                        Successfully.
                                                    </Alert>
                                                    <div className="d-flex">
                                                        <Button
                                                            fullWidth
                                                            className="mt-2 me-1"
                                                            onClick={() => {
                                                                history.push(
                                                                    '/profile'
                                                                );
                                                            }}
                                                        >
                                                            Edit Profile
                                                        </Button>
                                                        <Button
                                                            fullWidth
                                                            className="mt-2 ms-2"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                history.push(
                                                                    '/connect'
                                                                );
                                                            }}
                                                        >
                                                            Go to BN Connect
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </Form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                </Grid>
            </div>
        </>
    );
}
