import { ChevronRightRounded } from '@mui/icons-material';
import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import supplyImg from '../../../../assets/investor/image_5.png';
import Button from '../../../../components/Button';

export default function Token() {
    return (
        <section style={{ backgroundColor: '#000' }}>
            <Container>
                <div className="py-5">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                className="text-white fw-bold"
                            >
                                BN Token
                            </Typography>
                            <Typography
                                gutterBottom
                                className="lead text-white"
                            >
                                BN token is a utility, Ethereum ERC20- token,
                                specially designed for the BitNorm ecosystem.
                                ERC20 tokens enable a uniform, standard set of
                                rules governing how tokens behave and function
                                on the Ethereum network. This is crucial for
                                heightened stability and network cohesiveness.
                                Ethereum has a first-mover advantage and
                                continues to have the largest market cap.
                            </Typography>
                            <Typography
                                gutterBottom
                                className="lead text-white"
                            >
                                ERC20 allows for seamless interaction with other
                                smart contracts and decentralized applications
                                on the Ethereum blockchain.
                            </Typography>
                            <div>
                                <Button
                                    size="large"
                                    textCase
                                    variant="outlined"
                                    className="mt-3 me-2"
                                    endIcon={<ChevronRightRounded />}
                                    onClick={() => {
                                        window.open(
                                            'https://latoken.com/exchange/BN_USDT',
                                            '_blank'
                                        );
                                    }}
                                >
                                    Buy BN
                                </Button>
                                <Button
                                    size="large"
                                    textCase
                                    variant="text"
                                    className="mt-3"
                                    endIcon={<ChevronRightRounded />}
                                    onClick={() => {
                                        window.open(
                                            'https://latoken.com/exchange/BN_USDT',
                                            '_blank'
                                        );
                                    }}
                                >
                                    Visit Price / Chart
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <div className="w-100 bg-white text-center mb-2 br-1 py-2 fw-bold">
                                    <Typography color="primary">
                                        Maximum Supply: 200M
                                    </Typography>
                                </div>
                                <div className="w-100 br-2 bg-white py-1 text-center">
                                    <img
                                        className="w-75"
                                        src={supplyImg}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
}
