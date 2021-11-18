import { DateRange } from '@mui/icons-material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

export default function HistoricalData() {
    return (
        <Typography color={'textPrimary'} component="div">
            <div className={'m-3'}>
                <div className={'mb-3 d-flex justify-content-between'}>
                    <h3>Historical Data For Bitcoin</h3>
                    <a className={'btn btn-secondary'}>
                        Date Range <DateRange />
                    </a>
                </div>
                <hr />
                <div>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className={'bg-secondary'}>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Open</TableCell>
                                    <TableCell align="right">High</TableCell>
                                    <TableCell align="right">Low</TableCell>
                                    <TableCell align="right">Close**</TableCell>
                                    <TableCell align="right">Volume</TableCell>
                                    <TableCell align="right">
                                        Market Cap
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, id) => (
                                    <TableRow
                                        key={id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.date}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.open}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.high}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.low}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.close}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.volume}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.market_cap}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Typography>
    );
}

function createData(date, open, high, low, close, volume, market_cap) {
    return { date, open, high, low, close, volume, market_cap };
}

const rows = [
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
    createData(
        'Oct 04, 2021',
        '$48,208.91',
        '$49,208.91',
        '$47,208.91',
        '$48,208.91',
        '$48,208,897.91',
        '$48,208,897.91'
    ),
];
