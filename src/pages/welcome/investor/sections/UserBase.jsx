import {
    Card,
    CardContent,
    Container,
    Grid,
    Hidden,
    Typography,
} from '@material-ui/core';
import React from 'react';
import modelImg from '../../../../assets/investor/model.png';

export default function UserBase() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="py-4">
                    <Card style={{ backgroundColor: '#161922' }}>
                        <div className="my-5 mx-3">
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h5">
                                            OUR USER BASE
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography>
                                            BitNorm combines the four elements
                                            necessary to empower users venturing
                                            into cryptocurrencies and budding
                                            cryptocurrency-related projects and
                                            businesses
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="my-5">
                                            <Typography className="my-4 fw-bold ">
                                                <span
                                                    style={{
                                                        zIndex: 3,
                                                        position: 'absolute',
                                                    }}
                                                >
                                                    01.
                                                </span>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            '#D483F5',
                                                        alignSelf: 'baseline',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,
                                                    }}
                                                ></div>
                                            </Typography>
                                            <Typography className="my-4 fw-bold">
                                                Crypto Bloggers
                                            </Typography>
                                            <Typography>
                                                BitNorm allow all the users to
                                                create and maintain personal
                                                blogs on cryptocurrencies and
                                                related technologies.
                                            </Typography>
                                        </div>
                                        <div className="my-5">
                                            <Typography className="my-4 fw-bold">
                                                <span
                                                    style={{
                                                        zIndex: 3,
                                                        position: 'absolute',
                                                    }}
                                                >
                                                    02.
                                                </span>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            '#D483F5',
                                                        alignSelf: 'baseline',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,
                                                    }}
                                                ></div>
                                            </Typography>
                                            <Typography className="my-4 fw-bold">
                                                Cryptocurrency Developers and
                                                Maintainers
                                            </Typography>
                                            <Typography>
                                                It is important to maintain a
                                                keen eye on each of the existing
                                                cryptos in order to remain ahead
                                                and profitable. BitNorm realizes
                                                this and knowledges the need to
                                                support crypto developers and
                                                maintainers.
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Hidden smDown>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <div className="w-100">
                                                <img
                                                    src={modelImg}
                                                    alt=""
                                                    className="w-75"
                                                />
                                            </div>
                                        </Grid>
                                    </Hidden>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="my-5">
                                            <Typography className="my-4 fw-bold">
                                                <span
                                                    style={{
                                                        zIndex: 3,
                                                        position: 'absolute',
                                                    }}
                                                >
                                                    03.
                                                </span>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            '#D483F5',
                                                        alignSelf: 'baseline',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,
                                                    }}
                                                ></div>
                                            </Typography>
                                            <Typography className="my-4 fw-bold">
                                                Lone Crypto Researchers
                                            </Typography>
                                            <Typography>
                                                As the users’ understanding of
                                                crypto mature, quick access to
                                                the information becomes
                                                necessary. This is because the
                                                crypto domain is huge and there
                                                is an overwhelming number of
                                                variants to keep track of in
                                                order to remain ahead.
                                            </Typography>
                                        </div>
                                        <div className="my-5">
                                            <span className="my-4 fw-bold">
                                                <span
                                                    style={{
                                                        zIndex: 3,
                                                        position: 'absolute',
                                                    }}
                                                >
                                                    04.
                                                </span>
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            '#D483F5',
                                                        alignSelf: 'baseline',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,
                                                    }}
                                                ></div>
                                            </span>
                                            <Typography className="my-4 fw-bold">
                                                Cryptocurrency Traders
                                            </Typography>
                                            <Typography>
                                                A huge fraction of the
                                                stakeholders in the
                                                cryptocurrency domain consists
                                                of cryptocurrency traders. This
                                                implies that a huge market
                                                exists that is driven by this
                                                type of users
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
