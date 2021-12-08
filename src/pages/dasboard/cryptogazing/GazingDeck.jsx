import React, { Fragment } from 'react';
import GazingCard from './GazingCard';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { Button } from '../../../components/Button';

const CardDeck = ({
    coins = [],
    coin_index,
    onLike,
    onDislike,
    is_back = false,
    undo = () => null,
    show_back = false,
}) => {
    return (
        <Fragment>
            <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                items={3}
                center
                nav
                // dots
                responsive={{
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 3,
                    },
                    1000: {
                        items: 3,
                    },
                }}
                // height="500"
                // autoHeightClass
            >
                {coins.slice(0, 20).map((coin) => (
                    <GazingCard
                        key={coin?.id}
                        coin={coin}
                        // onLike={onLike}
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
