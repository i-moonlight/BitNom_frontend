import {
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import {
    ChevronRightRounded,
    CloudDownload,
    ShareRounded,
} from '@material-ui/icons';
import React from 'react';
import learnImg from '../../../../assets/investor/learn.svg';
import logoImg from '../../../../assets/logo_full.svg';
import Button from '../../../../components/Button';

export default function WhitePaper() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="py-4">
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={8}>
                            <Card
                                style={{
                                    backgroundColor: '#11141C',
                                    height: '100%',
                                }}
                            >
                                <CardContent className="m-0 pb-0">
                                    <Grid
                                        container
                                        spacing={2}
                                        className="h-100"
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            className="h-100"
                                        >
                                            <div className="d-flex flex-column bg-white p-3 text-black justify-content-between">
                                                <div>
                                                    <div className="d-flex align-items-center justify-content-between ">
                                                        <small className="text-uppercase">
                                                            White Paper
                                                        </small>

                                                        <small>
                                                            {' '}
                                                            9 months ago
                                                        </small>
                                                    </div>
                                                    <Typography className="lead fw-bold my-2">
                                                        First in line: Early
                                                        technology adopters
                                                        around the globe
                                                    </Typography>
                                                </div>
                                                <img
                                                    src={logoImg}
                                                    alt=""
                                                    className="w-50 align-self-baseline mt-3"
                                                />
                                            </div>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={8}
                                            justifyContent="space-between"
                                            className=" d-flex flex-column"
                                        >
                                            <div>
                                                <Typography
                                                    className="lead"
                                                    gutterBottom
                                                >
                                                    BitNorm, an all in one
                                                    platform combining several
                                                    aspects that we call engines
                                                    that collectively work
                                                    together to realize natural
                                                    and seamless access to the
                                                    information within the
                                                    cryptocurrencies ecosystem.
                                                </Typography>
                                                <Typography
                                                    className="lead"
                                                    gutterBottom
                                                >
                                                    This information is
                                                    presented in multiple
                                                    formats to cater for both
                                                    the varying goals of our
                                                    users and the diversity of
                                                    our audience
                                                </Typography>
                                            </div>
                                            <div>
                                                <Divider />
                                                <div className="d-flex align-items-center justify-content-between mt-auto">
                                                    <Button
                                                        color="inherit"
                                                        textCase
                                                        variant="text"
                                                        className="mt-2"
                                                        endIcon={
                                                            <CloudDownload />
                                                        }
                                                    >
                                                        Download Whitepaper
                                                    </Button>
                                                    <Button
                                                        color="inherit"
                                                        textCase
                                                        variant="text"
                                                        className="mt-2"
                                                        startIcon={
                                                            <ShareRounded />
                                                        }
                                                    >
                                                        Share
                                                    </Button>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={4}>
                            <Card
                                style={{
                                    backgroundImage:
                                        'linear-gradient(#006097,#07A1FB)',
                                    height: '100%',
                                }}
                            >
                                <CardContent>
                                    <img
                                        style={{
                                            maxHeight: 200,
                                        }}
                                        src={learnImg}
                                        alt=""
                                        className="w-50 "
                                    />
                                    <br />
                                    <Button
                                        size="large"
                                        color="inherit"
                                        textCase
                                        variant="text"
                                        className="mt-2"
                                        endIcon={<ChevronRightRounded />}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}
