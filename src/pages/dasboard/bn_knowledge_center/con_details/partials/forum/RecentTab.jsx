import { Announcement, EmojiPeople, Home, Message } from '@mui/icons-material';
import { AvatarGroup } from '@mui/lab';
import {
    Avatar,
    Button,
    Card,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { green } from '@mui/material/colors';
import * as React from 'react';
import { Fragment } from 'react';
import { useStyles } from '../utils/styles';

export default function RecentTab() {
    const btnColor = useStyles();
    return (
        <>
            <Fragment>
                <div className={'row mt-3'}>
                    <Card
                        className={'col-sm-12 col-md-3 col-lg-3'}
                        style={{ height: '30vw' }}
                    >
                        <h5 className={'mt-2'}>
                            <strong>Category</strong>
                        </h5>
                        <div className={'m-3 h-70'}>
                            <div>
                                <Button
                                    color={'inherit'}
                                    className={` ${btnColor.categoryActive}`}
                                >
                                    <Home className={'me-3'} /> General
                                    Discussion
                                </Button>
                            </div>
                            <div>
                                <Button
                                    color={'inherit'}
                                    className={` ${btnColor.categoryNormal}`}
                                >
                                    <EmojiPeople className={'me-3'} /> Ideas
                                </Button>
                            </div>
                            <div>
                                <Button
                                    color={'inherit'}
                                    className={` ${btnColor.categoryNormal}`}
                                >
                                    <Announcement className={'me-3'} />{' '}
                                    Announcement
                                </Button>
                            </div>
                            <div>
                                <Button
                                    color={'inherit'}
                                    className={` ${btnColor.categoryNormal}`}
                                >
                                    <Message
                                        color={'inherit'}
                                        className={'me-3'}
                                    />{' '}
                                    Q&amp;A
                                </Button>
                            </div>
                        </div>
                        <section>
                            <img src={adUrl} height={300} width={270} />
                            <a className={'float-md-end'}>Bitnorm</a>
                        </section>
                    </Card>
                    <div className={'col-sm-12 col-md-9 col-lg-9'}>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={'fw-bold'}>
                                            Topic
                                        </TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell
                                            className={'fw-bold'}
                                            align="right"
                                        >
                                            Replies
                                        </TableCell>
                                        <TableCell
                                            className={'fw-bold'}
                                            align="right"
                                        >
                                            Views
                                        </TableCell>
                                        <TableCell
                                            className={'fw-bold'}
                                            align="right"
                                        >
                                            Activity
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
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <Avatar
                                                    alt={'Topic'}
                                                    src={row.topic}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <p>{row.discussion}</p>
                                                <p>
                                                    By{' '}
                                                    <a href={'#'}>Don Phelix</a>{' '}
                                                    On {row.date}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <AvatarGroup
                                                    max={4}
                                                    color={'red'}
                                                >
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src="https://picsum.photos/200"
                                                        color={'inherit'}
                                                        style={{
                                                            border: '0.1px solid lightgray',
                                                        }}
                                                    />

                                                    <Avatar
                                                        alt="Travis Howard"
                                                        src="https://picsum.photos/seed/picsum/200"
                                                        style={{
                                                            border: '0.1px solid lightgray',
                                                        }}
                                                    />
                                                    <Avatar
                                                        alt="Cindy Baker"
                                                        src="https://picsum.photos/200/300?grayscale"
                                                        style={{
                                                            border: '0.1px solid lightgray',
                                                        }}
                                                    />
                                                    <Avatar
                                                        alt="Agnes Walker"
                                                        src="https://picsum.photos/id/237/200/300"
                                                        style={{
                                                            border: '0.1px solid lightgray',
                                                        }}
                                                    />
                                                    <Avatar
                                                        alt="Trevor Henderson"
                                                        src="https://picsum.photos/200"
                                                        style={{
                                                            border: '0.1px solid lightgray',
                                                        }}
                                                    />
                                                </AvatarGroup>
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.replies}
                                            </TableCell>
                                            <TableCell align="right">
                                                {row.views}
                                            </TableCell>
                                            <TableCell>
                                                <div className={'d-flex'}>
                                                    <Avatar
                                                        src={row.activity}
                                                        alt={'Activity'}
                                                        sx={{
                                                            bgcolor: green[500],
                                                        }}
                                                        variant="rounded"
                                                    />
                                                    <a
                                                        className={'m-1'}
                                                        href={'#'}
                                                    >
                                                        Don
                                                    </a>
                                                </div>
                                                <span>25 Mins Ago</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Fragment>
        </>
    );
}

const adUrl = `https://media.istockphoto.com/photos/bitcoin-cryptocurrency-trends-graphs-and-charts-picture-id1294303237?k=20&m=1294303237&s=612x612&w=0&h=0-igz1A4-GdGa-ApF4Mvyxc4-NLjcZ6DFNWW4ptVFYA=`;

function createData(date, topic, discussion, avatar, replies, views, activity) {
    return { date, topic, discussion, avatar, replies, views, activity };
}

const rows = [
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
    createData(
        `Oct 04, 2021`,
        'https://picsum.photos/200/300?random=1',
        'Introducing nodix, blockchain for decentralized',
        'url',
        '8',
        '254',
        'https://picsum.photos/200/300?random=1'
    ),
    createData(
        'Oct 04, 2021',
        'https://picsum.photos/200',
        'Introducing nodix, blockchain for decentralized',
        'avatart',
        '12',
        '6',
        'https://picsum.photos/200'
    ),
];
