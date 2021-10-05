import { Container, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo_light_full from '../../assets/logo_light_full.svg';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import DarkTheme from '../../utilities/DarkTheme';
import { footerLinks } from './utilities/welcome.data';

export default function Footer() {
    const history = useHistory();

    return (
        <DarkTheme>
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
                                        placeholder="Enter Your Email"
                                    />
                                    <Button className="mx-2" textCase>
                                        <Typography noWrap>
                                            Subscribe
                                        </Typography>
                                    </Button>
                                </div>
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
                                                <Link
                                                    to={link?.link}
                                                    className="alt"
                                                >
                                                    {link?.text}
                                                </Link>
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
                                onClick={() => history.push('/dashboard')}
                            >
                                <div>
                                    <img
                                        style={{
                                            height: 40,
                                        }}
                                        src={logo_light_full}
                                        alt=""
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
                    container
                    component={Grid}
                    maxWidth="lg"
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
                            <Link to="/privacy_policy"> Privacy Policy </Link>.
                            <Link to="/cookie_policy"> Cookie Policy </Link>.
                            <Link to="/disclaimer"> Disclaimer</Link>
                        </Typography>
                    </Grid>
                </Container>
            </Grid>
        </DarkTheme>
    );
}
