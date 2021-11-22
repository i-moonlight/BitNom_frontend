import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { coinGecko } from './plug';
import GazingDeck from './GazingDeck';

export function CryptoGazing() {
    const [coins, setCoins] = useState({});
    const [card_coins, setCardCoins] = useState([]);
    const [coinIsLoaded, checkLoadedCoin] = useState(false);

    const [coin_index, setIndex] = useState(1);
    const [is_back, setIsBack] = useState(false);
    const [show_back, setShowBack] = useState(false);

    //Get all coins
    useEffect(() => {
        const abortCont = new AbortController();

        fetch(`https://api.coingecko.com/api/v3/coins/list`, {
            signal: abortCont.signal,
        })
            .then((response) => response.json())
            .then((data) => {
                setCoins(data);
                checkLoadedCoin(true);
            });
    }, []);

    // Set initial card coins
    useEffect(() => {
        async function selectCardCoins() {
            if (!card_coins.length && coins.length) {
                const random = Math.floor(Math.random() * coins.length);
                const r_coins = [...Array(4)].map(
                    (coin, i) => coins[random + i].id
                );

                try {
                    const results0 = await coinGecko(
                        `https://api.coingecko.com/api/v3/coins/${r_coins[0]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
                    );
                    const results1 = await coinGecko(
                        `https://api.coingecko.com/api/v3/coins/${r_coins[1]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
                    );
                    const results2 = await coinGecko(
                        `https://api.coingecko.com/api/v3/coins/${r_coins[2]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
                    );
                    const results3 = await coinGecko(
                        `https://api.coingecko.com/api/v3/coins/${r_coins[3]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
                    );

                    setCardCoins([
                        results0?.data,
                        results1?.data,
                        results2?.data,
                        results3?.data,
                    ]);
                } catch (e) {
                    //
                }
            }
        }
        selectCardCoins().then();
    }, [card_coins, coins]);

    // onLike
    const onLike = async (id, is_like) => {
        if (is_back) setIsBack(false);
        if (!is_like) setShowBack(true);
        if (show_back && is_like) setShowBack(false);

        const new_coin = coins[Math.floor(Math.random() * coins.length)].id;
        const c_coins = [...card_coins];
        const prev_index = coin_index;
        if (coin_index === 1) setIndex(2);
        if (coin_index === 2) setIndex(3);
        if (coin_index === 3) setIndex(1);

        const { data } = await coinGecko(
            `https://api.coingecko.com/api/v3/coins/${new_coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        );
        c_coins.splice(prev_index, 1, data);
        c_coins.splice(0, 1, card_coins[prev_index]);
        setCardCoins([...c_coins]);

        // send like mutation to backend.
    };

    const onGoBack = () => {
        setIsBack(true);
        setShowBack(false);
    };
    return (
        <>
            {coinIsLoaded ? (
                <div className="container col-sm-12 col-md-6 col-lg-6 text-center justify-content-evenly pb-5">
                    <GazingDeck
                        coins={card_coins}
                        onLike={async (data) => onLike(data, true)}
                        onDislike={async (data) => onLike(data, false)}
                        coin_index={coin_index}
                        is_back={is_back}
                        undo={onGoBack}
                        show_back={show_back}
                    />
                </div>
            ) : (
                <div className="container col-sm-12 col-md-6 col-lg-6 text-center justify-content-between pb-5">
                    <Skeleton
                        animation="wave"
                        className="mb-3 br-1"
                        variant="rectangular"
                        height={250}
                    />
                    <Skeleton
                        animation="wave"
                        className="mb-2 br-1"
                        variant="rectangular"
                        height={30}
                    />
                </div>
            )}
        </>
    );
}
