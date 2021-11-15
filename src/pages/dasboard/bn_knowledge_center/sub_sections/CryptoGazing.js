import { Close, Favorite, Forum, Replay } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import React from 'react';

/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/5/21
 * Time: 1:31 AM
 */

export function CryptoGazing() {
    return (
        <>
            <div className="container col-sm-12 col-md-6 col-lg-6 text-center justify-content-center">
                <Card>
                    <CardContent>
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <button className="btn btn-success">Rank #1</button>
                            <a className="text-primary text-decoration-underline">
                                Visit Coin
                            </a>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img
                                    height="100px"
                                    src={
                                        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
                                    }
                                    alt="Bitcoin Image"
                                />
                                <p className="mt-1">
                                    <strong>Bitcoin (BTC)</strong>
                                </p>
                                <a className="btn btn-success mb-2">
                                    <strong>$44,811,17</strong>
                                </a>
                            </div>
                            <div className="col">
                                <p>
                                    <strong>Price Change 24 hours</strong>
                                </p>
                                <p className="text-danger">
                                    <strong>7.76%</strong>
                                </p>
                                <br />
                                <p>Available Supply</p>
                                <p>18,834,400</p>
                            </div>
                            <div className="col">
                                <p>
                                    <strong>Market Cap</strong>
                                </p>
                                <p className="text-success">
                                    <strong>$300,213,918,809</strong>
                                </p>
                                <br />
                                <p>Total Supply</p>
                                <p>21,000,000</p>
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
        </>
    );
}
