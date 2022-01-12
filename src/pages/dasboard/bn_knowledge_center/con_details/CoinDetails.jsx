import {
    ArrowDropDown,
    ArrowDropUp,
    Facebook,
    GitHub,
    LinkOutlined,
    Reddit,
    Telegram,
    Twitter,
} from '@mui/icons-material';
import {
    Avatar,
    Breadcrumbs,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import Screen from '../../../../components/Screen';
import { fetchCryptoCoinDetails } from '../../../../store/actions/cryptoActions';
import CoinDetailsTabPanel from './CoinDetailsTabPanel';

export default function CoinDetails({ match }) {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);

    const coin_id = match.params.id;
    const coinDetail = state?.crypto?.cryptoDetail[coin_id] || null;

    useEffect(() => {
        dispatch(fetchCryptoCoinDetails(coin_id));
    }, [coin_id, dispatch]);

    return (
        <Screen>
            <Container maxWidth="lg">
                {/*Links to menus and coins*/}
                <Breadcrumbs aria-label="breadcrumb" className="m-3">
                    <Link
                        to="/knowledge_center/cryptocurrencies"
                        underline="hover"
                        color="inherit"
                        href="/"
                    >
                        CryptoCurrencies
                    </Link>
                    <Typography>{coinDetail?.name}</Typography>
                </Breadcrumbs>

                {/*Coin Details*/}
                {coinDetail && (
                    <>
                        <div>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={8} lg={7}>
                                    <Grid container>
                                        <Grid
                                            className="mt-4"
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                        >
                                            <div className="">
                                                <div className="d-flex align-items-center">
                                                    <Avatar
                                                        className="m-1 me-2"
                                                        src={
                                                            coinDetail?.image
                                                                ?.small
                                                        }
                                                    />
                                                    <Typography
                                                        component="span"
                                                        color="textPrimary"
                                                    >
                                                        {coinDetail?.name}{' '}
                                                        <span
                                                            className={
                                                                'text-uppercase'
                                                            }
                                                        >
                                                            (
                                                            {coinDetail?.symbol}
                                                            )
                                                        </span>
                                                    </Typography>
                                                    <Typography
                                                        color="textPrimary"
                                                        component="div"
                                                        className="bg-success px-2 mx-1 br-1"
                                                    >
                                                        #
                                                        {
                                                            coinDetail?.coingecko_rank
                                                        }
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography
                                                        color="textPrimary"
                                                        component="div"
                                                        className="d-flex align-items-center mt-2"
                                                    >
                                                        <span>
                                                            $
                                                            {coinDetail?.market_data?.current_price?.usd?.toLocaleString()}{' '}
                                                        </span>
                                                        <span
                                                            className={
                                                                coinDetail
                                                                    ?.market_data
                                                                    ?.market_cap_change_percentage_24h >
                                                                0
                                                                    ? 'text-success ms-2'
                                                                    : 'text-danger ms-2'
                                                            }
                                                        >
                                                            {coinDetail
                                                                ?.market_data
                                                                ?.market_cap_change_percentage_24h >
                                                            0 ? (
                                                                <ArrowDropUp />
                                                            ) : (
                                                                <ArrowDropDown />
                                                            )}
                                                            {
                                                                coinDetail
                                                                    ?.market_data
                                                                    ?.market_cap_change_percentage_24h
                                                            }
                                                            %
                                                        </span>
                                                    </Typography>

                                                    <Button
                                                        className="me-2 my-1"
                                                        size="small"
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        Coin
                                                    </Button>
                                                    <Button
                                                        className="me-2 my-1"
                                                        size="small"
                                                        variant="contained"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                    >
                                                        On 2,267,548 watchlists
                                                    </Button>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid
                                            className="mt-4 px-2"
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                        >
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography color="textPrimary">
                                                        Price Change 24hrs
                                                    </Typography>
                                                    <div className="text-success mb-2">
                                                        $
                                                        {coinDetail?.market_data?.price_change_24h_in_currency?.usd?.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                    <Typography color="textPrimary">
                                                        Circulating Supply
                                                    </Typography>
                                                    <div className="text-success">
                                                        $
                                                        {coinDetail?.market_data?.circulating_supply?.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography color="textPrimary">
                                                        Market Cap
                                                    </Typography>
                                                    <div className="text-success mb-2">
                                                        $
                                                        {coinDetail?.market_data?.market_cap_change_24h_in_currency?.usd?.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                    <Typography color="textPrimary">
                                                        Total Supply
                                                    </Typography>
                                                    <div className="text-success">
                                                        $
                                                        {coinDetail?.market_data?.total_supply?.toFixed(
                                                            2
                                                        )}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    className="mt-4"
                                    item
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={5}
                                >
                                    {/* <h4>Info:</h4> */}
                                    <div>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <strong className="text-secondary">
                                                    Website
                                                </strong>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Button
                                                    startIcon={<LinkOutlined />}
                                                    className="me-2 my-1 text-lowercase"
                                                    variant="contained"
                                                    size="small"
                                                    style={custom.buttonStyle}
                                                    onClick={() => {
                                                        window.open(
                                                            coinDetail?.links
                                                                ?.homepage[0],
                                                            '_blank'
                                                        );
                                                    }}
                                                >
                                                    {coinDetail?.links?.homepage[0]
                                                        ?.slice(8)
                                                        .slice(
                                                            0,
                                                            coinDetail?.links?.homepage[0]
                                                                ?.slice(8)
                                                                .search('/')
                                                        )}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <strong className="text-secondary w-25">
                                                    Explorer
                                                </strong>
                                            </Grid>
                                            <Grid item xs={9}>
                                                {coinDetail?.links?.blockchain_site?.map(
                                                    (site) => (
                                                        <div
                                                            key={site}
                                                            className="d-inline"
                                                        >
                                                            {site && (
                                                                <Button
                                                                    className="me-2 my-1 text-lowercase"
                                                                    variant="contained"
                                                                    size="small"
                                                                    style={
                                                                        custom.buttonStyle
                                                                    }
                                                                    onClick={() => {
                                                                        window.open(
                                                                            site,
                                                                            '_blank'
                                                                        );
                                                                    }}
                                                                >
                                                                    {site
                                                                        ?.slice(
                                                                            8
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            site
                                                                                ?.slice(
                                                                                    8
                                                                                )
                                                                                .search(
                                                                                    '/'
                                                                                )
                                                                        )}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <strong className="text-secondary">
                                                    Community
                                                </strong>
                                            </Grid>
                                            <Grid item xs={9}>
                                                {coinDetail?.links
                                                    ?.facebook_username && (
                                                    <Button
                                                        startIcon={<Facebook />}
                                                        className="me-2 my-1"
                                                        variant="contained"
                                                        size="small"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                        onClick={() => {
                                                            window.open(
                                                                'https://facebook.com/' +
                                                                    coinDetail
                                                                        ?.links
                                                                        ?.facebook_username,
                                                                '_blank'
                                                            );
                                                        }}
                                                    >
                                                        Facebook
                                                    </Button>
                                                )}
                                                {coinDetail?.links
                                                    ?.twitter_screen_name && (
                                                    <Button
                                                        startIcon={<Twitter />}
                                                        className="me-2 my-1"
                                                        variant="contained"
                                                        size="small"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                        onClick={() => {
                                                            window.open(
                                                                'https://twitter.com/' +
                                                                    coinDetail
                                                                        ?.links
                                                                        ?.twitter_screen_name,
                                                                '_blank'
                                                            );
                                                        }}
                                                    >
                                                        Twitter
                                                    </Button>
                                                )}
                                                {coinDetail?.links
                                                    ?.telegram_channel_identifier && (
                                                    <Button
                                                        startIcon={<Telegram />}
                                                        className="me-2 my-1"
                                                        variant="contained"
                                                        size="small"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                        onClick={() => {
                                                            window.open(
                                                                'https://t.me/' +
                                                                    coinDetail
                                                                        ?.links
                                                                        ?.telegram_channel_identifier,
                                                                '_blank'
                                                            );
                                                        }}
                                                    >
                                                        Telegram
                                                    </Button>
                                                )}
                                                {coinDetail?.links
                                                    ?.subreddit_url && (
                                                    <Button
                                                        startIcon={<Reddit />}
                                                        className="me-2 my-1"
                                                        variant="contained"
                                                        size="small"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                        onClick={() => {
                                                            window.open(
                                                                coinDetail
                                                                    ?.links
                                                                    ?.subreddit_url,
                                                                '_blank'
                                                            );
                                                        }}
                                                    >
                                                        Reddit
                                                    </Button>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <div>
                                        {' '}
                                        {coinDetail?.links?.repos_url
                                            ?.github[0] && (
                                            <Grid container>
                                                <Grid item xs={3}>
                                                    <strong className="text-secondary">
                                                        Source Code
                                                    </strong>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Button
                                                        startIcon={<GitHub />}
                                                        className="me-2 my-1"
                                                        variant="contained"
                                                        size="small"
                                                        style={
                                                            custom.buttonStyle
                                                        }
                                                        onClick={() => {
                                                            window.open(
                                                                coinDetail
                                                                    ?.links
                                                                    ?.repos_url
                                                                    ?.github[0],
                                                                '_blank'
                                                            );
                                                        }}
                                                    >
                                                        Github
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </div>

                                    <div>
                                        <Grid container>
                                            <Grid item xs={3}>
                                                <strong className="text-secondary">
                                                    Tags
                                                </strong>
                                            </Grid>
                                            <Grid item xs={9}>
                                                {coinDetail?.categories?.map(
                                                    (category) => (
                                                        <div
                                                            key={category}
                                                            className="d-inline"
                                                        >
                                                            {category && (
                                                                <Button
                                                                    className="me-2 my-1"
                                                                    variant="contained"
                                                                    size="small"
                                                                    style={
                                                                        custom.buttonStyle
                                                                    }
                                                                >
                                                                    {category}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <CoinDetailsTabPanel coinDetail={coinDetail} />
                    </>
                )}
            </Container>
        </Screen>
    );
}

const custom = {
    darkTransparent: {
        backgroundColor: 'rgb(68 63 63 / 50%)',
        text: '#fff',
        height: '10px',
        borderRadius: '5px',
        margin: '5px',
        padding: '0.5px 0.5px',
    },
    buttonStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        backgroundColor: '#333333',
        margin: '1px 1px 1px 0',
        borderRadius: '5px',
    },
    greenBg: {
        backgroundColor: 'rgb(16 150 16)',
        text: '#fff',
        height: '10px',
        borderRadius: '5px',
        padding: '5px',
        margin: '2px',
    },
    verticalLine: {
        borderLeft: '2px solid green',
        height: '150px',
        marginTop: '25px',
    },
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
};
