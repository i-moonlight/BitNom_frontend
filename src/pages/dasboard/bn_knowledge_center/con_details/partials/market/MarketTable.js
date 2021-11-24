/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/19/21
 * Time: 12:30 PM
 */
import { Fragment, useEffect, useState } from 'react';
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
import { convertDate } from '../utils/utilities';

export default function MarketTable() {
    const [market, getMarket] = useState({});
    const [isMarket, checkLoadedMarket] = useState(false);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then((response) => response.json())
            .then((data) => {
                getMarket(data);
                checkLoadedMarket(true);
            });
    }, []);
    return (
        <Fragment>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="caption table">
                    <TableHead>
                        <TableRow
                            style={{
                                backgroundColor: '#3e4041',
                                color: '#fff',
                            }}
                        >
                            <TableCell className="text-white">
                                <strong>#</strong>
                            </TableCell>
                            <TableCell className="text-white" align="right">
                                <strong>Sources</strong>
                            </TableCell>
                            <TableCell align="right" />
                            <TableCell align="right" className={'text-primary'}>
                                <strong>Pair</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>Price</strong>
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
                            <TableCell className="text-white" align="right">
                                Updated
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {isMarket ? (
                        <TableBody>
                            {market.map((row, id) => (
                                <TableRow key={id}>
                                    <TableCell align="right">
                                        {row?.market_cap_rank}
                                    </TableCell>
                                    <TableCell align="right">
                                        <img
                                            src={row?.image}
                                            alt={'coin image'}
                                            height="25px"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {row?.name}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={
                                            'text-primary text-uppercase'
                                        }
                                    >
                                        {row?.symbol}
                                    </TableCell>
                                    <TableCell align="right">
                                        ${row?.current_price}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row?.total_volume}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row?.price_change_percentage_24h}%
                                    </TableCell>
                                    <TableCell align="right">
                                        <span
                                            style={{
                                                backgroundColor: '#b4b474',
                                                borderRadius: '15px',
                                            }}
                                        >
                                            <span className={'m-1'}>
                                                {row?.market_cap_rank}
                                            </span>
                                        </span>
                                    </TableCell>
                                    <TableCell align="right">
                                        {row?.low_24h}
                                    </TableCell>
                                    <TableCell align="right">
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
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=35&page=1&sparkline=true`;
