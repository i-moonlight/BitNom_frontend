import { useTheme } from '@emotion/react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import DonateCard from '../cards/DonateCard';

export default function Header() {
    const history = useHistory();
    const theme = useTheme();
    const smDown = useMediaQuery('(max-width:959px)');
    const mw1160 = useMediaQuery('(min-width:1196px)');

    return (
        <section
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10} md={6}>
                        <div className="mt-4 pt-2">
                            <Typography
                                color="textPrimary"
                                variant="h5"
                                className="mt-5 mb-2"
                            >
                                BitNorm Investor Page
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                                className="mb-3"
                            >
                                A one-stop data aggregator for the
                                cryptocurrency ecosystem
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h6"
                                className="mb-3"
                            >
                                BitNorm creates an ecosystem that is fueled by
                                information sharing
                            </Typography>
                            <Button
                                onClick={() => {
                                    history.push('/auth/signup');
                                }}
                                textCase
                                size="large"
                            >
                                Get Started
                            </Button>
                        </div>
                    </Grid>
                    {!smDown && (
                        <Grid item sm={6}>
                            <div className={`px-${mw1160 && '5'}`}>
                                <DonateCard />
                            </div>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </section>
    );
}
