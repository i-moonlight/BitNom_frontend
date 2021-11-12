import {
    Card,
    CardContent,
    Container,
    Grid,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import card4Img from '../../../assets/landing/card (4).svg';
import card5Img from '../../../assets/landing/card (5).svg';
import card6Img from '../../../assets/landing/card (6).svg';
import LazyImage from '../../../components/LazyImage';
import DarkThemeOnly from '../../../utilities/DarkThemeOnly';
import { useStyles } from './Landing';

export default function TransitionSection() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid style={{ backgroundColor: theme.palette.background.landing }}>
            <Container maxWidth="lg">
                <Grid spacing={5} container className="py-5">
                    <Grid item md={6}>
                        <Typography
                            variant="h1"
                            style={{
                                color: '#F98D00',
                            }}
                        >
                            .
                        </Typography>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                            className="fw-bold"
                        >
                            Our World Is Changing. Together, We Can Change It
                            For The Better.
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <Grid container spacing={5}>
                            <Grid item lg={3}>
                                <DarkThemeOnly>
                                    <Card className={classes.cardImg}>
                                        <CardContent>
                                            <LazyImage
                                                style={{ width: '100%' }}
                                                image={{
                                                    src: card4Img,
                                                    alt: 'Card Image',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </DarkThemeOnly>
                            </Grid>
                            <Grid item lg={3}>
                                <DarkThemeOnly>
                                    <Card className={classes.cardImg}>
                                        <CardContent>
                                            <LazyImage
                                                style={{ width: '100%' }}
                                                image={{
                                                    src: card5Img,
                                                    alt: 'Card Image',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </DarkThemeOnly>
                            </Grid>
                            <Grid item lg={3}>
                                <DarkThemeOnly>
                                    <Card className={classes.cardImg}>
                                        <CardContent>
                                            <LazyImage
                                                style={{ width: '100%' }}
                                                image={{
                                                    src: card6Img,
                                                    alt: 'Card Image',
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                </DarkThemeOnly>
                            </Grid>
                            <Grid item lg={3}></Grid>
                        </Grid>
                        <Grid container spacing={5}>
                            <Grid item sm={12}>
                                <Typography
                                    className={classes.sectionText}
                                    gutterBottom
                                    color="textPrimary"
                                >
                                    We aim to empower the beginner transition
                                    from novice to master in the simplest of
                                    ways and the master to expand his knowledge,
                                    specialty, and career. We empower both
                                    learners and businesses. We believe in
                                    community and humanity.
                                </Typography>
                                <Typography
                                    className={classes.sectionText}
                                    color="textPrimary"
                                >
                                    We believe that the action of making the
                                    lives of those around us better has the
                                    consequence of making our lives better
                                    whether directly or indirectly.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}
