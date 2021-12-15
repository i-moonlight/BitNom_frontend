import { useTheme } from '@emotion/react';
import {
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import React from 'react';
import igImg from '../../../../assets/investor/ig.png';
import LazyImage from '../../../../components/LazyImage';

export default function Concept() {
    const theme = useTheme();
    const smDown = useMediaQuery('(max-width:959px)');

    return (
        <section
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
            <Container maxWidth="lg">
                <div className="py-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card
                                elevation={0}
                                style={{
                                    backgroundColor:
                                        theme.palette.background.investorCards,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        className="text-uppercase"
                                        gutterBottom
                                        variant="h5"
                                    >
                                        Base{' '}
                                        <span
                                            style={
                                                {
                                                    // background: 'linear-gradient(#006097,#f36e6c)',
                                                    // WebkitBackgroundClip: 'inherit',
                                                }
                                            }
                                        >
                                            Concept
                                        </span>
                                    </Typography>
                                    <Typography className="lead" gutterBottom>
                                        Bitnorm will design a platform that will
                                        merge all type of crypto users together
                                        where they will be able to share amongst
                                        one another useful information about the
                                        market . The platform itself will offer
                                        an intuitive interface where market
                                        relevant market data and information
                                        will be provided. The platform will be
                                        imbedded will several relevance market
                                        analytical tools andsome relevant data
                                        engines that will be useful for the
                                        users to make polite financial decision.
                                    </Typography>
                                    <Typography className="lead" gutterBottom>
                                        Bitnorm Platform will be useful for
                                        Crypto investors , most especially users
                                        who are new to the industry . They will
                                        receive guides and relevant information
                                        to succeed in their trading careers.
                                        Bitnorm will function like a crypto
                                        social media that will connects
                                        investors, Project owners , crypto
                                        bloggers , traders and more together
                                        .Through this channel, useful
                                        information can be shared among the
                                        users.
                                    </Typography>
                                    <Card
                                        elevation={0}
                                        style={{
                                            backgroundColor:
                                                theme.palette.background
                                                    .investorShade,
                                            marginTop: 20,
                                            borderRadius: 20,
                                        }}
                                    >
                                        <CardContent>
                                            <div className="d-flex p-2 ">
                                                {!smDown && (
                                                    <LazyImage
                                                        style={{
                                                            marginLeft: 24,
                                                            marginRight: 24,
                                                        }}
                                                        image={{
                                                            src: igImg,
                                                            alt: 'Concept Image',
                                                            height: 50,
                                                        }}
                                                    />
                                                )}
                                                <div>
                                                    <Typography className="lead">
                                                        WHO WILL BITNORM
                                                        ULTIMATELY SERVE?
                                                    </Typography>
                                                    <Typography className="lead">
                                                        Our goal, therefore, is
                                                        to unite learners,
                                                        professionals, and
                                                        businesses all under one
                                                        roof with each one of
                                                        the benefits from the
                                                        other.
                                                    </Typography>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}
