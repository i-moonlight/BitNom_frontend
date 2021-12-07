import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentTable } from '../../../../store/actions/cryptoActions';

export default function RecentlyAdded() {
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const coins = state.crypto?.marketTable;

    useEffect(() => {
        dispatch(fetchRecentTable());
    }, [dispatch]);

    return (
        <>
            <TableContainer>
                <Table aria-label="coins table" stickyHeader>
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
                    {coins?.length > 0 ? (
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
