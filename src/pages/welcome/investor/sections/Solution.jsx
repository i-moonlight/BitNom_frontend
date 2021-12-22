import { useTheme } from '@emotion/react';
import { Card, CardContent, Container, Grid, Typography } from '@mui/material';

export default function Solution() {
    const theme = useTheme();

    return (
        <section
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
            <Container maxWidth="lg">
                <div className="py-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card
                                elevation={0}
                                style={{
                                    backgroundColor:
                                        theme.palette.background.investorCards,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        className="fw-bold"
                                    >
                                        Problem
                                    </Typography>
                                    <Typography className="lead">
                                        Crypto investors/traders have to
                                        maintain multiple accounts on multiple
                                        platforms to have a overview of their
                                        trading signals, latest crypto news,
                                        blogs, forums to make informed decision.
                                        There is no integrated environment that
                                        allows this.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h5"
                                className="fw-bold"
                            >
                                Solution
                            </Typography>
                            <Typography color="textPrimary" className="lead ">
                                BITNORM solves this problem by combining all of
                                this much-needed functionality and data with one
                                simple use ecosystem platform. BITNORM creates
                                its own token called BN on thisplatform. BN
                                gives the extract time data and social media
                                collaboration platforms. BN platform always
                                collects cookies for analytic. BITNORM platform
                                users are always firstly communicating with each
                                other. First to get the trading and investment
                                deals to others users. This platform provides
                                real-time communication to each other&apos;s
                                users. Its work time of reward, multichain token
                                locking, superior cutting edge.
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}
