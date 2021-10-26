/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/13/21
 * Time: 9:51 AM
 */

import {
    ArrowBack,
    ArrowDropDown,
    ArrowForward,
    Brightness1,
    CallSplit,
    CompareArrows,
    DateRange,
    Fireplace,
    Fullscreen,
    KeyboardArrowDown,
    LocalBar,
    MoreHoriz,
    Star,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import CoinChart from './CoinChart';

function createData(
    number,
    image,
    source,
    pairs,
    price,
    plus_depth,
    neg_depth,
    volume,
    volume_percentage,
    confidence,
    liquidity,
    updated
) {
    return {
        number,
        image,
        source,
        pairs,
        price,
        plus_depth,
        neg_depth,
        volume,
        volume_percentage,
        confidence,
        liquidity,
        updated,
    };
}

const rows = [
    createData(
        1,
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'Low',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'Low',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'Low',
        830,
        '6 hours ago'
    ),
    createData(
        1,
        'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
        'TrusterCoin',
        'BTC/USDT',
        '$384,900',
        '$4,862,845',
        '$4,862,845',
        '$4,862,845',
        '1.8%',
        'High',
        830,
        '6 hours ago'
    ),
];

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});
export default function Overview() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const custom = {
        tabStyle: {
            textTransform: 'capitalize',
            // backgroundColor: 'rgb(68 63 63 / 50%)',
            // borderRadius: '5px',
            // marginRight: '5px',
            // fontWeight: 'bold',
        },
        coinsBorder: {
            borderLeft: '5px solid blue',
            minWidth: '250px',
        },
    };
    const classes = useStyles();

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext
                sx={{ width: '100%', typography: 'body1' }}
                value={value}
            >
                <Card
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        borderRadius: '5px',
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        className={'m-1'}
                    >
                        <Tab
                            label="General"
                            value="1"
                            style={custom.tabStyle}
                            className={'btn btn-secondary m-2'}
                        />
                        <Tab
                            label="Developers"
                            value="2"
                            className={'btn btn-secondary m-2'}
                            style={custom.tabStyle}
                        />
                        <Tab
                            label="Widget"
                            value="3"
                            style={custom.tabStyle}
                            className={'btn btn-secondary m-2'}
                        />
                        <Tab
                            label="Analysis"
                            value="4"
                            className={'btn btn-secondary m-2'}
                            style={custom.tabStyle}
                        />
                    </TabList>
                </Card>

                {/*General*/}

                <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                    <div>
                        {/*First row*/}
                        <div className={'row mt-3'}>
                            {/*left side card*/}
                            <Card className={'col-7'}>
                                {/*Bitcoin (BTC) Price Chart*/}
                                <div className={'m-3'}>
                                    <div
                                        className={
                                            'd-flex justify-content-between'
                                        }
                                    >
                                        <h4>Bitcoin (BTC) Price Chart</h4>
                                        <div>
                                            <Fullscreen className={'m-1'} />
                                            <MoreHoriz className={'m-1'} />
                                        </div>
                                    </div>
                                    {/*Chart*/}
                                    <div
                                        className={
                                            'd-flex justify-content-between'
                                        }
                                    >
                                        <div>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                Price
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                Market Cap
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                Trading views
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                1d
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                7d
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                1m
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                3m
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                1y
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                YTD
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                ALL
                                            </button>
                                            <button
                                                className={
                                                    'btn btn-info m-1 btn-sm'
                                                }
                                            >
                                                <DateRange />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={'mt-2'}>
                                        <Card>
                                            <CoinChart />
                                        </Card>
                                        <div
                                            className={
                                                'd-flex justify-content-start'
                                            }
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox defaultChecked />
                                                }
                                                label="BTC"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="USD"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={'mt-5'}>
                                    <h2>About Bitcoin</h2>
                                    <hr />
                                    <h5>What is Bitcoin (BTC)</h5>
                                    <p>
                                        <span>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit.
                                            Corporis dicta dolorem eum maxime
                                            neque odit optio placeat recusandae
                                            rem rerum? Alias doloremque dolorum
                                            eos ratione reprehenderit unde vel
                                            voluptate voluptatem.
                                        </span>
                                        <span>
                                            A animi autem beatae consequatur
                                            delectus error et facere hic
                                            inventore ipsum maiores nesciunt non
                                            obcaecati perspiciatis placeat
                                            provident repellat repellendus
                                            repudiandae, sapiente sint sit
                                            temporibus unde. Eos eum, quos!
                                        </span>
                                    </p>
                                    <a href={'#'} className={'text-primary'}>
                                        Read More <KeyboardArrowDown />{' '}
                                    </a>
                                </div>
                            </Card>

                            {/*Right side card*/}
                            <div className={'col-5'}>
                                {/*BTC to USD Converter card*/}
                                <Card>
                                    <div className={'m-2'}>
                                        <h4>BTC to USD Converter</h4>
                                        <div className="my-1">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <span
                                                            className={'mt-2'}
                                                        >
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
                                        <div
                                            className={'text-center display-5'}
                                        >
                                            <CompareArrows />
                                        </div>
                                        <div className="my-1">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <span
                                                            className={'mt-2'}
                                                        >
                                                            USD{' '}
                                                            <ArrowDropDown />
                                                        </span>
                                                    </div>
                                                </div>
                                                <select className="form-control">
                                                    <option selected>
                                                        Choose...
                                                    </option>
                                                    <option value="1">
                                                        One
                                                    </option>
                                                    <option value="2">
                                                        Two
                                                    </option>
                                                    <option value="3">
                                                        Three
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/*BTC Price and Market Stats card*/}
                                <Card className={'mt-2'}>
                                    <div className={'m-3'}>
                                        <h5 className={'mt-2 mb-4   '}>
                                            BTC Price and Market Stats
                                        </h5>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>BTC Price</strong>
                                            </p>
                                            <p>
                                                <strong>$47,811.67</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>Market Cap</strong>
                                            </p>
                                            <p>
                                                <strong>$47,811.67</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>
                                                    Market Cap Dominance
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>41.78%</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>Trading Volume</strong>
                                            </p>
                                            <p>
                                                <strong>$47,811.67</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>
                                                    Volume / Market Cap
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>0.0329</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>
                                                    24h Low/ 24h High
                                                </strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    $47,811,60.89 /
                                                    $116,446,546.89
                                                </strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>7d Low/ 7d High</strong>
                                            </p>
                                            <p>
                                                <strong>
                                                    $47,811,60.89 /
                                                    $116,446,546.89
                                                </strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>Market Cap Rank</strong>
                                            </p>
                                            <p>
                                                <strong>#1</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
                                            <p className={'text-secondary'}>
                                                <strong>All-Time High</strong>
                                            </p>
                                            <p>
                                                <strong>$64,804.72</strong>
                                            </p>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between'
                                            }
                                        >
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
                                            Trending Coins and Tokens{' '}
                                            <Fireplace />
                                        </h5>
                                        <div
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
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
                                                className={'btn btn-success'}
                                            >
                                                #574
                                            </button>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
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
                                                className={'btn btn-success'}
                                            >
                                                #574
                                            </button>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
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
                                                className={'btn btn-success'}
                                            >
                                                #574
                                            </button>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
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
                                                className={'btn btn-success'}
                                            >
                                                #574
                                            </button>
                                        </div>
                                        <div
                                            className={
                                                'd-flex justify-content-between m-2'
                                            }
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
                                                className={'btn btn-success'}
                                            >
                                                #574
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                                <Card className={'mt-3'}>
                                    <div
                                        className={'float-end m-2 text-primary'}
                                    >
                                        <a>See All Markets</a> <ArrowForward />
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/*Bitcoin Market*/}
                        <Card className={'row mt-3'}>
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
                                            <TableCell
                                                className="text-white"
                                                align="right"
                                            >
                                                <strong>Source</strong>
                                            </TableCell>
                                            <TableCell align="right" />
                                            <TableCell
                                                align="right"
                                                className={'text-primary'}
                                            >
                                                <strong>Pairs</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>Price</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>+ 2% Depth</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>- 2% Depth</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>Volume</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>Volume % </strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>Confidence</strong>
                                            </TableCell>
                                            <TableCell align="right">
                                                <strong>Liquidity</strong>
                                            </TableCell>
                                            <TableCell
                                                className="text-white"
                                                align="right"
                                            >
                                                Updated
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.number}>
                                                <TableCell align="right">
                                                    {row.number}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <img
                                                        src={row.image}
                                                        alt={'coin image'}
                                                        height="25px"
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.source}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    className={'text-primary'}
                                                >
                                                    {row.pairs}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.price}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.plus_depth}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.neg_depth}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.volume}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.volume_percentage}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <span
                                                        style={{
                                                            backgroundColor:
                                                                '#b4b474',
                                                            borderRadius:
                                                                '15px',
                                                        }}
                                                    >
                                                        <span className={'m-1'}>
                                                            {row.confidence}
                                                        </span>
                                                    </span>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.liquidity}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.updated}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>
                                <a
                                    className={
                                        'btn btn-secondary m-5 float-end'
                                    }
                                >
                                    See All Market
                                </a>
                            </div>
                        </Card>

                        {/*Bitcoin News*/}
                        <Card className={'row mt-3'}>
                            <section
                                className={'d-flex justify-content-between'}
                            >
                                <h4>Bitcoin News</h4>
                                <div>
                                    <a className={'text-primary'}>
                                        Read More <ArrowForward />
                                    </a>
                                </div>
                            </section>
                            <hr />
                            <section className={'row'}>
                                <div className={'col-5'}>
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
                                <div className={'col-7'}>
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
                                            <section className={'m-3'}>
                                                <div className={'m-1'}>
                                                    <h4>
                                                        Axie Infinity hits a new
                                                        ATH at $155 while
                                                        Bitcoin bulls aim for
                                                        $50K
                                                    </h4>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong
                                                        className={
                                                            'text-secondary'
                                                        }
                                                    >
                                                        AXS, CVP and POLS lead
                                                        altcoins higher while
                                                        Bitcoin bull search for
                                                        a way to reclaim the
                                                        $50,000 level.
                                                    </strong>
                                                    <a
                                                        className={
                                                            'text-primary'
                                                        }
                                                    >
                                                        (Read More...)
                                                    </a>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong>
                                                        <small>
                                                            Coingape . 5 hours
                                                            ago
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
                                                        'https://cent.imgix.net/e711f6f5-cb69-4632-84f8-9a5470a2d249.png?fit=clip&w=412&h=732'
                                                    }
                                                    alt={'news'}
                                                    className="img-thumbnail"
                                                />
                                            </section>
                                        </div>
                                        <div className={'col-8'}>
                                            <section className={'m-3'}>
                                                <div className={'m-1'}>
                                                    <h4>
                                                        Axie Infinity hits a new
                                                        ATH at $155 while
                                                        Bitcoin bulls aim for
                                                        $50K
                                                    </h4>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong
                                                        className={
                                                            'text-secondary'
                                                        }
                                                    >
                                                        AXS, CVP and POLS lead
                                                        altcoins higher while
                                                        Bitcoin bull search for
                                                        a way to reclaim the
                                                        $50,000 level.
                                                    </strong>
                                                    <a
                                                        className={
                                                            'text-primary'
                                                        }
                                                    >
                                                        (Read More...)
                                                    </a>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong>
                                                        <small>
                                                            Coingape . 5 hours
                                                            ago
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
                                            <section className={'m-3'}>
                                                <div className={'m-1'}>
                                                    <h4>
                                                        Axie Infinity hits a new
                                                        ATH at $155 while
                                                        Bitcoin bulls aim for
                                                        $50K
                                                    </h4>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong
                                                        className={
                                                            'text-secondary'
                                                        }
                                                    >
                                                        AXS, CVP and POLS lead
                                                        altcoins higher while
                                                        Bitcoin bull search for
                                                        a way to reclaim the
                                                        $50,000 level.
                                                    </strong>
                                                    <a
                                                        className={
                                                            'text-primary'
                                                        }
                                                    >
                                                        (Read More...)
                                                    </a>
                                                </div>
                                                <div className={'m-1'}>
                                                    <strong>
                                                        <small>
                                                            Coingape . 5 hours
                                                            ago
                                                        </small>
                                                    </strong>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div
                                    className={
                                        'm-3 d-flex justify-content-center'
                                    }
                                >
                                    <a
                                        href={'#'}
                                        className={'btn btn-secondary btn-lg'}
                                    >
                                        Read More
                                    </a>
                                </div>
                            </section>
                        </Card>

                        <Card className={'row mt-3'}>
                            <section
                                className={
                                    'd-flex justify-content-between mt-3'
                                }
                            >
                                <h4>Trending Coins</h4>
                                <div>
                                    <span className={'text-primary'}>
                                        {' '}
                                        <ArrowBack /> <ArrowForward />
                                    </span>
                                </div>
                            </section>
                            <hr />
                            <section className="d-flex flex-row mb-4">
                                <div className="m-2">
                                    <Card style={custom.coinsBorder}>
                                        <CardContent>
                                            <Typography variant="caption">
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
                                                        <p
                                                            className={
                                                                'text-secondary'
                                                            }
                                                        >
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
                                    <Card style={custom.coinsBorder}>
                                        <CardContent>
                                            <Typography variant="caption">
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
                                                        <p
                                                            className={
                                                                'text-secondary'
                                                            }
                                                        >
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
                                    <Card style={custom.coinsBorder}>
                                        <CardContent>
                                            <Typography variant="caption">
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
                                                        <p
                                                            className={
                                                                'text-secondary'
                                                            }
                                                        >
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
                                    <Card style={custom.coinsBorder}>
                                        <CardContent>
                                            <Typography variant="caption">
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
                                                        <p
                                                            className={
                                                                'text-secondary'
                                                            }
                                                        >
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
                        </Card>
                    </div>
                </TabPanel>

                {/*Developers*/}
                <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                    <Card>
                        <div className={'m-3'}>
                            <div>
                                <p className={'text-primary fw-bold'}>
                                    bitcoin
                                </p>
                                <p className={'fw-bold '}>
                                    Bitcoin Core Integration/Stating Tree
                                </p>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p>
                                        <Brightness1 />
                                        <span className={'m-1'}>C++</span>
                                    </p>
                                    <p>
                                        <CallSplit />
                                        <span className={'m-1'}>25,578</span>
                                    </p>
                                    <p>
                                        <Star />
                                        <span className={'m-1'}>45,578</span>
                                    </p>
                                    <p>
                                        <LocalBar />
                                        <span className={'m-1'}>MIT</span>
                                    </p>
                                    <p>
                                        <span>Updated 8 Hours Ago</span>
                                    </p>
                                    <p>
                                        <span>image</span>
                                    </p>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <p className={'text-primary fw-bold'}>
                                    bitcoin
                                </p>
                                <p className={'fw-bold '}>
                                    Bitcoin Core Integration/Stating Tree
                                </p>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p>
                                        <Brightness1 />
                                        <span className={'m-1'}>C++</span>
                                    </p>
                                    <p>
                                        <CallSplit />
                                        <span className={'m-1'}>25,578</span>
                                    </p>
                                    <p>
                                        <Star />
                                        <span className={'m-1'}>45,578</span>
                                    </p>
                                    <p>
                                        <LocalBar />
                                        <span className={'m-1'}>MIT</span>
                                    </p>
                                    <p>
                                        <span>Updated 8 Hours Ago</span>
                                    </p>
                                    <p>
                                        <span>image</span>
                                    </p>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <p className={'text-primary fw-bold'}>
                                    bitcoin
                                </p>
                                <p className={'fw-bold '}>
                                    Bitcoin Core Integration/Stating Tree
                                </p>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p>
                                        <Brightness1 />
                                        <span className={'m-1'}>C++</span>
                                    </p>
                                    <p>
                                        <CallSplit />
                                        <span className={'m-1'}>25,578</span>
                                    </p>
                                    <p>
                                        <Star />
                                        <span className={'m-1'}>45,578</span>
                                    </p>
                                    <p>
                                        <LocalBar />
                                        <span className={'m-1'}>MIT</span>
                                    </p>
                                    <p>
                                        <span>Updated 8 Hours Ago</span>
                                    </p>
                                    <p>
                                        <span>image</span>
                                    </p>
                                </div>
                                <hr />
                            </div>
                            <div>
                                <p className={'text-primary fw-bold'}>
                                    bitcoin
                                </p>
                                <p className={'fw-bold '}>
                                    Bitcoin Core Integration/Stating Tree
                                </p>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <p>
                                        <Brightness1 />
                                        <span className={'m-1'}>C++</span>
                                    </p>
                                    <p>
                                        <CallSplit />
                                        <span className={'m-1'}>25,578</span>
                                    </p>
                                    <p>
                                        <Star />
                                        <span className={'m-1'}>45,578</span>
                                    </p>
                                    <p>
                                        <LocalBar />
                                        <span className={'m-1'}>MIT</span>
                                    </p>
                                    <p>
                                        <span>Updated 8 Hours Ago</span>
                                    </p>
                                    <p>
                                        <span>image</span>
                                    </p>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </Card>
                </TabPanel>

                {/*Widget*/}
                <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                    <div>
                        <strong>To be discussed</strong>
                    </div>
                </TabPanel>

                {/*Analyse*/}
                <TabPanel value="4" classes={{ root: classes.tabPanelRoot }}>
                    <Card>
                        <div className={'m-3'}>
                            <div>
                                <h5>
                                    <strong>Token Summary</strong>
                                </h5>
                                <p>
                                    Interesting on-chain metrics that provide a
                                    rapid understanding of the state Bitcoin
                                </p>
                            </div>
                            <div className={'d-flex'}>
                                <div className={'border rounded m-1'}>
                                    <div className={'m-3'}>
                                        <p>
                                            Holders Making Money at Current
                                            Price{' '}
                                        </p>
                                        <div>
                                            <p>
                                                <span
                                                    className={'text-primary'}
                                                >
                                                    {' '}
                                                    83% <small>IN</small>
                                                </span>
                                                <span className={'text-danger'}>
                                                    8% <small>AT</small>
                                                </span>
                                                <span
                                                    className={'text-success'}
                                                >
                                                    9% <small>OUT </small>
                                                </span>
                                            </p>
                                        </div>
                                        <hr
                                            style={{
                                                borderTop: '5px solid red',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={'border rounded m-1'}>
                                    <div className={'m-3'}>
                                        <p>Concentration by Large Holders </p>
                                        <div>
                                            <p>
                                                <span
                                                    className={'text-primary'}
                                                >
                                                    11%
                                                </span>
                                            </p>
                                        </div>
                                        <hr
                                            style={{
                                                borderTop: '5px solid red',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={'border rounded m-1'}>
                                    <div className={'m-3'}>
                                        <p>Holders Composition by Time Held</p>
                                        <div>
                                            <p className={'d-flex'}>
                                                <span
                                                    className={'text-primary'}
                                                >
                                                    60% <small>1y+</small>
                                                </span>
                                                <span className={'text-danger'}>
                                                    31 <small>1-12M</small>
                                                </span>
                                                <span
                                                    className={'text-success'}
                                                >
                                                    9% <small>1m </small>
                                                </span>
                                            </p>
                                        </div>
                                        <hr
                                            style={{
                                                borderTop: '5px solid red',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={'border rounded m-1'}>
                                    <div className={'m-3'}>
                                        <p>Transactions Greater than $100K</p>
                                        <div>
                                            <p>
                                                <span
                                                    className={'text-primary'}
                                                >
                                                    $316.99b{' '}
                                                    <small>7DAYS</small>
                                                </span>
                                            </p>
                                        </div>
                                        <hr
                                            style={{
                                                borderTop: '5px solid red',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={'border rounded m-1'}>
                                    <div className={'m-3'}>
                                        <p>Transactions Demographics</p>
                                        <div>
                                            <p>
                                                <span
                                                    className={'text-success'}
                                                >
                                                    58% <small>WEST</small>
                                                </span>
                                                <span
                                                    className={'text-primary'}
                                                >
                                                    42 <small>EAST</small>
                                                </span>
                                            </p>
                                        </div>
                                        <hr
                                            style={{
                                                borderTop: '5px solid red',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className={'btn btn-primary mt-3'}>
                                Dive Deeper
                            </button>
                            <div className={'mt-5'}>
                                <div>
                                    <h4>
                                        <strong>Actionable Signals</strong>
                                    </h4>
                                    <p>
                                        Momentum and value signals that will
                                        help you better judge the on-chain
                                        sentiment of Bitcoin
                                    </p>
                                </div>
                                <div
                                    className={'d-flex justify-content-between'}
                                >
                                    <div className={'border rounded m-1'}>
                                        <div className={'m-3'}>
                                            <h5 className={'text-secondary'}>
                                                <strong>Summary</strong>
                                            </h5>
                                            <div
                                                style={{
                                                    minHeight: '250px',
                                                    minWidth: '300px',
                                                }}
                                            >
                                                <h1> Coming soon</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'border rounded m-1'}>
                                        <div className={'m-3'}>
                                            <h5 className={'text-danger'}>
                                                <strong>
                                                    Net Network Growth
                                                </strong>
                                            </h5>
                                            <div
                                                style={{
                                                    minHeight: '250px',
                                                    minWidth: '300px',
                                                }}
                                            >
                                                <h1> Coming soon</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'border rounded m-1'}>
                                        <div className={'m-3'}>
                                            <h5 className={'text-success'}>
                                                <strong>Concentration</strong>
                                            </h5>
                                            <div
                                                style={{
                                                    minHeight: '250px',
                                                    minWidth: '300px',
                                                }}
                                            >
                                                <h1> Coming soon</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className={'btn btn-primary mt-3'}>
                                See More Signals
                            </button>
                        </div>
                    </Card>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
