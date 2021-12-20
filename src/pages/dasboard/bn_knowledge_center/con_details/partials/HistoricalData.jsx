import { useTheme } from '@emotion/react';
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
    const theme = useTheme();

    return (
        <Typography color={'textPrimary'} component="div">
            <div className={'m-3'}>
                <div className={'mb-3 d-flex justify-content-between'}>
                    <h3>Historical Data For Bitcoin</h3>
                    {/* <Button textCase endIcon={<DateRange />}>
                        Date Range
                    </Button> */}
                </div>

                <div>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className={'bg-secondary'}>
                                <TableRow
                                    style={{
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? '#3e4041'
                                                : '#eeeeee',
                                    }}
                                >
                                    <TableCell>Date</TableCell>
                                    <TableCell>Open</TableCell>
                                    <TableCell>High</TableCell>
                                    <TableCell>Low</TableCell>
                                    <TableCell>Close**</TableCell>
                                    <TableCell>Volume</TableCell>
                                    <TableCell>Market Cap</TableCell>
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
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.open}</TableCell>
                                        <TableCell>{row.high}</TableCell>
                                        <TableCell>{row.low}</TableCell>
                                        <TableCell>{row.close}</TableCell>
                                        <TableCell>{row.volume}</TableCell>
                                        <TableCell>{row.market_cap}</TableCell>
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
