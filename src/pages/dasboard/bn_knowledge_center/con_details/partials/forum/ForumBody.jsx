import { useTheme } from '@emotion/react';
import { Announcement, EmojiPeople, Home, Message } from '@mui/icons-material';
import { AvatarGroup } from '@mui/lab';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../../components/Button';

export default function ForumBody() {
    const [activeMenu, setActiveMenu] = useState('General Discussion');

    const theme = useTheme();
    const activeBG = `${theme.palette.primary.main}22`;

    return (
        <>
            <Grid className="mt-3" container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <Card>
                        <CardHeader subheader="Category" />
                        <CardContent>
                            {menuItems.map(({ title, icon }) => (
                                <Button
                                    key={title}
                                    textCase
                                    variant="text"
                                    startIcon={icon}
                                    className={`me-2 mb-2`}
                                    sx={{
                                        backgroundColor:
                                            activeMenu === title && activeBG,
                                    }}
                                    onClick={() => setActiveMenu(title)}
                                >
                                    {title}
                                </Button>
                            ))}

                            <section>
                                <div
                                    className="w-100 bg-success br-1"
                                    style={{
                                        backgroundImage: `url("${adUrl}")`,
                                        height: 200,
                                    }}
                                ></div>
                            </section>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow
                                    style={{
                                        backgroundColor:
                                            theme.palette.mode === 'dark'
                                                ? '#3e4041'
                                                : '#eeeeee',
                                    }}
                                >
                                    <TableCell className={'fw-bold'}>
                                        Topic
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className={'fw-bold'}>
                                        Replies
                                    </TableCell>
                                    <TableCell className={'fw-bold'}>
                                        Views
                                    </TableCell>
                                    <TableCell className={'fw-bold'}>
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
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Avatar
                                                alt={'Topic'}
                                                src={row.topic}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {row.discussion}
                                            </Typography>
                                            <Typography
                                                noWrap={true}
                                                variant="body2"
                                            >
                                                By <a href={'#'}>Don Phelix</a>{' '}
                                                On {row.date}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <AvatarGroup max={4} color={'red'}>
                                                {[1, 2, 3, 4, 5, 6, 7].map(
                                                    (reply) => (
                                                        <Avatar
                                                            key={reply}
                                                            alt="Remy Sharp"
                                                            src={`https://picsum.photos/${Math.floor(
                                                                Math.random() *
                                                                    100
                                                            )}`}
                                                            color={'inherit'}
                                                            style={{
                                                                border: '0.1px solid lightgray',
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </AvatarGroup>
                                        </TableCell>
                                        <TableCell>{row.replies}</TableCell>
                                        <TableCell>{row.views}</TableCell>
                                        <TableCell>
                                            <div className={'d-flex'}>
                                                <Avatar
                                                    className={'me-2'}
                                                    src={row.activity}
                                                    variant="rounded"
                                                    sx={{
                                                        bgcolor: green[500],
                                                    }}
                                                />
                                                <div>
                                                    <Link>Don</Link>
                                                    <Typography
                                                        noWrap={true}
                                                        variant="body2"
                                                    >
                                                        25 Mins Ago
                                                    </Typography>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}

const adUrl = `https://media.istockphoto.com/photos/bitcoin-cryptocurrency-trends-graphs-and-charts-picture-id1294303237?k=20&m=1294303237&s=612x612&w=0&h=0-igz1A4-GdGa-ApF4Mvyxc4-NLjcZ6DFNWW4ptVFYA=`;

const menuItems = [
    { title: 'General Discussion', icon: <Home /> },
    { title: 'Ideas', icon: <EmojiPeople /> },
    { title: 'Announcement', icon: <Announcement /> },
    { title: 'Q&A', icon: <Message /> },
];

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
