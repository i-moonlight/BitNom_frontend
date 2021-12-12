import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { Fragment, useRef } from 'react';
import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css'; //
import { Button } from '../../../components/Button';
import GazingCard from './GazingCard';

const CardDeck = ({ coins = [] }) => {
    const carousel = useRef(null);

    return (
        <Fragment>
            <OwlCarousel
                ref={carousel}
                // className="owl-theme"
                options={{
                    loop: true,
                    autoplay: true,
                    center: true,
                    nav: true,
                    responsive: {
                        0: {
                            items: 1,
                        },
                        600: {
                            items: 3,
                        },
                        1000: {
                            items: 3,
                        },
                    },
                }}
                // loop
                // autoplay
                // margin={10}
                // center
                // nav
                // responsive={{
                //     0: {
                //         items: 1,
                //     },
                //     600: {
                //         items: 3,
                //     },
                //     1000: {
                //         items: 3,
                //     },
                // }}
            >
                {coins.slice(0, 20).map((coin) => (
                    <GazingCard
                        key={coin?.id}
                        coin={coin}
                        onNext={() => carousel?.current?.next()}
                        // coin_index={is_back ? 2 : 0}
                        // onDislike={onDislike}
                        // show_back={false}
                    />
                ))}
            </OwlCarousel>
            <Card className="my-5 morph-inner">
                <CardContent>
                    <div className="d-flex justify-content-between">
                        <Stack direction="row" style={{ width: '80%' }}>
                            {coins.slice(0, 20).map((coin) => (
                                <Avatar
                                    className="me-1"
                                    key={coin?.id}
                                    src={coin?.image}
                                    image={coin?.image}
                                />
                            ))}
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Typography>20 items</Typography>
                            <Button textCase className="ms-2">
                                Visit Coin
                            </Button>
                        </Stack>
                    </div>
                </CardContent>
            </Card>
        </Fragment>
    );
};

export default CardDeck;
