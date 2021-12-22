import { useTheme } from '@emotion/react';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import { Button } from '../../../../components/Button';

export default function WatchList() {
    const theme = useTheme();

    return (
        <Fragment>
            <TableContainer>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? '#3e4041'
                                        : '#eeeeee',
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <Typography
                component="div"
                color="textPrimary"
                className="m-5 text-center"
            >
                <h4>
                    <strong>Your Watchlist is empty</strong>
                </h4>
                <p>Start building your watchlist by clicking button bellow</p>
                <Button className="mb-3" color="primary" textCase>
                    Add Coins
                </Button>
                <br />
                <Button color="primary" variant="text" textCase>
                    Visit Cryptogazing
                </Button>
            </Typography>
        </Fragment>
    );
}

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
