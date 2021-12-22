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
import { fetchCategoryTable } from '../../../../store/actions/cryptoActions';

export default function Categories() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const categories = state.crypto?.categoryTable;

    useEffect(() => {
        dispatch(fetchCategoryTable());
    }, [dispatch]);

    return (
        <TableContainer>
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
                        <TableCell>Name</TableCell>
                        <TableCell>Market Cap</TableCell>
                        <TableCell>Market Change (24h)</TableCell>
                        <TableCell>Volume (24h)</TableCell>
                    </TableRow>
                </TableHead>
                {categories?.length > 0 ? (
                    <TableBody>
                        {categories.map((row, id) => (
                            <TableRow key={row.name}>
                                <TableCell>{id + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>${row.market_cap}</TableCell>
                                <TableCell
                                    className={
                                        row.market_cap_change_24h < 0
                                            ? 'text-danger'
                                            : 'text-success'
                                    }
                                >
                                    {row.market_cap_change_24h}%
                                </TableCell>
                                <TableCell>${row.volume_24h}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <TableBody>
                        {[0, 1, 2, 3, 4].map((row) => (
                            <TableRow key={row}>
                                {[0, 1, 2, 3, 4].map((cell) => (
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
    );
}
