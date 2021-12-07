import { Close, Favorite, Forum, Replay } from '@mui/icons-material';
import { Card, Fab, Link } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { Fragment } from 'react';

const GazingCard = ({
    coin = {},
    onLike,
    onDislike,
    coin_index,
    undo,
    show_back,
}) => {
    return (
        <Fragment>
            {coin && (
                <Card
                    className="gazing-card"
                    style={{
                        minHeight: 'calc(51vh - 65px)',
                        marginTop: '5px',
                        zIndex: coin_index,
                    }}
                >
                    <CardContent>
                        <div className="d-flex flex-row justify-content-between mb-3">
                            <button className="btn btn-success">
                                Rank #{coin?.coingecko_rank}
                            </button>
                            {/*<a className="text-primary text-decoration-underline">*/}
                            {/*    Visit Coin*/}
                            {/*</a>*/}
                            <Link
                                href={`/knowledge_center/cryptocurrencies/${coin?.id}`}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'none',
                                }}
                            >
                                Visit Coin
                            </Link>
                        </div>
                        <div className="row">
                            <div className="col">
                                <img
                                    height="100px"
                                    src={coin?.image || coin?.image?.large}
                                    alt="Coin Image"
                                />
                                <p className="mt-1">
                                    <strong>
                                        {coin?.name}
                                        <span
                                            style={{
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            ({coin?.symbol})
                                        </span>
                                    </strong>
                                </p>
                                <a className="btn btn-success mb-2">
                                    <strong>
                                        ${coin.market_data?.current_price.usd}
                                    </strong>
                                </a>
                            </div>
                            <div className="col">
                                <p>
                                    <strong>Price Change 24 hours</strong>
                                </p>
                                <p className="text-danger">
                                    <strong>
                                        {coin.market_data?.price_change_24h}%
                                    </strong>
                                </p>
                                <br />
                                <p>Available Supply</p>
                                <p>{coin.market_data?.max_supply}</p>
                            </div>
                            <div className="col">
                                <p>
                                    <strong>Market Cap</strong>
                                </p>
                                <p className="text-success">
                                    <strong>
                                        ${coin.market_data?.market_cap.usd}
                                    </strong>
                                </p>
                                <br />
                                <p>Total Supply</p>
                                <p>{coin.market_data?.total_supply}</p>
                            </div>
                        </div>
                    </CardContent>

                    <div className="d-flex flex-row justify-content-around m-3">
                        <Fab disabled={!show_back} onClick={undo}>
                            <Replay />
                        </Fab>
                        <Fab>
                            <Close onClick={async () => onDislike(coin.id)} />
                        </Fab>
                        <Fab
                            onClick={async () => onLike(coin.id)}
                            style={{ color: 'green' }}
                        >
                            <Favorite />
                        </Fab>
                        <Fab>
                            <Forum />
                        </Fab>
                    </div>
                </Card>
            )}
        </Fragment>
    );
};

export default GazingCard;
