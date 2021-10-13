import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Button from '../../../../components/Button';
import DonateCard from '../cards/DonateCard';

export default function Header() {
    const smDown = useMediaQuery('(max-width:959px)');
    const mw1160 = useMediaQuery('(min-width:1196px)');

    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10} md={6}>
                        <div className="mt-4 pt-2">
                            <Typography variant="h5" className="mt-5 mb-2">
                                BitNorm Investor Page
                            </Typography>
                            <Typography variant="h4" className="mb-3">
                                A one-stop data aggregator for the
                                cryptocurrency ecosystem
                            </Typography>
                            <Typography variant="h6" className="mb-3">
                                BitNorm creates an ecosystem that is fueled by
                                information sharing
                            </Typography>
                            <Button textCase size="large">
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
