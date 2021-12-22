import { useMutation } from '@apollo/client';
import { Alert, Card, CardContent, Grid, Typography } from '@mui/material';
import { parse } from 'querystring';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import NavBarAuth from '../../components/navbar/auth/NavBarAuth';
import { signout, verifySuccess } from '../../store/actions/authActions';
import { MUTATION_VERIFY_EMAIL } from './utilities/queries';

export default function VerifyEmail() {
    const [verifying, setVerifying] = useState(true);
    const [verifyErr, setVerifyErr] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const state = useSelector((st) => st);
    const user = state.auth.user;

    const [verifyEmail] = useMutation(MUTATION_VERIFY_EMAIL, {
        context: { clientName: 'users' },
    });

    useEffect(() => {
        user?.email?.verified &&
            !user?.displayName &&
            history.push('/auth/update_info_register');

        verifyEmail({
            variables: {
                verificationCode: parse(location.search)['?evc'],
            },
            errorPolicy: 'all',
        }).then(({ errors }) => {
            setVerifying(false);
            const userErrors = errors ? errors : null;
            setVerifyErr(userErrors);

            if (!errors) {
                setTimeout(() => {
                    user?.email
                        ? dispatch(verifySuccess())
                        : dispatch(signout());
                }, 2000);
            }
        });
    }, [
        dispatch,
        history,
        location.search,
        user?.displayName,
        user?.email,
        user?.email?.verified,
        verifyEmail,
    ]);

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
                        <Card elevation={4}>
                            <CardContent>
                                <div className="text-center my-3 mx-2">
                                    <div className="text-center my-3 px-sm-0">
                                        <Typography variant="body1">
                                            <span
                                                style={{ marginTop: 10 }}
                                            ></span>
                                            {verifying &&
                                                `Please wait. Verifying Email ...`}
                                        </Typography>
                                        {!verifying && !verifyErr && (
                                            <>
                                                <Alert
                                                    className="mb-2 mt-2"
                                                    key={Math.random() * 100}
                                                    severity="success"
                                                >
                                                    Verification Successful
                                                </Alert>
                                                <div className="text-center mt-3">
                                                    <Typography variant="body1">
                                                        <span
                                                            style={{
                                                                marginTop: 10,
                                                            }}
                                                        ></span>
                                                        You can now proceed to{' '}
                                                        <Link
                                                            color="primary"
                                                            to="/auth/login"
                                                        >
                                                            Sign In
                                                        </Link>
                                                    </Typography>
                                                </div>
                                            </>
                                        )}

                                        {verifyErr?.map((err) => (
                                            <Alert
                                                className="mb-2 mt-2"
                                                key={Math.random() * 100}
                                                severity="error"
                                            >
                                                {err?.state?.verificationCode &&
                                                    err?.state
                                                        ?.verificationCode[0]}
                                            </Alert>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                </Grid>
            </div>
        </>
    );
}
