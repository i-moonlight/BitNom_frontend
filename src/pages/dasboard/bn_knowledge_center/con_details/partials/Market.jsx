/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/17/21
 * Time: 9:43 AM
 */

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Box,
    Card, Paper,
    Tab,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});

function manageData(
    numbers,
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
        numbers,
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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
    manageData(
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

export default function Market() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    const custom = {
        tabStyle: {
            textTransform: 'capitalize',
            backgroundColor: 'rgb(68 63 63 / 50%)',
            borderRadius: '5px',
            marginRight: '5px',
            fontWeight: 'bold',
        },
        coinsBorder: {
            borderLeft: '5px solid blue',
            minWidth: '250px',
        },
    };

    return (
        <Card sx={{ width: '100%', typography: 'body1' }}>
            <div className={'m-3'}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            variant="scrollable"
                            allowScrollButtonsMobile
                            scrollButtons
                            aria-label="Bitcoin markets tabs">
                            <h6 className={'m-3'}>
                                <strong>BitCoin Markets</strong>
                            </h6>
                            <Tab label="Spot" value="1" style={custom.tabStyle}/>
                            <Tab label="Perpetual" value="2" style={custom.tabStyle}/>
                            <Tab label="Futures" value="3" style={custom.tabStyle}/>
                        </TabList>
                    </Box>
                    <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                        <Paper sx={{width: '100%', overflow: 'hidden'}}>
                            <TableContainer sx={{maxHeight: 440}}>
                                <Table stickyHeader aria-label="caption table">
                                    <TableHead>
                                        <TableRow style={{
                                                backgroundColor: '#3e4041',
                                                color: '#fff',
                                            }}>
                                            <TableCell className="text-white">
                                                <strong>#</strong>
                                            </TableCell>
                                            <TableCell
                                                className="text-white"
                                                align="right"
                                            >
                                                <strong>Sources</strong>
                                            </TableCell>
                                            <TableCell align="right" />
                                            <TableCell
                                                align="right"
                                                className={'text-primary'}
                                            >
                                                <strong>Pair</strong>
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
                                            <TableRow key={row.numbers}>
                                                <TableCell align="right">
                                                    {row.numbers}
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
                        </Paper>
                    </TabPanel>
                    <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                        .
                    </TabPanel>
                    <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                        .
                    </TabPanel>
                </TabContext>
            </div>
        </Card>
    );
}
