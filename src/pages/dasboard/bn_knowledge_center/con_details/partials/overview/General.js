import {
    ArrowBack,
    ArrowDropDown,
    ArrowForward,
    CompareArrows,
    DateRange,
    Fireplace,
    Fullscreen,
    KeyboardArrowDown,
    MoreHoriz,
} from '@mui/icons-material';
import {
    Card,
    CardContent,
    Checkbox,
    Chip,
    CircularProgress,
    FormControlLabel,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CoinChart from '../../../bn_charts/CoinChart';
import { buttonData, GeneralButtons } from '../utils/GeneralButtons';
import { customOverview } from '../utils/styles';
import { convertDate, volumePercentage } from '../utils/utilities';

export default function General({ coinDetail }) {
    const [rows, setRows] = useState([]);
    const [rowLoaded, setRowLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [, setActiveCoinFeature] = useState('price');
    const [showLess, setShowLess] = useState(true);
    // const [coinFeature, setActiveCoinFeature] = useState('price');

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=10&sparkline=true`;
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then((response) => response.json())
            .then((data) => {
                setRows(data);
                setRowLoaded(true);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setRowLoaded(true);
                    setError(err);
                }
            });
    }, []);

    // const CoinDescription = () => {
    //     const description = coinDetail?.description?.en;

    //     return (
    //         <>
    //             {description?.split('\n')?.map((c, idx) => (
    //                 <p key={idx} dangerouslySetInnerHTML={{ __html: c }} />
    //             ))}
    //         </>
    //     );
    // };

    const handleClick = () => {
        // eslint-disable-next-line no-console
        console.info('You clicked the Chip.');
    };

    return (
        <>
            <div>
                {/*First row*/}
                <div className={'row mt-3'}>
                    {/*left side card*/}
                    <Typography
                        color="textPrimary"
                        className={'col-sm-12 col-md-8 col-lg-8'}
                    >
                        {/*Bitcoin (BTC) Price Chart*/}
                        <div className={'m-3'}>
                            <div className={'d-flex justify-content-between'}>
                                <h4>
                                    {`${coinDetail?.name} (${coinDetail?.symbol})`}{' '}
                                    Price Chart
                                </h4>
                                <div>
                                    <Fullscreen className={'m-1'} />
                                    <MoreHoriz className={'m-1'} />
                                </div>
                            </div>
                            {/*Chart*/}
                            <div className={'d-flex justify-content-between'}>
                                <Card>
                                    <div className={'m-1'}>
                                        {buttonData.map((item, index) => (
                                            <GeneralButtons
                                                key={item.value}
                                                id={index}
                                                value={item.value}
                                                name={item.name}
                                                setActiveButton={
                                                    setActiveButton
                                                }
                                                setActiveCoinFeature={
                                                    setActiveCoinFeature
                                                }
                                                active={activeButton === index}
                                            />
                                        ))}
                                    </div>
                                </Card>
                                <Card>
                                    <Stack
                                        direction="row"
                                        className={'my-1 mx-1'}
                                        spacing={0.1}
                                    >
                                        <Chip
                                            label="2d"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <Chip
                                            label="1m"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <Chip
                                            label="3m"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <Chip
                                            label="1y"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <Chip
                                            label="YTD"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <Chip
                                            label="ALL"
                                            size={'small'}
                                            className={'mx-1'}
                                            variant="outlined"
                                            onClick={handleClick}
                                        />
                                        <DateRange />
                                    </Stack>
                                </Card>
                            </div>
                            <div className={'mt-2'}>
                                <Card>
                                    <CoinChart />
                                </Card>
                                <div className={'d-flex justify-content-start'}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="BTC"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="USD"
                                    />
                                </div>
                            </div>
                            <Card>
                                <Stack
                                    direction="row"
                                    className={'my-1 mx-1'}
                                    spacing={0.1}
                                >
                                    <Chip
                                        label="1d"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant={'outlined'}
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="2d"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="1m"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="3m"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="1y"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="YTD"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <Chip
                                        label="ALL"
                                        size={'small'}
                                        className={'mx-1'}
                                        variant="outlined"
                                        onClick={handleClick}
                                    />
                                    <DateRange />
                                </Stack>
                            </Card>
                        </div>
                        <div className={'mt-2'}>
                            <Card>
                                {/* <CoinChart
                                    coinFeature={coinFeature}
                                    coinDetail={coinDetail}
                                /> */}
                            </Card>
                            <div className={'d-flex justify-content-start'}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="BTC"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="USD"
                                />
                            </div>
                        </div>
                    </Typography>
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
                    {/* <CoinDescription /> */}
                    <a
                        href={'#'}
                        className={'text-primary'}
                        onClick={setShowLess(!showLess)}
                    >
                        Read More <KeyboardArrowDown />
                    </a>
                </div>

                {/* <Typography component='div'> */}

                <div className={'mt-5'}>
                    <h2>About Bitcoin</h2>
                    <hr />
                    <h5>What is Bitcoin (BTC)</h5>
                    <p>
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Corporis dicta dolorem eum maxime neque odit
                            optio placeat recusandae rem rerum? Alias doloremque
                            dolorum eos ratione reprehenderit unde vel voluptate
                            voluptatem.
                        </span>
                        <span>
                            A animi autem beatae consequatur delectus error et
                            facere hic inventore ipsum maiores nesciunt non
                            obcaecati perspiciatis placeat provident repellat
                            repellendus repudiandae, sapiente sint sit
                            temporibus unde. Eos eum, quos!
                        </span>
                    </p>
                    <a href={'#'} className={'text-primary'}>
                        Read More <KeyboardArrowDown />{' '}
                    </a>
                </div>
                {/* </Typography> */}

                {/*Right side card*/}
                <div className={'col-sm-12 col-md-4 col-lg-4'}>
                    {/*BTC to USD Converter card*/}
                    <Card>
                        <div className={'m-2'}>
                            <h4>BTC to USD Converter</h4>
                            <div className="my-1">
                                <div className="input-group">
                                    <div className="input-group-prepend w-25">
                                        <div className="input-group-text bg-black">
                                            <span className={'mt-2'}>BTC</span>
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
                    </Card>

                    {/*BTC Price and Market Stats card*/}
                    <Card className={'mt-2'}>
                        <div className={'m-3'}>
                            <h5 className={'mt-2 mb-4   '}>
                                BTC Price and Market Stats
                            </h5>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>BTC Price</strong>
                                </p>
                                <p>
                                    <strong>$47,811.67</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>Market Cap</strong>
                                </p>
                                <p>
                                    <strong>$47,811.67</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>Market Cap Dominance</strong>
                                </p>
                                <p>
                                    <strong>41.78%</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>Trading Volume</strong>
                                </p>
                                <p>
                                    <strong>$47,811.67</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>Volume / Market Cap</strong>
                                </p>
                                <p>
                                    <strong>0.0329</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>24h Low/ 24h High</strong>
                                </p>
                                <p>
                                    <strong>
                                        $47,811,60.89 / $116,446,546.89
                                    </strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>7d Low/ 7d High</strong>
                                </p>
                                <p>
                                    <strong>
                                        $47,811,60.89 / $116,446,546.89
                                    </strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>Market Cap Rank</strong>
                                </p>
                                <p>
                                    <strong>#1</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>All-Time High</strong>
                                </p>
                                <p>
                                    <strong>$64,804.72</strong>
                                </p>
                            </div>
                            <div className={'d-flex justify-content-between'}>
                                <p className={'text-secondary'}>
                                    <strong>All-Time Low</strong>
                                </p>
                                <p>
                                    <strong>$78.9089</strong>
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/**/}
                    <Card className={'mt-2'}>
                        <div className={'m-3'}>
                            <h5 className={'mt-2 mb-4'}>
                                Trending Coins and Tokens <Fireplace />
                            </h5>
                            <div
                                className={'d-flex justify-content-between m-2'}
                            >
                                <img
                                    height={'25px'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
                                    }
                                    alt={'bitcoin'}
                                />
                                <p>Blizzard Token (Buzz)</p>
                                <button
                                    className={'btn btn-success btn-sm h-25'}
                                >
                                    #574
                                </button>
                            </div>
                            <div
                                className={'d-flex justify-content-between m-2'}
                            >
                                <img
                                    height={'25px'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389'
                                    }
                                    alt={'bitcoin'}
                                />
                                <p>Blizzard Token (Buzz)</p>
                                <button
                                    className={'btn btn-success btn-sm h-25'}
                                >
                                    #574
                                </button>
                            </div>
                            <div
                                className={'d-flex justify-content-between m-2'}
                            >
                                <img
                                    height={'25px'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256'
                                    }
                                    alt={'bitcoin'}
                                />
                                <p>Blizzard Token (Buzz)</p>
                                <button
                                    className={'btn btn-success btn-sm h-25'}
                                >
                                    #574
                                </button>
                            </div>
                            <div
                                className={'d-flex justify-content-between m-2'}
                            >
                                <img
                                    height={'25px'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/8284/thumb/luna1557227471663.png?1567147072'
                                    }
                                    alt={'bitcoin'}
                                />
                                <p>Blizzard Token (Buzz)</p>
                                <button
                                    className={'btn btn-success btn-sm h-25'}
                                >
                                    #574
                                </button>
                            </div>
                            <div
                                className={'d-flex justify-content-between m-2'}
                            >
                                <img
                                    height={'25px'}
                                    src={
                                        'https://assets.coingecko.com/coins/images/11939/thumb/shiba.png?1622619446'
                                    }
                                    alt={'bitcoin'}
                                />
                                <p>Blizzard Token (Buzz)</p>
                                <button
                                    className={'btn btn-success btn-sm h-25'}
                                >
                                    #574
                                </button>
                            </div>
                        </div>
                    </Card>
                    <Typography
                        color="textPrimary"
                        className={'mt-3'}
                        component="div"
                    >
                        <div className={'float-end m-2 text-primary'}>
                            <a>See All Markets</a> <ArrowForward />
                        </div>
                    </Typography>
                </div>
            </div>

            {/*Bitcoin Market*/}
            {rowLoaded ? (
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
                                        backgroundColor: '#3e4041',
                                        color: '#fff',
                                    }}
                                >
                                    <TableCell className="text-white">
                                        <strong>#</strong>
                                    </TableCell>
                                    <TableCell className="text-white">
                                        <strong>Source</strong>
                                    </TableCell>
                                    <TableCell />
                                    <TableCell className={'text-primary'}>
                                        <strong>Pairs</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Price</strong>
                                    </TableCell>
                                    {/*<TableCell >*/}
                                    {/*    <strong>+ 2% Depth</strong>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell >*/}
                                    {/*    <strong>- 2% Depth</strong>*/}
                                    {/*</TableCell>*/}
                                    <TableCell>
                                        <strong>Volume</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Volume % </strong>
                                    </TableCell>
                                    {/*<TableCell >*/}
                                    {/*    <strong>Confidence</strong>*/}
                                    {/*</TableCell>*/}
                                    {/*<TableCell >*/}
                                    {/*    <strong>Liquidity</strong>*/}
                                    {/*</TableCell>*/}
                                    <TableCell className="text-white">
                                        Updated
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
                                        {/*<TableCell >*/}
                                        {/*    {row.plus_depth}*/}
                                        {/*</TableCell>*/}
                                        {/*<TableCell >*/}
                                        {/*    {row.neg_depth}*/}
                                        {/*</TableCell>*/}
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
                                        {/*<TableCell >*/}
                                        {/*    <span style={{backgroundColor: '#b4b474', borderRadius: '15px',}}>*/}
                                        {/*        <span className={'m-1'}>*/}
                                        {/*            {row.confidence}*/}
                                        {/*        </span>*/}
                                        {/*    </span>*/}
                                        {/*</TableCell>*/}
                                        {/*<TableCell >*/}
                                        {/*    {row.liquidity}*/}
                                        {/*</TableCell>*/}
                                        <TableCell>
                                            {convertDate(row.atl_date)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <a
                            className={
                                'btn d-sm-block btn-secondary m-5 float-end'
                            }
                        >
                            See All Market
                        </a>
                    </div>
                </Typography>
            ) : error ? (
                <Card className={'text-danger text-center'}>
                    <CircularProgress color="secondary" />
                </Card>
            ) : (
                <p>An Error Occured</p>
            )}

            {/*Bitcoin News*/}
            <Typography
                color={'textPrimary'}
                className={'row mt-3'}
                component="div"
            >
                {/*Top Bitcoin news*/}
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
                                    Axie Infinity hits a new ATH at $155 while
                                    Bitcoin bulls aim for $50K
                                </h4>
                            </div>
                            <div className={'m-1'}>
                                <strong className={'text-secondary'}>
                                    AXS, CVP and POLS lead altcoins higher while
                                    Bitcoin bull search for a way to reclaim the
                                    $50,000 level.
                                </strong>
                                <a className={'text-primary'}>(Read More...)</a>
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
                                            Axie Infinity hits a new ATH at $155
                                            while Bitcoin bulls aim for $50K
                                        </h4>
                                    </div>
                                    <div className={'m-1'}>
                                        <strong className={'text-secondary'}>
                                            AXS, CVP and POLS lead altcoins
                                            higher while Bitcoin bull search for
                                            a way to reclaim the $50,000 level.
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
                                            Axie Infinity hits a new ATH at $155
                                            while Bitcoin bulls aim for $50K
                                        </h4>
                                    </div>
                                    <div className={'m-1'}>
                                        <strong className={'text-secondary'}>
                                            AXS, CVP and POLS lead altcoins
                                            higher while Bitcoin bull search for
                                            a way to reclaim the $50,000 level.
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
                                            Axie Infinity hits a new ATH at $155
                                            while Bitcoin bulls aim for $50K
                                        </h4>
                                    </div>
                                    <div className={'m-1'}>
                                        <strong className={'text-secondary'}>
                                            AXS, CVP and POLS lead altcoins
                                            higher while Bitcoin bull search for
                                            a way to reclaim the $50,000 level.
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
                        <a
                            href={'#'}
                            className={'btn btn-secondary btn-lg btn-sm btn-md'}
                        >
                            Read More
                        </a>
                    </div>
                </section>
            </Typography>

            {/*Trending Coins*/}
            <Typography
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
                    <div className="m-2">
                        <Card style={customOverview.coinsBorder}>
                            <CardContent>
                                <Typography variant="caption" component="div">
                                    <div className="float-md-right">
                                        <span className="float-end">
                                            Dominance: 4.9%
                                        </span>
                                        <br />
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
                                            <a
                                                className={
                                                    'btn btn-danger btn-sm'
                                                }
                                            >
                                                -2.01%
                                            </a>
                                        </section>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="m-2">
                        <Card style={customOverview.coinsBorder}>
                            <CardContent>
                                <Typography variant="caption" component="div">
                                    <div className="float-md-right">
                                        <span className="float-end">
                                            Dominance: 4.9%
                                        </span>
                                        <br />
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
                                            <a
                                                className={
                                                    'btn btn-danger btn-sm'
                                                }
                                            >
                                                -2.01%
                                            </a>
                                        </section>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="m-2">
                        <Card style={customOverview.coinsBorder}>
                            <CardContent>
                                <Typography variant="caption" component="div">
                                    <div className="float-md-right">
                                        <span className="float-end">
                                            Dominance: 4.9%
                                        </span>
                                        <br />
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
                                            <a
                                                className={
                                                    'btn btn-danger btn-sm'
                                                }
                                                style={
                                                    customOverview.trendingCoins
                                                }
                                            >
                                                -2.01%
                                            </a>
                                        </section>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="m-2">
                        <Card style={customOverview.coinsBorder}>
                            <CardContent>
                                <Typography variant="caption" component="div">
                                    <div className="float-md-right">
                                        <span className="float-end">
                                            Dominance: 4.9%
                                        </span>
                                        <br />
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
                                            <a
                                                className={
                                                    'btn btn-danger btn-sm'
                                                }
                                            >
                                                -2.01%
                                            </a>
                                        </section>
                                    </div>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </Typography>
        </>
    );
}
