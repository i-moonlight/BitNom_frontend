import {List, Star,  StarOutline,} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Button, Card, CardContent, Container, Divider,
    Paper, Switch, Tab, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React, {useEffect, useState} from 'react';
import Screen from '../../../components/Screen';
import GainersAndLosers from './sub_sections/GainersAndLosers';
import HeatMap from './sub_sections/HeatMap';
import {Link} from 'react-router-dom';
import RecentlyAdded from './sub_sections/RecentlyAdded';
import Categories from './sub_sections/Categories';
import {CryptoGazing} from './sub_sections/CryptoGazing';

const columns = [
    { id: 'star', label: '#', minWidth: 10 },
    { id: 'ash', label: '', minWidth: 10 },
    { id: 'image', label: 'Coin', minWidth: 25 },
    { id: 'name', label: '', minWidth: 25 },
    { id: 'symbol', label: '', minWidth: 50 },
    { id: 'price_change_24h', label: 'Price', minWidth: 100 },
    { id: 'h_1', label: '1h', minWidth: 100 },
    { id: 'high_24hr', label: '24h', minWidth: 100 },
    { id: 'd_7', label: '7d', minWidth: 100 },
    { id: 'volume_24', label: '24h Volume', minWidth: 100 },
    { id: 'market_cap', label: 'Mkt Cap', minWidth: 100 },
    { id: 'last_7_days', label: 'Last 7 days', minWidth: 100 },
];

const useStyles = makeStyles({ tabPanelRoot: {padding: '0px'}});


