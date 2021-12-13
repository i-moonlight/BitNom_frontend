import { useTheme } from '@emotion/react';
import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentTable } from '../../../../store/actions/cryptoActions';

export default function RecentlyAdded() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const state = useSelector((st) => st);

    const coins = state.crypto?.marketTable;

    useEffect(() => {
        dispatch(fetchRecentTable());
    }, [dispatch]);

    return (
        <>
            <TableContainer className="mx-0">
                <Table aria-label="coins table">
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? '#3e4041'
                                        : '#eeeeee',
                            }}
                        >
                            <TableCell>#</TableCell>
                            <TableCell>Coin</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Volume</TableCell>
                            <TableCell>Market Cap</TableCell>
                            <TableCell>Change(24)</TableCell>
                        </TableRow>
                    </TableHead>
                    {coins?.length > 0 ? (
                        <TableBody>
                            {coins.map((row, id) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {id + 1}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={row.image}
                                            alt={'coin image'}
                                            height="25px"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {row.name}
                                        <span
                                            style={{
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            ({row.symbol})
                                        </span>
                                    </TableCell>
                                    <TableCell>${row.current_price}</TableCell>
                                    <TableCell>${row.total_volume}</TableCell>
                                    <TableCell>${row.market_cap}</TableCell>
                                    <TableCell
                                        className={
                                            row.price_change_percentage_24h < 0
                                                ? 'text-danger'
                                                : 'text-success'
                                        }
                                    >
                                        {row.price_change_percentage_24h}%
                                    </TableCell>
                                </TableRow>
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
