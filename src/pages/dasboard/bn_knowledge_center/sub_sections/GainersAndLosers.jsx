import { useTheme } from '@emotion/react';
import { ChangeHistorySharp } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
    Divider,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useState } from 'react';

export default function GainersAndLosers() {
    const [value, setValue] = useState('0');

    const theme = useTheme();

    const handleTabChanges = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value}>
                <TabList
                    onChange={handleTabChanges}
                    aria-label="gainers-loosers-tab"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab
                        className="text-capitalize fw-bold"
                        label={'Top Gainers'}
                        value="0"
                    />
                    <Tab
                        className="text-capitalize fw-bold"
                        label={'Top Losers'}
                        value="1"
                    />
                </TabList>
                <Divider flexItem />
                <TabPanel value="0" className="px-0">
                    <div>
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
                                            <strong>Coin</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Volume</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Price</strong>
                                        </TableCell>
                                        <TableCell>
                                            <ChangeHistorySharp />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={Math.random() * 1000}>
                                            <TableCell>
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </TableCell>
                                            <TableCell>{row.coin}</TableCell>
                                            <TableCell>{row.volume}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                                <span className="bg-success p-1 br-2">
                                                    {row.pyramid}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </TabPanel>
                <TabPanel value="1" className="px-0">
                    <div>
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
                                            <strong>Coin</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Volume</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Price</strong>
                                        </TableCell>
                                        <TableCell>
                                            <ChangeHistorySharp />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody variant="scrollable">
                                    {rows.map((row) => (
                                        <TableRow
                                            key={Math.random() * 1000}
                                            tabIndex={-1}
                                        >
                                            <TableCell>
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </TableCell>
                                            <TableCell>{row.coin}</TableCell>
                                            <TableCell>{row.volume}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                                <small className="bg-success p-1 br-2">
                                                    {row.pyramid}
                                                </small>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </TabPanel>
            </TabContext>
        </>
    );
}

function createData(image, coin, volume, price, pyramid) {
    return { image, coin, volume, price, pyramid };
}

const rows = [
    createData(
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png?1547034197',
        'Zcash (ZEC)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png?1612620071',
        'Helium (HNT)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png?1547034197',
        'Zcash (ZEC)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png?1612620071',
        'Helium (HNT)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png?1547034197',
        'Zcash (ZEC)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png?1612620071',
        'Helium (HNT)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/3449/small/tusd.png?1618395665',
        'TrusterCoin',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png?1547034197',
        'Zcash (ZEC)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
    createData(
        'https://assets.coingecko.com/coins/images/4284/small/Helium_HNT.png?1612620071',
        'Helium (HNT)',
        '$384,900',
        '$0.04862845',
        '151670.8%'
    ),
];
