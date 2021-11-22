/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/22/21
 * Time: 5:21 PM
 */
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import {Fragment} from 'react';
import {Close, Favorite, Forum,  Replay} from '@mui/icons-material';
import {Grid, useTheme,  Paper, Fab, Link} from '@mui/material';


const GazingCard = (
    {
        coin = {},
        onLike,
        onDislike,
        coin_index,
        undo,
        show_back
    }
) =>
{
    const theme = useTheme();
    return (
        <Fragment>
            {coin &&
                <Grid
                    container
                    item
                    style={{
                        maxWidth: theme.breakpoints.values.sm,
                        minHeight: 'calc(51vh - 65px)',
                        marginTop: '5px',
                        position: 'absolute',
                        zIndex: coin_index,
                    }}
                    component={Paper}
                    xs={12}
                    spacing={2}
                >
                    <Grid>
                        <CardContent>
                            <div className="d-flex flex-row justify-content-between mb-3">
                                <button className="btn btn-success">
                                    Rank #{coin?.coingecko_rank}
                                </button>
                                {/*<a className="text-primary text-decoration-underline">*/}
                                {/*    Visit Coin*/}
                                {/*</a>*/}
                                   <Link
                                       href={`/knowledge_center/cryptocurrency/${coin?.id}`}
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
                                        src={coin.image?.large }
                                        alt="Bitcoin Image"
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
                                            $
                                            {
                                                coin.market_data?.current_price.usd
                                            }
                                        </strong>
                                    </a>
                                </div>
                                <div className="col">
                                    <p>
                                        <strong>Price Change 24 hours</strong>
                                    </p>
                                    <p className="text-danger">
                                        <strong>
                                            {
                                                coin.market_data?.price_change_24h
                                            }
                                            %
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
                                            $
                                            {
                                                coin.market_data?.market_cap.usd
                                            }
                                        </strong>
                                    </p>
                                    <br />
                                    <p>Total Supply</p>
                                    <p>
                                        {coin.market_data?.total_supply}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Grid>
                    <Grid className="mt-2 col-12">
                        <div className="d-flex flex-row justify-content-around m-3">
                            <Fab disabled={!show_back} onClick={undo}>
                                <Replay />
                            </Fab>
                            <Fab>
                                <Close
                                    onClick={async () => onDislike(coin.id)}
                                />
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
                    </Grid>
                </Grid>}
        </Fragment>
    );
};

export default GazingCard;
