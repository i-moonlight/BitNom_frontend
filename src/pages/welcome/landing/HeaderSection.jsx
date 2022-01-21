import { ArrowForwardRounded, PlayArrowRounded } from '@mui/icons-material';
import {
    ButtonBase,
    Container,
    Grid,
    Modal,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import headerBgImg from '../../../assets/landing/img12.png';
import { Button } from '../../../components/Button';
import DarkThemeOnly from '../../../utilities/DarkThemeOnly';

export default function HeaderSection() {
    const [videoOpen, setVideoOpen] = useState(false);

    const theme = useTheme();
    const history = useHistory();

    return (
        <>
            <Grid
                className="py-5"
                style={{
                    backgroundColor: theme.palette.background.landing,
                }}
            >
                <Container container component={Grid} maxWidth="md">
                    <Grid
                        className="py-5 px-3"
                        style={{
                            backgroundImage: `url('${headerBgImg}')`,
                            backgroundSize: 'cover',
                            borderRadius: 30,
                            // padding: '5%',
                            backgroundColor:
                                theme.palette.mode == 'light'
                                    ? '#ddd'
                                    : '#232323',
                        }}
                        item
                        lg={12}
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
                                    onClick={() => {
                                        history.push('/auth/signup');
                                    }}
                                >
                                    Explore BN
                                </Button>
                                <div className="border border-white br-2 c-pointer text-white">
                                    <ButtonBase
                                        onClick={() => setVideoOpen(true)}
                                    >
                                        <PlayArrowRounded
                                            fontSize="large"
                                            className="m-1 p-1"
                                        />
                                    </ButtonBase>
                                </div>
                            </div>
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                className="mt-5 text-center"
                            >
                                BN crypto token is NOW available.{' '}
                                <a
                                    href="https://latoken.com/exchange/BN_USDT"
                                    className="alt"
                                >
                                    <b>
                                        Click here to buy
                                        {(!process.env.NODE_ENV ||
                                            process.env.NODE_ENV ===
                                                'development') &&
                                            '.'}
                                    </b>
                                </a>
                            </Typography>
                        </DarkThemeOnly>
                    </Grid>
                </Container>
            </Grid>
            <Modal
                className="h-100"
                open={videoOpen}
                onClose={() => setVideoOpen(false)}
            >
                <Container className="h-75" maxWidth="lg">
                    <div
                        className="d-flex justify-content-center align-items-center bg-success m-0 p-0 h-100"
                        // style={{
                        //     height: '80vh',
                        // }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/fwUwnItGd3g"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Container>
            </Modal>
        </>
    );
}
