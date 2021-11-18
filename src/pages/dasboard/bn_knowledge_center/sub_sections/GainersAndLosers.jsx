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
                    allowScrollButtonsMobile
                    scrollButtons
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
                <TabPanel value="0">
                    <div>
                        <TableContainer>
                            <Table sx={{}} aria-label="caption table">
                                <TableHead>
                                    <TableRow
                                        style={{
                                            backgroundColor: '#3e4041',
                                            color: '#fff',
                                        }}
                                    >
                                        <TableCell className="text-white">
                                            <strong>Coin</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-white"
                                            align="right"
                                        />
                                        <TableCell
                                            className="text-primary"
                                            align="right"
                                        >
                                            <strong>Volume</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-primary"
                                            align="right"
                                        >
                                            <strong>Price</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-white"
                                            align="right"
                                        >
                                            <ChangeHistorySharp />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={Math.random() * 1000}>
                                            <TableCell align="right">
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-primary"
                                            >
                                                {row.coin}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-primary"
                                            >
                                                {row.volume}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-primary"
                                            >
                                                {row.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <span
                                                    style={{
                                                        backgroundColor:
                                                            '#b4b474',
                                                        borderRadius: '25px',
                                                    }}
                                                >
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
                <TabPanel value="1">
                    <div>
                        <TableContainer>
                            <Table aria-label="caption table">
                                <TableHead>
                                    <TableRow
                                        style={{
                                            backgroundColor: '#3e4041',
                                            color: '#fff',
                                        }}
                                    >
                                        <TableCell className="text-white">
                                            <strong>Coin</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-white"
                                            align="right"
                                        />
                                        <TableCell
                                            className="text-secondary"
                                            align="right"
                                        >
                                            <strong>Volume</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-secondary"
                                            align="right"
                                        >
                                            <strong>Price</strong>
                                        </TableCell>
                                        <TableCell
                                            className="text-white"
                                            align="right"
                                        >
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
                                            <TableCell align="right">
                                                <img
                                                    src={row.image}
                                                    alt={'coin image'}
                                                    height="25px"
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-theme"
                                            >
                                                {row.coin}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-theme"
                                            >
                                                {row.volume}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                className="text-theme"
                                            >
                                                {row.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                <small
                                                    style={{
                                                        backgroundColor:
                                                            '#b4b474',
                                                        borderRadius: '25px',
                                                    }}
                                                >
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
