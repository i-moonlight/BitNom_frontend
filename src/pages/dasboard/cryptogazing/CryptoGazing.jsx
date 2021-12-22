import { Container, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../../components/Screen';
import { fetchMarketTable } from '../../../store/actions/cryptoActions';
import GazingDeck from './GazingDeck';

export default function CryptoGazing() {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const coins = state.crypto?.marketTable;

    useEffect(() => {
        dispatch(fetchMarketTable());
    }, [dispatch]);

    // `https://api.coingecko.com/api/v3/coins/${randomCoins[0]}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`

    return (
        <Screen>
            <Container maxWidth="lg" className="py-3">
                <div>
                    {coins?.length > 0 ? (
                        <GazingDeck
                            coins={coins}
                            // onLike={async (data) => onLike(data, true)}
                            // onDislike={async (data) => onLike(data, false)}
                            // coin_index={coinIndex}
                            // is_back={isBack}
                            // undo={onGoBack}
                            // show_back={showBack}
                        />
                    ) : (
                        <div>
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
                </div>
            </Container>
        </Screen>
    );
}
