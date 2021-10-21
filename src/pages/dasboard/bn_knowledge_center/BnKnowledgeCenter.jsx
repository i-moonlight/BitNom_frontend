import {
    Close,
    Favorite,
    Forum,
    Replay,
    StarBorderOutlined,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Card,
    CardContent,
    Container,
    Paper,
    Switch,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Screen from '../../../components/Screen';
import GainersAndLosers from './GainersAndLosers';
import HeatMap from "./HeatMap";

const columns = [
    { id: 'star', label: '#', minWidth: 10 },
    { id: 'ash', label: '', minWidth: 10 },
    { id: 'coin_image', label: 'Coin', minWidth: 25 },
    { id: 'coin', label: '', minWidth: 25 },
    { id: 'currency', label: '', minWidth: 50 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'h_1', label: '1h', minWidth: 100 },
    { id: 'h_24', label: '24h', minWidth: 100 },
    { id: 'd_7', label: '7d', minWidth: 100 },
    { id: 'volume_24', label: '24h Volume', minWidth: 100 },
    { id: 'mkt_cap', label: 'Mkt Cap', minWidth: 100 },
    { id: 'last_7_days', label: 'Last 7 days', minWidth: 100 },
];

function createData(
    star,
    ash,
    coin_image,
    coin,
    currency,
    price,
    h_1,
    h_24,
    d_7,
    volume_24,
    mkt_cap,
    last_7_days
) {
    return {
        star,
        ash,
        coin_image,
        coin,
        currency,
        price,
        h_1,
        h_24,
        d_7,
        volume_24,
        mkt_cap,
        last_7_days,
    };
}

const rows = [
    createData(
        <StarBorderOutlined />,
        1,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        2,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        3,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        4,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        5,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        6,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        7,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        8,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        9,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        10,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        11,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        1,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        1,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
    createData(
        <StarBorderOutlined />,
        12,
        <img
            height="25px"
            src={
                'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579'
            }
            alt="bitcoin"
        />,
        'Bitcoin',
        'BTC',
        '$44,000.090',
        <p className="text-danger">-0.4%</p>,
        <p className="text-danger">-2.5%</p>,
        <p className="text-danger">-3.4%</p>,
        '$34,560,264.399',
        '$34,560,264.399',
        'Images'
    ),
];

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0px',
    },
});

