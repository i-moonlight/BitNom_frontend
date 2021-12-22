import { useTheme } from '@emotion/react';
import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import * as React from 'react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketTable } from '../../../../../../store/actions/cryptoActions';
import { convertDate } from '../utils/utilities';

export default function MarketTable() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const state = useSelector((st) => st);
    const market = state.crypto?.marketTable;

    useEffect(() => {
        dispatch(fetchMarketTable());
    }, [dispatch]);

    return (
        <Fragment>
            <TableContainer>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? '#3e4041'
                                        : '#eeeeee',
                            }}
                        >
                            <TableCell>
                                <strong>#</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Sources</strong>
                            </TableCell>
                            <TableCell />
                            <TableCell>
                                <strong>Pair</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Volume</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Volume % </strong>
                            </TableCell>
                            <TableCell>
                                <strong>Confidence</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Liquidity</strong>
                            </TableCell>
                            <TableCell>Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    {market.length > 0 ? (
                        <TableBody>
                            {market.map((row, id) => (
                                <TableRow key={id}>
                                    <TableCell>
                                        {row?.market_cap_rank}
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={row?.image}
                                            alt={'coin image'}
                                            height="25px"
                                        />
                                    </TableCell>
                                    <TableCell>{row?.name}</TableCell>
                                    <TableCell
                                        className={
                                            'text-primary text-uppercase'
                                        }
                                    >
                                        {row?.symbol}
                                    </TableCell>
                                    <TableCell>${row?.current_price}</TableCell>
                                    <TableCell>{row?.total_volume}</TableCell>
                                    <TableCell>
                                        {row?.price_change_percentage_24h}%
                                    </TableCell>
                                    <TableCell align="center">
                                        <span className={'p-1 bg-success br-2'}>
                                            {row?.market_cap_rank}
                                        </span>
                                    </TableCell>
                                    <TableCell>{row?.low_24h}</TableCell>
                                    <TableCell>
                                        {convertDate(row?.atl_date)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            {[0, 1, 2, 3, 4].map((row) => (
                                <TableRow key={row}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
                                        (cell) => (
                                            <TableCell key={cell}>
                                                <Skeleton
                                                    animation="wave"
                                                    className="mb-2 br-1"
                                                    width={'100%'}
                                                    variant="text"
                                                />
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </Fragment>
    );
}
