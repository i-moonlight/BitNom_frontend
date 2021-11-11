import {Card, CardContent, CircularProgress} from '@mui/material';
import { Close, Favorite, Forum, Replay } from '@mui/icons-material';
import React, {useEffect, useState} from 'react';

/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/5/21
 * Time: 1:31 AM
 */

export function CryptoGazing() {
    const [coinDetails, getCoin] = useState([]);
    const [coinIsLoaded, checkLoadedCoin] = useState(false);

    useEffect(() =>
    {
        const coin_list = `https://api.coingecko.com/api/v3/coins/list?include_platform=false`;
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                getCoin(data);
                console.log(data);
                checkLoadedCoin(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {coinIsLoaded ? (
                <div className="container col-sm-12 col-md-6 col-lg-6 text-center justify-content-center">
                    <Card>
                        <CardContent>
                            <div className="d-flex flex-row justify-content-between mb-3">
                                <button className="btn btn-success">Rank #{coinDetails.coingecko_rank}</button>
                                <a className="text-primary text-decoration-underline">
                                    Visit Coin
                                </a>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <img
                                        height="100px"
                                        src={coinDetails.image.large}
                                        alt="Bitcoin Image"
                                    />
                                    <p className="mt-1">
                                        <strong>{coinDetails.name} <span style={{textTransform: 'uppercase'}}>({coinDetails.symbol})</span></strong>
                                    </p>
                                    <a className="btn btn-success mb-2">
                                        <strong>${coinDetails.market_data.current_price.usd}</strong>
                                    </a>
                                </div>
                                <div className="col">
                                    <p>
                                        <strong>Price Change 24 hours</strong>
                                    </p>
                                    <p className="text-danger">
                                        <strong>{coinDetails.market_data.price_change_24h}%</strong>
                                    </p>
                                    <br />
                                    <p>Available Supply</p>
                                    <p>{coinDetails.market_data.max_supply}</p>
                                </div>
                                <div className="col">
                                    <p>
                                        <strong>Market Cap</strong>
                                    </p>
                                    <p className="text-success">
                                        <strong>${coinDetails.market_data.market_cap.usd}</strong>
                                    </p>
                                    <br />
                                    <p>Total Supply</p>
                                    <p>{coinDetails.market_data.total_supply}</p>
                                </div>
                            </div>
                            <div className="m-2">
                                <img alt="Bitcoin graph" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mt-2 col-12">
                        <div className="d-flex flex-row justify-content-around m-3">
                            <div>
                                <Replay sx={{ color: 'red' }} />
                            </div>
                            <div>
                                <Close />
                            </div>
                            <div>
                                <Favorite />
                            </div>
                            <div>
                                <Forum />
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <Card className={'text-danger text-center'}>
                    <CircularProgress color="secondary" />
                </Card>
            )}
        </>
    );
}
