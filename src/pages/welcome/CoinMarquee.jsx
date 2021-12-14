import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Avatar, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import '../../css/marquee.css';

export default function CoinMarquee() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,bitcoin-cash,bitcoin-cash-sv,litecoin,eos,tether,binancecoin,cardano,tezos,ethereum-classic,stellar,monero,tron,dash,chainlink,okb,iota,leo-token&order=market_cap_desc&per_page=50&page=1&sparkline=false',
            { signal: abortCont.signal }
        )
            .then((response) => response.json())
            .then((data) => {
                setCoins(data);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            });
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid
                style={{ maxHeight: '100%' }}
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                <div className="marquee my-2 ">
                    <div className="d-flex align-items-center marquee_widget">
                        <div className="my-1 mx-3 d-flex align-items-center marquee_widget_content">
                            {!coins.length && !error && (
                                <div className="my-1 mx-3 d-flex flex-column align-items-center">
                                    <Typography className="p-4">
                                        Loading ...{' '}
                                    </Typography>
                                </div>
                            )}
                            {!coins.length && error && (
                                <div className="my-2 mx-3 d-flex flex-column align-items-center">
                                    <Typography className="p-4">
                                        Err Loading ...{' '}
                                    </Typography>
                                </div>
                            )}
                            {!!coins.length &&
                                !error &&
                                coins.map((coin) => (
                                    <Coin key={coin.id} coin={coin} />
                                ))}
                        </div>
                    </div>
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
        <div className="my-1 mx-3 d-flex flex-column align-items-center">
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
        </div>
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
