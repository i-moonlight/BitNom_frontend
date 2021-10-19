import { ArrowForwardRounded, PlayArrowRounded } from '@mui/icons-material';
import {
    Container,
    Grid,
    IconButton,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import headerBgImg from '../../../assets/landing/img12.png';
import Button from '../../../components/Button';
import DarkThemeOnly from '../../../utilities/DarkThemeOnly';

export default function HeaderSection() {
    const theme = useTheme();

    return (
        <Grid
            style={{
                backgroundColor: theme.palette.background.landing,
            }}
        >
            <Container container component={Grid} maxWidth="md">
                <Grid
                    style={{
                        backgroundImage: `url('${headerBgImg}')`,
                        backgroundSize: 'cover',
                        borderRadius: 30,
                        padding: '5%',
                    }}
                    item
                    lg={12}
                    className="mt-5 mb-5"
                >
                    <DarkThemeOnly>
                        <Typography
                            variant="h3"
                            color="textPrimary"
                            className="mb-2 mt-4 text-center"
                        >
                            The Ultimate Crypto-Intelligence Suite
                        </Typography>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            className="my-2 text-center"
                        >
                            BitNorm is an ever-expanding ecosystem of
                            interconnected apps and services, built for a
                            decentralized future.
                        </Typography>
                        <div className="center-horizontal mt-2 mb-5 justify-content-center">
                            <Button
                                color={theme.palette.text.primary}
                                size="large"
                                textCase
                                className="mx-2"
                                endIcon={<ArrowForwardRounded />}
                            >
                                Explore BN
                            </Button>
                            <div className="border border-white br-2">
                                <IconButton size="small" className="m-1 p-1">
                                    <PlayArrowRounded />
                                </IconButton>
                            </div>
                        </div>
                        <Typography
                            variant="body2"
                            color="textPrimary"
                            className="mt-5 text-center"
                        >
                            BN crypto token is NOW available.{' '}
                            <a href="" className="alt">
                                <b>Click here to buy</b>
                            </a>
                        </Typography>
                    </DarkThemeOnly>
                </Grid>
            </Container>
        </Grid>
    );
}
