/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/4/21
 * Time: 9:06 PM
 */
import { Card, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
export default function RecentlyAdded() {
    const [coins, getCoinList] = React.useState([]);
    const [coinsLoaded, coinLoaded] = React.useState(false);

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,bitcoin-cash,bitcoin-cash-sv,litecoin,eos,tether,binancecoin,cardano,tezos,ethereum-classic,stellar,monero,tron,dash,chainlink,okb,iota,leo-token&order=market_cap_desc&sparkline=false`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                getCoinList(data);
                coinLoaded(true);
            })
            .catch(coinLoaded(false));
    }, []);
    return (
        <>
            {coinsLoaded ? (
                <TableContainer component={Paper}>
                    <Table
                        sx={{ maxHeight: 500 }}
                        aria-label="coins table"
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell align="right">
                                    Coin
                                </StyledTableCell>
                                <StyledTableCell align="right" />
                                <StyledTableCell align="right">
                                    Price
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Volume
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Market Cap
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    Change(24)
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coins.map((row, id) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {id + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <img
                                            src={row.image}
                                            alt={'coin image'}
                                            height="25px"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {row.name}
                                        <span
                                            style={{
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            ({row.symbol})
                                        </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        ${row.current_price}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        ${row.total_volume}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        ${row.market_cap}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="right"
                                        className={'text-danger'}
                                    >
                                        {row.price_change_percentage_24h}%
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Card className={'text-danger text-center'}>
                    <CircularProgress color="secondary" />
                </Card>
            )}
        </>
    );
}
