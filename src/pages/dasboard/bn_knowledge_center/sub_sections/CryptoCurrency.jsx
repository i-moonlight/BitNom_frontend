import { useTheme } from '@emotion/react';
// import { StarOutline } from '@mui/icons-material';
import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCryptoTable } from '../../../../store/actions/cryptoActions';
import PriceGraph from '../bn_charts/PriceGraph';

// const PriceGraph = React.lazy(() => import('../bn_charts/PriceGraph'));

export default function CryptoCurrencyPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((st) => st);
    const coins = state.crypto?.cryptoTable;

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(fetchCryptoTable());
    }, [dispatch]);

    return (
        <>
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
                            {/* <TableCell /> */}
                            <TableCell>
                                <strong>#</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Coin</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Name</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Symbol</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Volume (24h)</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Mkt Cap</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Change(24h)</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price Graph</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {coins?.length > 0 ? (
                        <TableBody>
                            {coins
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, id) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            key={row.id}
                                            className={'c-pointer'}
                                            onClick={() => {
                                                history.push(
                                                    `/knowledge_center/cryptocurrencies/${row.id}`
                                                );
                                            }}
                                        >
                                            {/* <TableCell>
                                                <StarOutline />
                                            </TableCell> */}
                                            <TableCell>{id + 1}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>
                                                <span
                                                    style={{
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                ${row.current_price}
                                            </TableCell>
                                            <TableCell>
                                                ${row.total_volume}
                                            </TableCell>
                                            <TableCell>
                                                ${row.market_cap}
                                            </TableCell>
                                            <TableCell
                                                className={
                                                    row.price_change_percentage_24h <
                                                    0
                                                        ? 'text-danger'
                                                        : 'text-success'
                                                }
                                            >
                                                {
                                                    row.price_change_percentage_24h
                                                }
                                                %
                                            </TableCell>
                                            <TableCell>
                                                <Suspense
                                                    fallback={
                                                        <div>Loading...</div>
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            width: '120px',
                                                            height: 40,
                                                        }}
                                                    >
                                                        <PriceGraph
                                                            sparkline={
                                                                row.sparkline_in_7d
                                                            }
                                                        />
                                                    </div>
                                                </Suspense>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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

            <TablePagination
                rowsPerPageOptions={[50, 100, 150]}
                component="div"
                count={coins.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
