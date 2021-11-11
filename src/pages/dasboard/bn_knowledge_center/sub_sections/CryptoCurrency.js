/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 11/5/21
 * Time: 1:35 AM
 */
import {StarOutline } from '@mui/icons-material';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TablePagination,
    CircularProgress, Card
} from '@mui/material';
import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function CryptoCurrency()
{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [coins, getCoins] = useState([]);
    const [coinIsLoaded, checkLoadedCoin] = useState(false);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() =>
    {
        fetch('https://api.coingecko.com/api/v3/coins')
            .then((response) => response.json())
            .then((data) => {
                getCoins(data);
                checkLoadedCoin(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return(
        <Fragment>
            {coinIsLoaded ? (
                <>
                    <TableContainer sx={{ maxHeight: 720 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff'}}
                                        className="text-secondary"
                                    >
                                        <strong>#</strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    />
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>Coin</strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    />
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    />
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>Price</strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>
                                            Volume (24h)
                                        </strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>Mkt Cap</strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>Change(24h)</strong>
                                    </TableCell>
                                    <TableCell
                                        style={{backgroundColor: '#3e4041', color: '#fff',}}
                                        className="text-secondary"
                                    >
                                        <strong>Price Graph</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {coins
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, id) => {
                                        return (
                                            <TableRow hover role="checkbox" key={row.id}>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-secondary'}>
                                                        <StarOutline />
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/knowledge_center/${row.id}`}>
                                                        {id + 1}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-theme'}>
                                                        <img src={row.image.small} alt={'coin image'} height="25px"/>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-theme'}>
                                                <span style={{textTransform: 'uppercase',}}>
                                                    {row.symbol}
                                                </span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-theme'}>
                                                        ${row.market_data.current_price.usd}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-theme'}>
                                                        ${row.market_data.total_volume.usd}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-theme'}>
                                                        ${row.market_data.market_cap.usd}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className={'text-danger'}>
                                                    <Link to={`/knowledge_center/${row.id}`} className={'text-danger'}>
                                                        {row.market_data.price_change_24h_in_currency.usd}%
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {/*<Sparklines*/}
                                                    {/*    data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20}>*/}
                                                    {/*</Sparklines>*/}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[50, 100, 150]}
                        component="div"
                        count={coins.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </>
            ) : (
                <Card className={'text-danger text-center'}>
                    <CircularProgress color="secondary" />
                </Card>
            )}

        </Fragment>);
}
