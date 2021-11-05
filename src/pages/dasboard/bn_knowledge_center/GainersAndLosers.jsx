/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/11/21
 * Time: 10:54 PM
 */
import { ChangeHistorySharp } from '@mui/icons-material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

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

export default function GainersAndLosers() {
    return (
        <div>
            <div className="d-lg-flex d-md-flex d-sm-block justify-content-evenly">
                <div className="mb-5">
                    <h4 className="fw-bold m-3">Top Gainers</h4>
                    <p>24h Volume is above USD $50,000</p>
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
                                    <TableRow key={row.name}>
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
                                                    backgroundColor: '#b4b474',
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
                <div className={'mb-5'}>
                    <h4 className="fw-bold m-3">Top Losers</h4>
                    <p>24h Volume is above USD $50,000</p>
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
                            <TableBody
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                {rows.map((row) => (
                                    <TableRow key={row.name} tabIndex={-1}>
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
                                                    backgroundColor: '#b4b474',
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
            </div>
        </div>
    );
}
