import { useMutation } from '@apollo/client';
import { Alert, Container, Divider, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo_light_full from '../../assets/logo_light_full.svg';
import { Button } from '../../components/Button';
import LazyImage from '../../components/LazyImage';
import TextField from '../../components/TextField';
import DarkThemeOnly from '../../utilities/DarkThemeOnly';
import {
    MUTATION_CREATE_EMAIL_SUBSCRIBER,
    MUTATION_REMOVE_EMAIL_SUBSCRIBER,
} from '../auth/utilities/queries';
import CoinMarquee from './CoinMarquee';
import { footerLinks } from './utilities/welcome.data';

export default function Footer() {
    const history = useHistory();
    const [subscriberEmail, setSubscriberEmail] = useState('');
    const [unsubscribe, setUnsubscribe] = useState(false);
    const [subscribeErr, setSubscribeErr] = useState(null);

    const [createEmailSubscriber, { data: subscribeData }] = useMutation(
        MUTATION_CREATE_EMAIL_SUBSCRIBER,
        {
            context: { clientName: 'users' },
        }
    );
    const [removeEmailSubscriber, { data: unSubscribeData }] = useMutation(
        MUTATION_REMOVE_EMAIL_SUBSCRIBER,
        {
            context: { clientName: 'users' },
        }
    );
    return (
        <>
            <CoinMarquee />
            <DarkThemeOnly>
                <Grid style={{ backgroundColor: '#18191a', color: '#fff' }}>
                    <Container maxWidth="lg">
                        <Grid container>
                            <Grid
                                className="center-horizontal my-3"
                                item
                                md={6}
                                sm={12}
                            >
                                <Typography variant="h6" color="textSecondary">
                                    Get BitNorm Updates to your Inbox
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} className="my-3">
                                <div className="w-100">
                                    <div className="center-horizontal justify-content-end">
                                        <TextField
                                            style={{ flex: 1 }}
                                            fullWidth={false}
                                            onChange={(e) => {
                                                setSubscriberEmail(
                                                    e.target.value
                                                );
                                            }}
                                            label="Enter your email"
                                            value={subscriberEmail}
                                        />
                                        <Button
                                            className="mx-2"
                                            onClick={() => {
                                                if (subscriberEmail.length < 8)
                                                    return;
                                                createEmailSubscriber({
                                                    variables: {
                                                        email: subscriberEmail,
                                                    },
                                                    errorPolicy: 'all',
                                                }).then(({ data, errors }) => {
                                                    if (
                                                        data?.Users
                                                            ?.createEmailSubscriber
                                                    ) {
                                                        setSubscribeErr(null);
                                                        setSubscriberEmail('');
                                                        setUnsubscribe(false);
                                                    }

                                                    if (errors) {
                                                        setUnsubscribe(false);
                                                        setSubscribeErr(errors);
                                                    }
                                                });
                                            }}
                                            textCase
                                        >
                                            <Typography variant="body2" noWrap>
                                                Subscribe
                                            </Typography>
                                        </Button>
                                    </div>
                                    {subscribeData?.Users
                                        ?.createEmailSubscriber &&
                                        !unsubscribe && (
                                            <Typography
                                                component="div"
                                                className="center-horizontal"
                                            >
                                                <Typography component="div">
                                                    <Alert
                                                        severity="success"
                                                        className="mb-2"
                                                    >
                                                        {
                                                            subscribeData?.Users
                                                                ?.createEmailSubscriber
                                                                ?.message
                                                        }
                                                    </Alert>
                                                </Typography>
                                                <Button
                                                    className="mx-2"
                                                    onClick={() => {
                                                        const id =
                                                            subscribeData?.Users
                                                                ?.createEmailSubscriber
                                                                ?.email;
                                                        if (!id) return;
                                                        removeEmailSubscriber({
                                                            variables: {
                                                                email: id,
                                                            },
                                                            errorPolicy: 'all',
                                                        }).then(
                                                            ({
                                                                data,
                                                                errors,
                                                            }) => {
                                                                if (
                                                                    data?.Users
                                                                        ?.removeEmailSubscriber
                                                                ) {
                                                                    setSubscribeErr(
                                                                        null
                                                                    );
                                                                    setSubscriberEmail(
                                                                        ''
                                                                    );
                                                                    setUnsubscribe(
                                                                        true
                                                                    );
                                                                }

                                                                if (errors) {
                                                                    setUnsubscribe(
                                                                        true
                                                                    );
                                                                    setSubscribeErr(
                                                                        errors
                                                                    );
                                                                }
                                                            }
                                                        );
                                                    }}
                                                    textCase
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        noWrap
                                                    >
                                                        Unsubscribe
                                                    </Typography>
                                                </Button>
                                            </Typography>
                                        )}
                                    {unsubscribe &&
                                        unSubscribeData?.Users
                                            ?.removeEmailSubscriber && (
                                            <Alert
                                                severity="success"
                                                className="mb-2"
                                            >
                                                {
                                                    unSubscribeData?.Users
                                                        ?.removeEmailSubscriber
                                                        ?.message
                                                }
                                            </Alert>
                                        )}
                                    {subscribeErr &&
                                        subscribeErr?.map((err, index) => (
                                            <Alert
                                                key={index}
                                                severity="error"
                                                className="mb-2"
                                            >
                                                {err?.state?.email[0]}
                                            </Alert>
                                        ))}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item lg={12} className="mb-3">
                                <Divider />
                            </Grid>
                        </Grid>

                        <Grid container>
                            {footerLinks.map((footerLink) => (
                                <Grid
                                    key={footerLink[0]?.text}
                                    item
                                    md={3}
                                    sm={4}
                                    xs={6}
                                    className="my-3"
                                >
                                    {footerLink.map((link) => (
                                        <div key={link?.text}>
                                            {link?.title ? (
                                                <Typography
                                                    gutterBottom
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {link?.text}
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    gutterBottom
                                                    // color='textPrimary'
                                                >
                                                    {link.href ? (
                                                        <a
                                                            style={{
                                                                color: '#fff',
                                                            }}
                                                            href={link.href}
                                                        >
                                                            {link?.text}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            to={link?.link}
                                                            className="alt"
                                                        >
                                                            {link?.text}
                                                        </Link>
                                                    )}
                                                </Typography>
                                            )}
                                        </div>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container>
                            <Grid item lg={12} className="my-3">
                                <Divider />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={6} className="my-2">
                                <div
                                    className="center-horizontal c-pointer"
                                    onClick={() => history.push('/connect')}
                                >
                                    <div>
                                        <LazyImage
                                            image={{
                                                src: logo_light_full,
                                                alt: 'BN Logo',
                                                height: 40,
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={6} className="my-2">
                                {/* <img style={{ height: 40 }} src={googlePlayImg} alt="" /> */}
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>

                <Grid style={{ backgroundColor: '#141617' }}>
                    <Container
                        maxWidth="lg"
                        container
                        component={Grid}
                        className="py-3"
                    >
                        <Grid item lg={6}>
                            <Typography
                                className="me-5"
                                variant="body2"
                                color="textPrimary"
                            >
                                Copyright &copy; {new Date().getFullYear()}{' '}
                                {window.location.host} All rights reserved
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant="body2" color="textPrimary">
                                <Link to="/terms"> Terms And Conditions </Link>.
                                <Link to="/privacy_policy">
                                    {' '}
                                    Privacy Policy{' '}
                                </Link>
                                .
                                <Link to="/cookie_policy"> Cookie Policy </Link>
                                .<Link to="/disclaimer"> Disclaimer</Link>
                            </Typography>
                        </Grid>
                    </Container>
                </Grid>
            </DarkThemeOnly>
        </>
    );
}
