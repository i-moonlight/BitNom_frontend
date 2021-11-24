import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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

export default function Categories() {
    const [categories, setCategories] = React.useState([]);
    const [categoryLoaded, setCategoriesLoaded] = React.useState(false);

    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/categories`;
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
                setCategoriesLoaded(true);
            })
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    setCategoriesLoaded(false);
                }
            });
    }, []);

    return (
        <TableContainer>
            <Table
                sx={{ maxHeight: 500 }}
                aria-label="coins table"
                stickyHeader
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Market Cap</StyledTableCell>
                        <StyledTableCell>Market Change (24h)</StyledTableCell>
                        <StyledTableCell>Volume (24h)</StyledTableCell>
                    </TableRow>
                </TableHead>
                {categoryLoaded ? (
                    <TableBody>
                        {categories.map((row, id) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {id + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>
                                    ${row.market_cap}
                                </StyledTableCell>
                                <StyledTableCell className={'text-danger'}>
                                    {row.market_cap_change_24h}%
                                </StyledTableCell>
                                <StyledTableCell>
                                    ${row.volume_24h}
                                </StyledTableCell>
                            </StyledTableRow>
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
