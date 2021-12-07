import React, { Fragment } from 'react';
import GazingCard from './GazingCard';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

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
                // className="owl-theme"
                loop
                margin={30}
                items={3}
                center
                nav
                dots
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
                <GazingCard
                    coin={coins.length ? coins[0] : {}}
                    onLike={onLike}
                    coin_index={is_back ? 2 : 0}
                    onDislike={onDislike}
                    show_back={false}
                />
                <GazingCard
                    coin={coins.length ? coins[2] : {}}
                    onLike={onLike}
                    coin_index={coin_index === 2 ? 1 : 0}
                    onDislike={onDislike}
                    show_back={show_back}
                    undo={undo}
                />
                <GazingCard
                    coin={coins.length ? coins[1] : {}}
                    onLike={onLike}
                    coin_index={coin_index === 1 ? 1 : 0}
                    onDislike={onDislike}
                    undo={undo}
                    show_back={show_back}
                />
                <GazingCard
                    coin={coins.length ? coins[3] : {}}
                    onLike={onLike}
                    coin_index={coin_index === 3 ? 1 : 0}
                    onDislike={onDislike}
                    undo={undo}
                    show_back={show_back}
                />
            </OwlCarousel>
        </Fragment>
    );
};

export default CardDeck;
