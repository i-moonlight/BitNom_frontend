import { useMutation } from '@apollo/client';
import {
    Alert,
    Backdrop,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormikButton } from '../../components/Button';
import DividerText from '../../components/DividerText';
import Form from '../../components/Form';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import TextField from '../../components/TextField';
import { userUpdate } from '../../store/actions/authActions';
import { loginUserInitialValues } from './utilities/initial_values';
import {
    MUTATION_GOOGLE_LOGIN,
    MUTATION_LOGIN_USER_2,
} from './utilities/queries';
import { loginUserValidationSchema } from './utilities/validation_schemas';

export default function Login() {
    const [loginErr, setLoginErr] = useState(null);
    const [googleErr, setGoogleErr] = useState(null);

    const state = useSelector((st) => st);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = state.auth.user;

    const [loginUser, { loading: loginLoading, data: loginData }] = useMutation(
        MUTATION_LOGIN_USER_2,
        { context: { clientName: 'users' } }
    );

    const [googleLogin, { loading: googleLoading }] = useMutation(
        MUTATION_GOOGLE_LOGIN,
        { context: { clientName: 'users' } }
    );

    useEffect(() => {
        user && JSON.stringify(user) !== '{}' && history.push('/connect');
    }, [user, history]);

    const responseGoogle = (response) => {
        googleLogin({
            variables: {
                token: response.tokenId,
            },
            errorPolicy: 'all',
        }).then(({ data, errors }) => {
            const userData = data?.Users?.googleLogin || {};
            const userErrors = errors || null;
            setGoogleErr(userErrors);

            data?.Users?.googleLogin && dispatch(userUpdate(userData));
        });
    };

    const failureGoogle = (response) => {
        // eslint-disable-next-line no-console
        console.log('googleErr: ', response);
    };

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
                                Hi! WELCOME BACK
                            </Typography>
                            <Typography color="textPrimary" variant="body1">
                                Stay updated and get full access to a thousand
                                opportunities across the globe.
                            </Typography>
                        </div>
                        <Card elevation={4}>
                            <CardContent>
                                <Form
                                    enterSubmit
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
                                            const userData = data?.Users?.login
                                                ? data?.Users?.login
                                                : {};

                                            errors &&
                                                errors.map((err) => {
                                                    err?.state &&
                                                        err?.state[''] &&
                                                        setLoginErr(
                                                            err?.state['']
                                                        );
                                                });

                                            data?.Users?.login &&
                                                data?.Users?.login?.email
                                                    ?.verified &&
                                                dispatch(userUpdate(userData));
                                        });
                                    }}
                                >
                                    <div className="text-center my-3 mx-2">
                                        <TextField
                                            error={loginErr && true}
                                            errorText={loginErr && loginErr[0]}
                                            name="username"
                                            label="Email or Username"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <TextField
                                            error={loginErr && true}
                                            errorText={loginErr && loginErr[0]}
                                            name="password"
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            fullWidth
                                        />
                                        {loginData?.Users?.login &&
                                            !loginData?.Users?.login?.email
                                                ?.verified && (
                                                <Alert
                                                    severity="error"
                                                    className="mb-2"
                                                >
                                                    Email not verified yet.
                                                    Check your inbox for
                                                    verification link!
                                                </Alert>
                                            )}
                                        <div>
                                            <Typography className="end-horizontal mb-2">
                                                <Link
                                                    color="primary"
                                                    to="/auth/request_reset_link"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </Typography>
                                        </div>
                                        <FormikButton
                                            fullWidth
                                            disabled={loginLoading}
                                        >
                                            Sign In
                                        </FormikButton>
                                        <DividerText>or</DividerText>

                                        {googleErr &&
                                            googleErr.map((err) => (
                                                <Alert
                                                    className="mb-2"
                                                    key={Math.random() * 100}
                                                    severity="error"
                                                >
                                                    {err?.state?.email &&
                                                        err?.state?.email[0]}
                                                    {err?.state?._id &&
                                                        err?.state?._id[0]}
                                                    {err?.state[''] &&
                                                        err?.state['']}
                                                </Alert>
                                            ))}

                                        <GoogleLogin
                                            clientId={
                                                process.env
                                                    .REACT_APP_GOOGLE_CLIENT_ID
                                            }
                                            buttonText="Login Google"
                                            onSuccess={responseGoogle}
                                            onFailure={failureGoogle}
                                            render={(renderProps) => (
                                                <Button
                                                    // color='inherit'
                                                    onClick={
                                                        renderProps.onClick
                                                    }
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

                                        <div className="text-center my-3 px-sm-0">
                                            <Typography
                                                variant="body1"
                                                component="div"
                                            >
                                                <div
                                                    style={{ marginTop: 10 }}
                                                ></div>
                                                New to Bitnorm?{' '}
                                                <Link
                                                    color="primary"
                                                    to="/auth/signup"
                                                >
                                                    Join now
                                                </Link>
                                            </Typography>
                                        </div>
                                    </div>
                                </Form>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                </Grid>
                <Backdrop open={googleLoading || loginLoading}>
                    <div className="preloader-speeding-wheel"></div>
                </Backdrop>
            </div>
        </>
    );
}
