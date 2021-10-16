import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Avatar, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import '../../../css/marquee.css';

export default function SponsorsSection() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,bitcoin-cash,bitcoin-cash-sv,litecoin,eos,tether,binancecoin,cardano,tezos,ethereum-classic,stellar,monero,tron,dash,chainlink,okb,iota,leo-token&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        )
            .then((response) => response.json())
            .then((data) => {
                setCoins(data);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    return (
        <Container>
            <Grid
                style={{ maxHeight: '100%' }}
                container
                item
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {!coins.length && !error && (
                    <Grid item xs={1}>
                        <div className="my-5">Loading</div>
                    </Grid>
                )}
                {!coins.length && error && (
                    <div className="my-5">Nothing Here</div>
                )}
                <div className="marquee my-2">
                    <Grid
                        container
                        direction="row"
                        wrap="nowrap"
                        className={' marquee_widget'}
                    >
                        <Grid
                            container
                            item
                            className={' marquee_widget_content'}
                            wrap="nowrap"
                            direction="row"
                        >
                            {!!coins.length &&
                                !error &&
                                coins.map((coin) => (
                                    <Coin key={coin.id} coin={coin} />
                                ))}
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Container>
    );
}

function Coin({ coin }) {
    const classes = useStyles();
    let price_change_class = classes.positive_price;

    if (coin.price_change_percentage_24h < 0) {
        price_change_class = classes.negative_price;
    }
    return (
        <Grid
            container
            xs={5}
            style={{ margin: '0 15px' }}
            item
            alignItems="center"
            justify="center"
            direction="column"
        >
            <Avatar
                style={{ width: '30px', height: '30px' }}
                alt={coin.id}
                src={coin.image}
            />
            <Typography
                color="textPrimary"
                align="center"
                variant="body1"
                className={classes.price_marquee_coin_symbol}
            >
                {coin.symbol}
            </Typography>
            <Typography
                align="center"
                variant="caption"
                className={price_change_class}
            >
                {Math.round(
                    (coin.price_change_percentage_24h + Number.EPSILON) * 100
                ) / 100}
                {coin.price_change_percentage_24h > 0 ? (
                    <ArrowUpward />
                ) : (
                    <ArrowDownward />
                )}
            </Typography>
        </Grid>
    );
}

const useStyles = makeStyles({
    price_marquee_coin_symbol: {
        textTransform: 'uppercase',
        fontSize: '.9em !important',
        fontWeight: 'bold',
    },
    negative_price: {
        color: 'red !important',
        fontWeight: 'bold',
        minWidth: '48px',
        '& .MuiSvgIcon-root': {
            fontSize: '1.1em',
        },
    },
    positive_price: {
        color: '#0f0 !important',
        fontWeight: 'bold',
        minWidth: '48px',
        '& .MuiSvgIcon-root': {
            fontSize: '1.1em',
        },
    },
});
