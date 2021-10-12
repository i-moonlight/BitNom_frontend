import {
    Card,
    CardContent,
    Container,
    Grid,
    Hidden,
    Typography,
} from '@mui/material';
import React from 'react';
import igImg from '../../../../assets/investor/ig.png';

export default function Concept() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="py-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card style={{ backgroundColor: '#11141C' }}>
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
                                        style={{
                                            backgroundColor: '#0C0F19',
                                            marginTop: 20,
                                            borderRadius: 20,
                                        }}
                                    >
                                        <CardContent>
                                            <div className="d-flex p-2 ">
                                                <Hidden smDown>
                                                    <img
                                                        src={igImg}
                                                        alt=""
                                                        className="mx-5"
                                                        style={{
                                                            height: 50,
                                                        }}
                                                    />
                                                </Hidden>
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
