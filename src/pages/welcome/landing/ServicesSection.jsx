import { Container, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import servicesImg from '../../../assets/landing/img3.png';
import LazyImage from '../../../components/LazyImage';
import { INVESTOR_CARD_DISPLACEMENT, useStyles } from './Landing';

export default function ServicesSection() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            style={{
                backgroundColor: theme.palette.background.paper,
                paddingTop: INVESTOR_CARD_DISPLACEMENT,
            }}
        >
            <Container maxWidth="lg">
                <Grid spacing={5} container className="py-5">
                    <Grid item sm={10} md={6} className="py-5 mt-3">
                        <Typography
                            className="fw-bold mb-2"
                            variant="h5"
                            color="textPrimary"
                        >
                            The fastest and easiest wayto bring your product to
                            life
                        </Typography>
                        <Typography
                            className={classes.sectionText}
                            gutterBottom
                            color="textPrimary"
                        >
                            Ultimately the key to value is need and use. If
                            nobody needs or uses your product you have no
                            business, to ensure you make profitable investments,
                            Bitnorm aggregates and associates services and
                            cryptocurrencies to provide you with a strong
                            indicator of their usage and hence their true value.
                            product to life
                        </Typography>
                        <Typography
                            className={classes.sectionText}
                            color="textPrimary"
                        >
                            <Link to="/services">Visit BN Services &gt;</Link>
                        </Typography>
                    </Grid>
                    <Grid item sm={10} md={6}>
                        <LazyImage
                            style={{ width: '100%' }}
                            image={{
                                src: servicesImg,
                                alt: 'Services Image',
                            }}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}
