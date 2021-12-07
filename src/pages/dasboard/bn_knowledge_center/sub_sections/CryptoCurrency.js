import { StarOutline } from '@mui/icons-material';
import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/system';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCryptoTable } from '../../../../store/actions/cryptoActions';
import PriceGraph from '../bn_charts/PriceGraph';

// const PriceGraph = React.lazy(() => import('../bn_charts/PriceGraph'));

export default function CryptoCurrencyPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

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
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <strong>#</strong>
                            </StyledTableCell>
                            <StyledTableCell />
                            <StyledTableCell>
                                <strong>Coin</strong>
                            </StyledTableCell>
                            <StyledTableCell />
                            <StyledTableCell />
                            <StyledTableCell>
                                <strong>Price</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Volume (24h)</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Mkt Cap</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Change(24h)</strong>
                            </StyledTableCell>
                            <StyledTableCell>
                                <strong>Price Graph</strong>
                            </StyledTableCell>
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
                                        <StyledTableRow
                                            hover
                                            role="checkbox"
                                            key={row.id}
                                            className={'c-pointer'}
                                            onClick={() => {
                                                history.push(
                                                    `/knowledge_center/cryptocurrency/${row.id}`
                                                );
                                            }}
                                        >
                                            <StyledTableCell>
                                                <StarOutline />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {id + 1}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <span
                                                    style={{
                                                        textTransform:
                                                            'uppercase',
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                ${row.current_price}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                ${row.total_volume}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                ${row.market_cap}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className={'text-danger'}
                                            >
                                                {
                                                    row.price_change_percentage_24h
                                                }
                                                %
                                            </StyledTableCell>
                                            <StyledTableCell>
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
                                            </StyledTableCell>
                                        </StyledTableRow>
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
