import { StarBorderOutlined } from '@mui/icons-material';
import { Rating } from '@mui/lab';
import {
    Button,
    Card,
    CardContent,
    Container,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';
import Screen from '../../../components/Screen';

// interface Column {
//     id: 'ash' | 'star' | 'coin_image' | 'coin' | 'currency' | 'price' | 'h_1' | 'h_24' | 'd_7' | 'volume_24' | 'mkt_cap' | 'last_7_days';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     format?: (value: number) => string;
// }

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

// interface Data {
//     star: string;
//     ash: number;
//     coin_image: string;
//     coin: string;
//     currency: string;
//     price: number;
//     h_1: string;
//     h_24: string;
//     d_7: string;
//     volume_24: string;
//     mkt_cap: string;
//     last_7_days: number;
// }

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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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
        'image',
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

export default function BnKnowledgeCenter() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

    // const classes = {
    //     head: {
    //         backgroundColor: '#bccbd0',
    //         position: 'sticky',
    //         top: 0,
    //     },
    // };

    return (
        <Screen>
            <Container>
                {/*Crypto Header*/}
                <section>
                    <Card variant="body1" className="m-2">
                        <div className="d-flex flex-row m-2">
                            <h2>Cryptocurrency Prices by Market Cap </h2>
                            <small>
                                <Switch defaultChecked /> Show Status
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

                {/*Cards*/}
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
                                            <strong>$1,964,164,087,420</strong>
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
                                            <strong>$1,964,164,087,420</strong>
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
                <br />
                <section>
                    {/*Above table head*/}
                    <div>
                        <Button variant="contained" className="m-2 p-1">
                            <Rating
                                className="m-1"
                                name="customized-10"
                                defaultValue={3}
                                max={1}
                            />{' '}
                            Portfolio
                        </Button>
                        <Button variant="contained" className="m-2">
                            Watchlist
                        </Button>{' '}
                        |
                        <a href={'#'} className="m-2">
                            {' '}
                            Cryptogazing{' '}
                        </a>
                        <a href={'#'} className="m-2">
                            {' '}
                            Category{' '}
                        </a>
                        <a href={'#'} className="m-2">
                            {' '}
                            Gainers and Losers{' '}
                        </a>
                        <a href={'#'} className="m-2">
                            {' '}
                            Recently Added{' '}
                        </a>
                        <a href={'#'} className="m-2">
                            {' '}
                            Heatmap{' '}
                        </a>
                    </div>

                    {/*Table*/}
                    <div>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
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
                                                page * rowsPerPage + rowsPerPage
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
                                                                const value =
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
                                                                        typeof value ===
                                                                            'number'
                                                                            ? column.format(
                                                                                  value
                                                                              )
                                                                            : value}
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
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </section>
            </Container>
        </Screen>
    );
}
