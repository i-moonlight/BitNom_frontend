import {
    Container,
    Grid,
    Hidden,
    Paper,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import Button from '../../../../components/Button';
import DonateCard from '../cards/DonateCard';

export default function Header() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container maxWidth="lg">
                <Paper style={{ backgroundColor: '#000' }}>
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
                                    BitNorm creates an ecosystem that is fueled
                                    by information sharing
                                </Typography>
                                <Button textCase size="large">
                                    Get Started
                                </Button>
                            </div>
                        </Grid>
                        <Hidden smDown>
                            <Grid item sm={6}>
                                <div
                                    className={`px-${
                                        useMediaQuery('(min-width:1196px)') &&
                                        '5'
                                    }`}
                                >
                                    <DonateCard />
                                </div>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Paper>
            </Container>
        </section>
    );
}