export default function BnKnowledgeCenter() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [checked, setChecked] = React.useState(true);
    const [value, setValue] = React.useState('1');
    const [coins, getCoins] = useState([]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch(
            'https://api.coingecko.com/api/v3/coins'
        )
            .then((response) => response.json())
            .then((data) => {
                getCoins(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const borders = {
        market: {
            borderLeft: '5px solid red',
            minWidth: '200px',
        },
        volume: {
            borderLeft: '5px solid green',
            minWidth: '200px',
        },
        carp: {
            borderLeft: '5px solid blue',
            minWidth: '200px',
        },
        nft: {
            borderLeft: '5px solid yellow',
            minWidth: '200px',
        },
        coins: {
            borderLeft: '5px solid purple',
            minWidth: '200px',
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
        buttonStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            backgroundColor: '#333333',
            margin: '15px 15px 15px 0',
            borderRadius: '5px',
            minWidth: '100px'
        },
        listGridStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
            backgroundColor: '#333333',
            margin: '15px 15px 15px 0',
            borderRadius: '5px',
        },
        tableHeader: {
            backgroundColor: '#3e4041',
            color: '#fff'
        },
        verticalLine: {
            borderLeft: '2px solid green',
            height: '35px',
            marginRight : '20px'
        },
        horizontalLine: {
            borderLeft: '5px solid green'
        },
        darkTransparent: {
            backgroundColor: 'rgb(68 63 63 / 50%)',
            text: '#fff',
            height: '10px',
            borderRadius: '5px',
            margin: '5px',
            padding: '0.5px 0.5px',
        }
    };

    return (
        <Screen>
            <Container>
                {/*Crypto Header*/}
                <section container>
                    <div item className="my-2">
                        <div className="m-3">
                            <Typography variant="h5" color="textPrimary" className="fw-bold">
                                Cryptocurrency Prices by Market Cap
                                <small style={{fontSize: '12px'}}>
                                    <Switch checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    Show Status
                                </small>
                            </Typography>
                            <Typography color="textPrimary">
                                The global cryptocurrency market cap today is $2.08
                                Trillion, a
                                <span className="text-danger"> -1.1% </span> change
                                in the last 24 hours <a href={'#'}>Read More</a>
                            </Typography>
                        </div>
                    </div>
                </section>
                {/*Cards Being Checked*/}
                {!checked && (
                    <section className="d-lg-flex d-md-flex d-sm-block flex-row justify-content-between">
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
                    <TabContext value={value} variant="fullWidth">
                        <div sx={{ borderBottom: 1, borderColor: 'divider' ,paddingLeft: 0, marginLeft: 0}} className={'mb-3'}>
                            <TabList
                                onChange={handleTabChanges}
                                aria-label="lab API tabs example"
                                variant="scrollable"
                                allowScrollButtonsMobile
                                scrollButtons
                            >
                                <Button  variant="contained" className={''} style={custom.buttonStyle}>
                                    <Star style={{marginRight : '5px', color:'orange'}} /> Portfolio
                                </Button>
                                <Tab label={'Watchlist'} style={custom.buttonStyle} value='2'>
                                    {/*<Button variant="contained" value='2' className={'btn btn-primary'} style={custom.buttonStyle}>*/}
                                    {/*    Watchlist*/}
                                    {/*</Button>*/}
                                </Tab>

                                <hr style={custom.verticalLine} />
                                <Tab label="Cryptocurrency" value="1" style={custom.tabStyle}/>
                                <Tab label="Cryptogazing" value="3" style={custom.tabStyle}/>
                                <Tab label="Category" value="4" style={custom.tabStyle}/>
                                <Tab label="Recently Added" value="6" style={custom.tabStyle}/>
                                <Tab label="Gainers and Losers" value="5" style={custom.tabStyle}/>
                                <Tab label="Heatmap" value="7" style={custom.tabStyle}/>

                                {/*Show up only when table views is clicked*/}

                                    <Button style={custom.listGridStyle}>
                                        <List />
                                    </Button>
                            </TabList>
                        <Divider flexItem />
                        </div>
                        <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                            {/*Portfolio*/}
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 720 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}  className="text-secondary"><strong>#</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Coin</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Price</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Volume (24h)</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Mkt Cap</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Change(24h)</strong></TableCell>
                                                <TableCell style={{
                                                    backgroundColor: '#3e4041',
                                                    color: '#fff',
                                                }}   className="text-secondary"><strong>Price Graph</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {coins
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, id) => {
                                                    return (
                                                            <TableRow hover role="checkbox"  key={row.id}>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`} className={'text-secondary'}>
                                                                            <StarOutline />
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <Link to={`/knowledge_center/${row.id}`}>
                                                                            {id + 1}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>
                                                                            <img src={row.image.small} alt={'coin image'} height="25px"/>
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                            {row.name}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>
                                                                            <span style={{textTransform: 'uppercase'}}>
                                                                                {row.symbol}
                                                                            </span>
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>
                                                                           ${row.market_data.current_price.usd}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>
                                                                            ${row.market_data.total_volume.usd}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>
                                                                            ${row.market_data.market_cap.usd}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell className={'text-danger'}>
                                                                        <Link to={`/knowledge_center/${row.id}`}  className={'text-danger'}>
                                                                            {row.market_data.price_change_24h_in_currency.usd}%
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                    {/*    Price Graph*/}
                                                                    </TableCell>
                                                                    {/*<TableCell className={'text-danger'}>*/}
                                                                    {/*    <Link to={`/knowledge_center/${row.id}`}  className={'text-theme'}>*/}
                                                                    {/*        {row.price_change_percentage_24h}%*/}
                                                                    {/*    </Link>*/}
                                                                    {/*</TableCell>*/}
                                                            </TableRow>

                                                    );
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[50, 100, 150]}
                                    component="div"
                                    count={coins.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </TabPanel>
                        <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                            {/*Watchlist*/}
                            <Card>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            backgroundColor: '#3e4041',
                                                            color: '#fff',
                                                        }}>
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                                <div className="m-5 text-center">
                                    <h4><strong>Your Watchlist is empty</strong></h4>
                                    <p>Start building your watchlist by clicking button bellow</p>
                                    <button className=" btn btn-primary m-2">Add Coins</button>
                                    <br />
                                    <a className="text-primary">Visit Cryptogazing</a>
                                </div>
                            </Card>
                        </TabPanel>
                        <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                            <CryptoGazing />
                        </TabPanel>
                        <TabPanel value="4" classes={{ root: classes.tabPanelRoot }}>
                            {/*Categories*/}
                            <Card>
                                <Categories />
                            </Card>
                        </TabPanel>
                        <TabPanel value="5" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <GainersAndLosers />
                            </Card>
                        </TabPanel>
                        <TabPanel value="6" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <RecentlyAdded />
                            </Card>
                        </TabPanel>
                        <TabPanel value="7" classes={{ root: classes.tabPanelRoot }}>
                            <Card>
                                <div>
                                    <HeatMap />
                                </div>
                            </Card>
                        </TabPanel>
                    </TabContext>
                </section>
            </Container>
        </Screen>
    );
}
