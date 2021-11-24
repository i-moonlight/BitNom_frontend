import { Skeleton } from '@mui/material';
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
    const [coinsLoaded, setCoinLoaded] = React.useState(false);

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,bitcoin-cash,bitcoin-cash-sv,litecoin,eos,tether,binancecoin,cardano,tezos,ethereum-classic,stellar,monero,tron,dash,chainlink,okb,iota,leo-token&order=market_cap_desc&sparkline=false`;
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then((response) => response.json())
            .then((data) => {
                getCoinList(data);
                setCoinLoaded(true);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setCoinLoaded(false);
                }
            });
    }, []);
    return (
        <>
            <TableContainer>
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
                    {coinsLoaded ? (
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
                    ) : (
                        <TableBody>
                            {[0, 1, 2, 3, 4].map((row) => (
                                <TableRow key={row}>
                                    {[0, 1, 2, 3, 4, 5, 6].map((cell) => (
                                        <TableCell key={cell}>
                                            <Skeleton
                                                animation="wave"
                                                className="mb-2 br-1"
                                                width={'100%'}
                                                variant="text"
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </>
    );
}
