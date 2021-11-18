/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/18/21
 * Time: 5:43 AM
 */

import { Announcement, EmojiPeople, Home, Message } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Box,
    Card,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

export default function Forum() {
    const [value, setValue] = React.useState('1');
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card>
            <TabContext value={value} className={'m-3'}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        scrollButtons
                        aria-label="lab API tabs example"
                    >
                        {/* <h6 className={'m-3'}>
                            <strong>BitCoin Threads</strong>
                        </h6> */}
                        <Tab label="Recent" value="1" style={custom.tabStyle} />
                        <Tab label="Hot" value="2" style={custom.tabStyle} />
                        <Tab
                            label="Last Month"
                            value="3"
                            style={custom.tabStyle}
                        />
                    </TabList>
                </Box>
                <TabPanel value="1" classes={{ root: classes.tabPanelRoot }}>
                    <div className={'row mt-3'}>
                        <Card className={'col-sm-12 col-md-3 col-lg-3'}>
                            <h4 style={{ marginLeft: '25px' }}>
                                <strong>Category</strong>
                            </h4>
                            <div className={'m-3'}>
                                <p>
                                    <Home /> General Discussion
                                </p>
                                <p>
                                    <EmojiPeople /> Ideas
                                </p>
                                <p>
                                    <Announcement /> Announcement
                                </p>
                                <p>
                                    <Message /> Q&amp;A
                                </p>
                            </div>
                        </Card>
                        <div className={'col-sm-12 col-md-9 col-lg-9'}>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell align="right">
                                                Open*
                                            </TableCell>
                                            <TableCell align="right">
                                                High
                                            </TableCell>
                                            <TableCell align="right">
                                                Low
                                            </TableCell>
                                            <TableCell align="right">
                                                Close**
                                            </TableCell>
                                            <TableCell align="right">
                                                Volume
                                            </TableCell>
                                            <TableCell align="right">
                                                Market Cap
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, id) => (
                                            <TableRow
                                                key={id}
                                                sx={{
                                                    '&:last-child td, &:last-child th':
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.date}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.open}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.high}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.low}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.close}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.volume}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.market_cap}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2" classes={{ root: classes.tabPanelRoot }}>
                    .
                </TabPanel>
                <TabPanel value="3" classes={{ root: classes.tabPanelRoot }}>
                    .
                </TabPanel>
            </TabContext>
        </Card>
    );
}

const useStyles = makeStyles({
    tabPanelRoot: {
        padding: '25px 0',
    },
});

const custom = {
    darkTransparent: {
        backgroundColor: 'rgb(68 63 63 / 50%)',
        text: '#fff',
        height: '10px',
        borderRadius: '5px',
        margin: '5px',
        padding: '0.5px 0.5px',
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

function createData(date, open, high, low, close, volume, market_cap) {
    return { date, open, high, low, close, volume, market_cap };
}

const rows = [
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
];
