import { Card, Container, Grid, Hidden, Typography } from '@material-ui/core';
import React from 'react';
import token1Img from '../../../../assets/investor/token1.png';
import token2Img from '../../../../assets/investor/token2.png';

export default function Symbol() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="py-3">
                    <Card
                        style={{
                            backgroundImage: 'linear-gradient(#0B072B,#072438)',
                        }}
                        className="py-3"
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                                <div className="w-100 text-center">
                                    <img
                                        src={token2Img}
                                        alt=""
                                        className="w-75"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <div className="px-3">
                                    <Typography color="primary">BN</Typography>
                                    <Typography>Symbol</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div className="px-3">
                                    <Typography noWrap color="primary">
                                        0x42edc1c5ff57Ff5240C90E2D8DfA269D77D68013
                                    </Typography>
                                    <Typography>
                                        Smart Contract address
                                    </Typography>
                                </div>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={12} sm={3}>
                                    <div className="w-100 text-end">
                                        <img
                                            src={token1Img}
                                            alt=""
                                            className="w-75"
                                        />
                                    </div>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
