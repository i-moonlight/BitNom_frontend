import { useTheme } from '@emotion/react';
import {
    ChevronRightRounded,
    CloudDownload,
    ShareRounded,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';
import { Button } from '../../../../components/Button';

const learnImg = React.lazy(() =>
    import('../../../../assets/investor/learn.svg')
);
const logoImg = React.lazy(() => import('../../../../assets/logo_full.svg'));

export default function WhitePaper() {
    const theme = useTheme();

    return (
        <section
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
            <Container>
                <div className="py-4">
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={8}>
                            <Card
                                elevation={0}
                                style={{
                                    backgroundColor:
                                        theme.palette.background.investorCards,
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
                                                        className="my-2"
                                                        endIcon={
                                                            <CloudDownload />
                                                        }
                                                    >
                                                        <a
                                                            href={`${window.location.origin}/assets/BitNorm Whitepaper.pdf`}
                                                        >
                                                            Download Whitepaper
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        color="inherit"
                                                        textCase
                                                        variant="text"
                                                        className="my-2"
                                                        startIcon={
                                                            <ShareRounded />
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                navigator.share
                                                            ) {
                                                                navigator.share(
                                                                    {
                                                                        title: 'BitNorm WhitePaper',
                                                                        text: 'Check out BitNorm White Paper.',
                                                                        url: `${window.location.origin}/assets/BitNorm Whitepaper.pdf`,
                                                                    }
                                                                );
                                                            }
                                                        }}
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
