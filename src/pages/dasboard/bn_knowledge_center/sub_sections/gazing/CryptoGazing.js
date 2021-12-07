import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { coinGecko } from './plug';
import GazingDeck from './GazingDeck';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGazingTable } from '../../../../../store/actions/cryptoActions';

export function CryptoGazing() {
    const [cardCoins, setCardCoins] = useState([]);
    const [coinIndex, setCoinIndex] = useState(1);
    const [isBack, setIsBack] = useState(false);
    const [showBack, setShowBack] = useState(false);

    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const coins = state.crypto?.marketTable;

    useEffect(() => {
        dispatch(fetchGazingTable());
    }, [dispatch]);

    // Set initial card coins
    useEffect(() => {
        // setCardCoins(coins);
        // async function selectCardCoins() {
        //     if (!cardCoins.length && coins.length) {
        //         const random = Math.floor(Math.random() * coins.length);
        //         const randomCoins = [...Array(4)].map(
        //             (coin, i) => coins[random + i]?.id
        //         );
        //         try {
        //             const results0 = await coinGecko(
        //                 `https://api.coingecko.com/api/v3/coins/${randomCoins[0]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        //             );
        //             const results1 = await coinGecko(
        //                 `https://api.coingecko.com/api/v3/coins/${randomCoins[1]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        //             );
        //             const results2 = await coinGecko(
        //                 `https://api.coingecko.com/api/v3/coins/${randomCoins[2]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        //             );
        //             const results3 = await coinGecko(
        //                 `https://api.coingecko.com/api/v3/coins/${randomCoins[3]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        //             );
        //             setCardCoins([
        //                 results0?.data,
        //                 results1?.data,
        //                 results2?.data,
        //                 results3?.data,
        //             ]);
        //         } catch (e) {
        //             //
        //         }
        //     }
        // }
        // selectCardCoins().then();
    }, [coins]);

    // onLike
    const onLike = async (id, is_like) => {
        if (isBack) setIsBack(false);
        if (!is_like) setShowBack(true);
        if (showBack && is_like) setShowBack(false);

        const new_coin = coins[Math.floor(Math.random() * coins.length)].id;
        const nextCardCoins = [...cardCoins];
        const prev_index = coinIndex;

        if (coinIndex === 1) setCoinIndex(2);
        if (coinIndex === 2) setCoinIndex(3);
        if (coinIndex === 3) setCoinIndex(1);

        const { data } = await coinGecko(
            `https://api.coingecko.com/api/v3/coins/${new_coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
        );

        nextCardCoins.splice(prev_index, 1, data);
        nextCardCoins.splice(0, 1, cardCoins[prev_index]);
        setCardCoins([...nextCardCoins]);

        // send like mutation to backend.
    };

    const onGoBack = () => {
        setIsBack(true);
        setShowBack(false);
    };

    return (
        <>
            {coins?.length > 0 ? (
                <div className="container col-sm-12 col-md-6 col-lg-6 text-center justify-content-evenly pb-5">
                    <GazingDeck
                        coins={cardCoins}
                        onLike={async (data) => onLike(data, true)}
                        onDislike={async (data) => onLike(data, false)}
                        coin_index={coinIndex}
                        is_back={isBack}
                        undo={onGoBack}
                        show_back={showBack}
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
