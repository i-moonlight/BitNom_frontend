import { useTheme } from '@emotion/react';
import {
    Card,
    Container,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';

import token1Img from '../../../../assets/investor/token1.png';
import token2Img from '../../../../assets/investor/token2.png';

export default function Symbol() {
    const smDown = useMediaQuery('(max-width:959px)');
    const theme = useTheme();

    return (
        <section
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
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
                                    <Typography
                                        className="c-pointer"
                                        noWrap={false}
                                        color="primary"
                                        onClick={() => {
                                            window.open(
                                                'https://etherscan.io/address/0x42edc1c5ff57ff5240c90e2d8dfa269d77d68013',
                                                '_blank'
                                            );
                                        }}
                                    >
                                        0x42edc1c5ff57ff5240c90e2d8dfa269d77d68013
                                    </Typography>
                                    <Typography>
                                        Smart Contract address
                                    </Typography>
                                </div>
                            </Grid>
                            {!smDown && (
                                <Grid item xs={12} sm={3}>
                                    <div className="w-100 text-end">
                                        <img
                                            src={token1Img}
                                            alt=""
                                            className="w-75"
                                        />
                                    </div>
                                </Grid>
                            )}
                        </Grid>
                    </Card>
                </div>
            </Container>
        </section>
    );
}
