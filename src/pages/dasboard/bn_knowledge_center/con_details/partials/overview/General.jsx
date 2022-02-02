import { useTheme } from '@emotion/react';
import { Fireplace } from '@mui/icons-material';
import {
    Card,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Chartjs from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchGeneralTable,
    fetchTrendingTable,
} from '../../../../../../store/actions/cryptoActions';
import coinGecko from '../../../../../../store/apis/coinGecko';
// import CoinChart from '../../../bn_charts/CoinChart';
import {
    //  buttonData,
    chipLabels,
    GeneralButton,
} from '../utils/GeneralButtons';
import { convertDate, volumePercentage } from '../utils/utilities';

export default function General({ coinDetail }) {
    const [activeButton, setActiveButton] = useState(0);
    const [chartDuration, setChartDuration] = useState('day');
    const [coinChartData, setCoinChartData] = useState({});

    const chartRef = useRef(null);

    // const [coinFeature, setCoinFeature] = useState('price');
    // const [showLess, setShowLess] = useState(true);

    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const rows = state.crypto?.generalTable;
    const trending = state.crypto?.trendingTable;

    const formatChartData = (data) => {
        return data.map((el) => {
            return {
                x: el[0],
                y: el[1].toFixed(2),
            };
        });
    };

    const fetchCoinChartData = useCallback(async () => {
        const [day, week, month, year] = await Promise.all([
            coinGecko.get(`/coins/${coinDetail?.id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '1',
                },
            }),
            coinGecko.get(`/coins/${coinDetail?.id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '7',
                },
            }),
            coinGecko.get(`/coins/${coinDetail?.id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '30',
                },
            }),
            coinGecko.get(`/coins/${coinDetail?.id}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '365',
                },
            }),
        ]).catch(() => {
            // console.log('promse err: ', err);
        });

        setCoinChartData({
            day: formatChartData(day.data.prices),
            week: formatChartData(week.data.prices),
            month: formatChartData(month.data.prices),
            year: formatChartData(year.data.prices),
        });
    }, [coinDetail?.id]);

    // console.log('qwerty', coinChartData);

    // const coinData = coinDetail?.market_data?.sparkline_7d?.price;

    useEffect(() => {
        dispatch(fetchGeneralTable());
        dispatch(fetchTrendingTable());
        fetchCoinChartData();
    }, [dispatch, fetchCoinChartData]);

    useEffect(() => {
        const chartInstance = new Chartjs(chartRef.current, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'price in USD',
                        data: coinChartData[chartDuration],

                        backgroundColor: 'rgba(174, 385, 194,0.5)',
                        borderColor: 'rgba(174, 385, 194,0.5)',
                        borderWidth: 1,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                animation: {
                    duration: 2000,
                },
                scales: {
                    xAxes: {
                        type: 'time',
                        distribution: 'linear',
                    },
                },
                maintainAspectRatio: false,
                responsive: true,
            },
        });

        return () => {
            chartInstance?.destroy();
        };
    }, [chartDuration, coinChartData, coinChartData.day]);

    const CoinDescription = () => {
        const description = coinDetail?.description?.en;

        return (
            <>
                {description?.split('\n')?.map((c, idx) => (
                    <p
                        key={idx}
                        className="text-justify"
                        dangerouslySetInnerHTML={{ __html: c }}
                    />
                ))}
            </>
        );
    };

    return (
        <>
            <Typography color="textPrimary" component="div">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <div className={'my-3'}>
                            <div className={'d-flex justify-content-between'}>
                                <h4>
                                    {`${
                                        coinDetail?.name
                                    } ( ${coinDetail?.symbol?.toUpperCase()} )`}{' '}
                                    Price Chart
                                </h4>
                                {/* <div>
                                    <Fullscreen className={'m-1'} />
                                    <MoreHoriz className={'m-1'} />
                                </div> */}
                            </div>

                            <div className={'d-flex justify-content-between'}>
                                <Card>
                                    {/* <div className={'m-1'}>
                                        {buttonData.map((item, index) => (
                                            <GeneralButton
                                                key={item.value}
                                                id={index}
                                                value={item.value}
                                                name={item.name}
                                                setActiveButton={(val) =>
                                                    setActiveButton(val)
                                                }
                                                // setActiveCoinFeature={(val) =>
                                                //     setCoinFeature(val)
                                                // }
                                                active={activeButton === index}
                                            />
                                        ))}
                                    </div> */}
                                </Card>
                                <div style={{ width: 20, height: 10 }} />
                                <Card>
                                    <div className={'m-1'}>
                                        {chipLabels.map((item, index) => (
                                            <GeneralButton
                                                key={item.value}
                                                id={index}
                                                value={item.value}
                                                name={item.name}
                                                setActiveButton={(val) =>
                                                    setActiveButton(val)
                                                }
                                                setChartDuration={(val) => {
                                                    setChartDuration(val);
                                                }}
                                                // setActiveCoinFeature={(val) =>
                                                //     setCoinFeature(val)
                                                // }
                                                active={activeButton === index}
                                            />
                                        ))}
                                        {/* <DateRange /> */}
                                    </div>
                                </Card>
                            </div>

                            <div className={'mt-2'}>
                                <Card>
                                    {/* {(!process.env.NODE_ENV ||
                                        process.env.NODE_ENV ===
                                            'development') && (
                                        <CoinChart
                                            coin={'Qwsogvtv82FCd'}
                                            time={chartDuration}
                                            coinChartData={coinChartData}
                                        />
                                    )} */}

                                    <canvas
                                        ref={chartRef}
                                        // id="myChart"
                                        width={'100%'}
                                        height={300}
                                    ></canvas>
                                </Card>
                                {/* <div className={'d-flex justify-content-start'}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="BTC"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="USD"
                                    />
                                </div> */}
                            </div>
                        </div>
                        <div className={'mt-5'}>
                            <h2>About {coinDetail?.name}</h2>
                            <hr />
                            <h5>
                                What is {coinDetail?.name}
                                <span className={'text-uppercase'}>
                                    ({coinDetail?.symbol})
                                </span>
                            </h5>
                            <CoinDescription />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <>
                            {/* <Card>
                            <div className={'m-2'}>
                                <h4>BTC to USD Converter</h4>
                                <div className="my-1">
                                    <div className="input-group">
                                        <div className="input-group-prepend w-25">
                                            <div className="input-group-text bg-black">
                                                <span className={'mt-2'}>
                                                    BTC
                                                    </span>
                                            </div>
                                        </div>
                                        <input
                                        type="number"
                                        className="form-control"
                                        />
                                        </div>
                                        </div>
                                        <div className={'text-center display-5'}>
                                        <CompareArrows />
                                        </div>
                                        <Typography
                                        color="textPrimary"
                                        className="my-1"
                                        fontSize={10}
                                        component="div"
                                        >
                                        <div className="input-group">
                                        <div className="input-group-prepend w-25">
                                            <div className="input-group-text bg-black">
                                                <span className={'mt-2'}>
                                                    USD
                                                    <ArrowDropDown />
                                                </span>
                                            </div>
                                        </div>
                                        <select
                                            defaultValue="1"
                                            className="form-control"
                                        >
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </Typography>
                            </div>
                        </Card> */}
                        </>
                        <Card className={'mt-2'}>
                            <div className={'m-3'}>
                                <h5 className={'mt-2 mb-4   '}>
                                    {coinDetail?.symbol?.toUpperCase()} Price
                                    and Market Stats
                                </h5>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>
                                            {coinDetail?.symbol?.toUpperCase()}{' '}
                                            Price
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.current_price?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>Market Cap</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.market_cap?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>
                                            Market Cap Change (24Hrs)
                                        </strong>
                                    </p>
                                    <p>
                                        <strong>
                                            {
                                                coinDetail?.market_data
                                                    ?.market_cap_change_percentage_24h
                                            }
                                            %
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>Total Volume</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.total_volume?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>Volume / Market Cap</strong>
                                    </p>
                                    <p>
                                        <strong>0.0329</strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>High 24h</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.high_24h?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>Low 24h</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.low_24h?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>Market Cap Rank</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            #
                                            {
                                                coinDetail?.market_data
                                                    ?.market_cap_rank
                                            }
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>All-Time High</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.ath?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p className={'text-secondary'}>
                                        <strong>All-Time Low</strong>
                                    </p>
                                    <p>
                                        <strong>
                                            $
                                            {coinDetail?.market_data?.atl?.usd?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className={'mt-2'}>
                            <div className={'m-3'}>
                                <h5 className={'mt-2 mb-4'}>
                                    Trending Coins and Tokens <Fireplace />
                                </h5>
                                {trending?.map(
                                    ({
                                        item: {
                                            id,
                                            small,
                                            market_cap_rank,
                                            name,
                                            symbol,
                                            thumb,
                                        },
                                    }) => (
                                        <div
                                            key={id}
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
                                        >
                                            <img
                                                height={'25px'}
                                                src={thumb || small}
                                                alt={'coin'}
                                            />
                                            <p>
                                                {name} ({symbol?.toUpperCase()})
                                            </p>
                                            <div>
                                                <Typography className="px-1 br-1 bg-success">
                                                    #{market_cap_rank}
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Typography>

            {/*Bitcoin Market*/}
            {rows?.length > 0 && (
                <Typography
                    color="textPrimary"
                    className={'row mt-3'}
                    component="div"
                >
                    <h4>Bitcoin Market</h4>
                    <hr />
                    <TableContainer>
                        <Table aria-label="caption table">
                            <TableHead>
                                <TableRow
                                    style={{
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? '#3e4041'
                                                : '#eeeeee',
                                    }}
                                >
                                    <TableCell>
                                        <strong>#</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Source</strong>
                                    </TableCell>
                                    <TableCell />
                                    <TableCell>
                                        <strong>Pairs</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Price</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Volume</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Volume % </strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Updated</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, id) => (
                                    <TableRow key={id}>
                                        <TableCell>{id + 1}</TableCell>
                                        <TableCell>
                                            <img
                                                src={row.image}
                                                alt={'coin image'}
                                                height="25px"
                                            />
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell
                                            className={
                                                'text-primary text-uppercase'
                                            }
                                        >
                                            {row.symbol}
                                        </TableCell>
                                        <TableCell>
                                            {row.current_price}
                                        </TableCell>
                                        <TableCell>
                                            {row.total_volume}
                                        </TableCell>
                                        <TableCell>
                                            {volumePercentage(
                                                row.total_supply,
                                                row.total_volume
                                            )}
                                            %
                                        </TableCell>
                                        <TableCell>
                                            {convertDate(row.atl_date)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <div className="mt-3 mb-2">
                        <Button variant="text" textCase size="small">
                            See All Markets
                        </Button>
                    </div> */}
                </Typography>
            )}
            <>
                {/*Bitcoin News*/}
                {/* <Typography
                    color={'textPrimary'}
                    className={'row mt-3'}
                    component="div"
                >
                   
                    <section className={'d-flex justify-content-between'}>
                        <h4>Bitcoin News</h4>
                        <div>
                            <a className={'text-primary'}>
                                Read More <ArrowForward />
                            </a>
                        </div>
                    </section>
                    <hr />
                    <section className={'row'}>
                        <div className={'col-sm-12 col-md-5 col-lg-5'}>
                            <section className={'m-3'}>
                                <img
                                    height={400}
                                    src={
                                        'https://cdn.decrypt.co/wp-content/uploads/2020/11/axie-infinity-game-gID_1.png'
                                    }
                                    alt={'news'}
                                    className="img-thumbnail"
                                />
                            </section>
                            <section className={'m-3'}>
                                <div className={'m-1'}>
                                    <h4>
                                        Axie Infinity hits a new ATH at $155
                                        while Bitcoin bulls aim for $50K
                                    </h4>
                                </div>
                                <div className={'m-1'}>
                                    <strong className={'text-secondary'}>
                                        AXS, CVP and POLS lead altcoins higher
                                        while Bitcoin bull search for a way to
                                        reclaim the $50,000 level.
                                    </strong>
                                    <a className={'text-primary'}>
                                        (Read More...)
                                    </a>
                                </div>
                                <div className={'m-1'}>
                                    <strong>
                                        <small>Coingape . 5 hours ago</small>
                                    </strong>
                                </div>
                            </section>
                        </div>
                        <div className={'col-sm-12 col-md-7 col-lg-7'}>
                            <div className={'row mt-sm-3'}>
                                <div className={'col-4'}>
                                    <section>
                                        <img
                                            height={200}
                                            src={
                                                'https://cent.imgix.net/e711f6f5-cb69-4632-84f8-9a5470a2d249.png?fit=clip&w=412&h=732'
                                            }
                                            alt={'news'}
                                            className="img-thumbnail"
                                        />
                                    </section>
                                </div>
                                <div className={'col-8'}>
                                    <section className={'m-md-3 m-lg-3 m-sm-0'}>
                                        <div className={'m-1'}>
                                            <h4>
                                                Axie Infinity hits a new ATH at
                                                $155 while Bitcoin bulls aim for
                                                $50K
                                            </h4>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong
                                                className={'text-secondary'}
                                            >
                                                AXS, CVP and POLS lead altcoins
                                                higher while Bitcoin bull search
                                                for a way to reclaim the $50,000
                                                level.
                                            </strong>
                                            <a className={'text-primary'}>
                                                (Read More...)
                                            </a>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong>
                                                <small>
                                                    Coingape . 5 hours ago
                                                </small>
                                            </strong>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-4'}>
                                    <section>
                                        <img
                                            height={200}
                                            src={
                                                'https://cdn.decrypt.co/wp-content/uploads/2020/11/axie-infinity-game-gID_1.png'
                                            }
                                            alt={'news'}
                                            className="img-thumbnail"
                                        />
                                    </section>
                                </div>
                                <div className={'col-8'}>
                                    <section className={'m-md-3 m-lg-3 m-sm-0'}>
                                        <div className={'m-1'}>
                                            <h4>
                                                Axie Infinity hits a new ATH at
                                                $155 while Bitcoin bulls aim for
                                                $50K
                                            </h4>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong
                                                className={'text-secondary'}
                                            >
                                                AXS, CVP and POLS lead altcoins
                                                higher while Bitcoin bull search
                                                for a way to reclaim the $50,000
                                                level.
                                            </strong>
                                            <a className={'text-primary'}>
                                                (Read More...)
                                            </a>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong>
                                                <small>
                                                    Coingape . 5 hours ago
                                                </small>
                                            </strong>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-4'}>
                                    <section>
                                        <img
                                            height={200}
                                            src={
                                                'https://theycb.files.wordpress.com/2020/11/3a15f-05ten9f4x0jgx9dsg.png'
                                            }
                                            alt={'news'}
                                            className="img-thumbnail"
                                        />
                                    </section>
                                </div>
                                <div className={'col-8'}>
                                    <section className={'m-md-3 m-lg-3 m-sm-0'}>
                                        <div className={'m-1'}>
                                            <h4>
                                                Axie Infinity hits a new ATH at
                                                $155 while Bitcoin bulls aim for
                                                $50K
                                            </h4>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong
                                                className={'text-secondary'}
                                            >
                                                AXS, CVP and POLS lead altcoins
                                                higher while Bitcoin bull search
                                                for a way to reclaim the $50,000
                                                level.
                                            </strong>
                                            <a className={'text-primary'}>
                                                (Read More...)
                                            </a>
                                        </div>
                                        <div className={'m-1'}>
                                            <strong>
                                                <small>
                                                    Coingape . 5 hours ago
                                                </small>
                                            </strong>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className={'m-3 d-flex justify-content-center'}>
                            <Button textCase>Read More</Button>
                        </div>
                    </section>
                </Typography> */}
            </>

            <>
                {/*Trending Coins*/}
                {/* <Typography
                    color={'textPrimary'}
                    className={'row mt-3'}
                    component="div"
                >
                    <section className={'d-flex justify-content-between mt-3'}>
                        <h4>Trending Coins</h4>
                        <div>
                            <span className={'text-primary'}>
                                <ArrowBack /> <ArrowForward />
                            </span>
                        </div>
                    </section>
                    <hr />
                    <section className="d-sm-block d-md-flex d-lg-flex mb-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="m-2">
                                <Card style={customOverview.coinsBorder}>
                                    <Typography
                                        variant="caption"
                                        component="div"
                                    >
                                        <div className="float-md-right pt-2 px-2">
                                            <span className="float-end">
                                                Dominance: 4.9%
                                            </span>
                                            <br />

                                            <h6>
                                                <strong>Hedge</strong>
                                            </h6>
                                            <section
                                                className={
                                                    'd-flex justify-content-between'
                                                }
                                            >
                                                <p className={'text-secondary'}>
                                                    $4.07
                                                </p>
                                                <p
                                                    className={
                                                        'bg-danger p-1 br-1'
                                                    }
                                                >
                                                    -2.31%
                                                </p>
                                            </section>
                                        </div>
                                    </Typography>
                                </Card>
                            </div>
                        ))}
                    </section>
                </Typography> */}
            </>
        </>
    );
}