export default function BnKnowledgeCenter() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checked, setChecked] = React.useState(true);
    const [value, setValue] = React.useState('1');

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const borders = {
        market: {
            borderLeft: '5px solid red',
        },
        volume: {
            borderLeft: '5px solid green',
        },
        carp: {
            borderLeft: '5px solid blue',
        },
        nft: {
            borderLeft: '5px solid yellow',
        },
        coins: {
            borderLeft: '5px solid purple',
        },
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleTabChanges = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    const custom = {
        tabStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
        },
        verticalLine: {
            borderLeft: '2px solid green',
            height: '35px',
        },
        darkTransparent: {
            backgroundColor: 'rgb(68 63 63 / 50%)',
            text: '#fff',
            height: '10px',
            borderRadius: '5px',
            margin: '5px',
            padding: '0.5px 0.5px',
        },
    };

    return (
        <Screen>
            <Container>
                {/*Crypto Header*/}
                <section className="border-0">
                    <Card variant="body1" className="m-2">
                        <div className="d-flex flex-row m-2">
                            <h2>Cryptocurrency Prices by Market Cap </h2>
                            <small>
                                <Switch
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                Show Status
                            </small>
                        </div>
                        <p className="m-2">
                            The global cryptocurrency market cap today is $2.08
                            Trillion, a
                            <span className="text-danger"> -1.1% </span> change
                            in the last 24 hours <a href={'#'}>Read More</a>
                        </p>
                    </Card>
                </section>
                {/*Cards Being Checked*/}
                {checked && (
                    <section className="d-flex flex-row">
                        <div className="m-2">
                            <Card style={borders.market}>
                                <CardContent>
                                    <Typography variant="caption">
                                        <div className="float-md-right">
                                            <span className="text-danger float-end">
                                                -4.9 %
                                            </span>
                                            <br />
                                            <br />
                                            <h6>
                                                <strong>
                                                    $1,964,164,087,420
                                                </strong>
                                            </h6>
                                            <span>Market Capitalization</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="m-2">
                            <Card
                                variant="contained"
                                color="primary"
                                style={borders.volume}
                            >
                                <CardContent>
                                    <Typography variant="caption">
                                        <div className="float-md-right">
                                            <span className="text-danger float-end">
                                                {' '}
                                                -4.9 %
                                            </span>
                                            <br />
                                            <br />
                                            <h6>
                                                <strong>
                                                    $1,964,164,087,420
                                                </strong>
                                            </h6>
                                            <span>24h Trading Volume</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="m-2">
                            <Card
                                variant="contained"
                                color="primary"
                                style={borders.carp}
                            >
                                <CardContent>
                                    <Typography variant="caption">
                                        <div className="float-md-right">
                                            <span className="text-info float-end">
                                                Bitcoin
                                            </span>
                                            <br />
                                            <br />
                                            <h6>
                                                <strong>42.84%</strong>
                                            </h6>
                                            <span>Market Carp Dominance</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="m-2">
                            <Card
                                variant="contained"
                                color="primary"
                                style={borders.nft}
                            >
                                <CardContent>
                                    <Typography variant="caption">
                                        <div>
                                            <br />
                                            <br />
                                            <h6>
                                                <strong>456</strong>
                                            </h6>
                                            <span>NFT available</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="m-2">
                            <Card
                                variant="contained"
                                color="primary"
                                style={borders.coins}
                            >
                                <CardContent>
                                    <Typography variant="caption">
                                        <div>
                                            <br />
                                            <br />
                                            <h6>
                                                <strong>9,076</strong>
                                            </h6>
                                            <span>Available Coins</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}
                <br />
                <section>
                    {/* Tabs */}
                    <TabContext value={value}>
                        <Card sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleTabChanges}
                                aria-label="lab API tabs example"
                            >
                                <Tab
                                    label="Portfolio"
                                    value=""
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Watchlist"
                                    value="2"
                                    style={custom.tabStyle}
                                />

                                <hr style={custom.verticalLine} />
                                <Tab
                                    label="Cryptocurrency"
                                    value="1"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Cryptogazing"
                                    value="3"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Category"
                                    value="2"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Gainers and Losers "
                                    value="5"
                                    style={custom.tabStyle}
                                />
                                <Tab
                                    label="Heatmap"
                                    value="7"
                                    style={custom.tabStyle}
                                />
                            </TabList>
                        </Card>
                        <TabPanel
                            value="1"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            {/*Portfolio*/}
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table
                                        stickyHeader
                                        aria-label="sticky table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth:
                                                                column.minWidth,
                                                            backgroundColor:
                                                                '#3e4041',
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                        rowsPerPage
                                                )
                                                .map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.code}
                                                        >
                                                            {columns.map(
                                                                (column) => {
                                                                    const val =
                                                                        row[
                                                                            column
                                                                                .id
                                                                        ];
                                                                    return (
                                                                        <TableCell
                                                                            key={
                                                                                column.id
                                                                            }
                                                                            align={
                                                                                column.align
                                                                            }
                                                                        >
                                                                            {column.format &&
                                                                            typeof val ===
                                                                                'number'
                                                                                ? column.format(
                                                                                      val
                                                                                  )
                                                                                : val}
                                                                        </TableCell>
                                                                    );
                                                                }
                                                            )}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel
                            value="2"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            {/*Watchlist*/}
                            <Card>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table
                                        stickyHeader
                                        aria-label="sticky table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth:
                                                                column.minWidth,
                                                            backgroundColor:
                                                                '#3e4041',
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                                <div className="m-5 text-center">
                                    <h4>
                                        <strong>Your Watchlist is empty</strong>
                                    </h4>
                                    <p>
                                        Start building your watchlist by
                                        clicking button bellow
                                    </p>
                                    <button className=" btn btn-primary m-2">
                                        Add Coins
                                    </button>
                                    <br />
                                    <a className="text-primary">
                                        Visit Cryptogazing
                                    </a>
                                </div>
                            </Card>
                        </TabPanel>
                        <TabPanel
                            value="3"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            {/* Cryptogazing*/}
                            <div className="container col-6 text-center justify-content-center">
                                <Card>
                                    <CardContent>
                                        <div className="d-flex flex-row justify-content-between mb-3">
                                            <button className="btn btn-success">
                                                Rank #1
                                            </button>
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
                                                    <strong>
                                                        Bitcoin (BTC)
                                                    </strong>
                                                </p>
                                                <a className="btn btn-success mb-2">
                                                    <strong>$44,811,17</strong>
                                                </a>
                                            </div>
                                            <div className="col">
                                                <p>
                                                    <strong>
                                                        Price Change 24 hours
                                                    </strong>
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
                                                    <strong>
                                                        $300,213,918,809
                                                    </strong>
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
                        </TabPanel>
                        <TabPanel
                            value="4"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            {/*Categories*/}
                            <Card>Categories</Card>
                        </TabPanel>
                        <TabPanel
                            value="5"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            {/*Gainers and Losers*/}
                            <Card>
                                <GainersAndLosers />
                            </Card>
                        </TabPanel>
                        <TabPanel
                            value="6"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <Card>Coming Soon</Card>
                        </TabPanel>
                        <TabPanel
                            value="7"
                            classes={{ root: classes.tabPanelRoot }}
                        >
                            <Card>
                                <div><HeatMap /></div>
                            </Card>
                        </TabPanel>
                    </TabContext>
                </section>
            </Container>
        </Screen>
    );
}
