/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/5/21
 * Time: 1:35 AM
 */
import { StarOutline } from '@mui/icons-material';
import {
    Skeleton,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CryptoCurrencyPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [coins, getCoins] = useState([]);
    const [coinIsLoaded, checkLoadedCoin] = useState(false);

    const history = useHistory();

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins')
            .then((response) => response.json())
            .then((data) => {
                getCoins(data);
                checkLoadedCoin(true);
            })
            .catch(() => {});
    }, []);

    return (
        <>
            <TableContainer sx={{ maxHeight: 720 }}>
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

                    {coinIsLoaded ? (
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
                                                    src={row.image.small}
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
                                                $
                                                {
                                                    row.market_data
                                                        .current_price.usd
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                $
                                                {
                                                    row.market_data.total_volume
                                                        .usd
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                $
                                                {row.market_data.market_cap.usd}
                                            </StyledTableCell>
                                            <StyledTableCell
                                                className={'text-danger'}
                                            >
                                                {
                                                    row.market_data
                                                        .price_change_24h_in_currency
                                                        .usd
                                                }
                                                %
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {/*<Sparklines*/}
                                                {/*    data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20}>*/}
                                                {/*</Sparklines>*/}
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
            {coinIsLoaded && (
                <TablePagination
                    rowsPerPageOptions={[50, 100, 150]}
                    component="div"
                    count={coins.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
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
