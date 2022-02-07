import { CircleOutlined, CircleRounded } from '@mui/icons-material';
import { AvatarGroup } from '@mui/lab';
import {
    Avatar,
    Card,
    CardContent,
    Divider,
    Grid,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../../components/Button';

export default function ForumBody() {
    const mdDown = useMediaQuery('(max-width:1279px)');

    return (
        <>
            <Grid className="mt-3" container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <CategorySection />
                    {mdDown && (
                        <div className="mt-2">
                            <DescriptionSection />
                            <ForumStatsSection />
                            <TrendingSection />
                        </div>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={6}>
                    <DiscussionSection />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={3}>
                    {!mdDown && (
                        <div>
                            <DescriptionSection />
                            <ForumStatsSection />
                            <TrendingSection />
                        </div>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

const CategorySection = () => {
    const [activeMenu, setActiveMenu] = useState('General Discussion');

    const theme = useTheme();
    const activeBG = `${theme.palette.primary.main}22`;

    return (
        <Card>
            <CardContent>
                <Typography className="mb-2">Category</Typography>
                {menuItems.map(({ title, theme: iconTheme }) => (
                    <div key={title}>
                        <Button
                            color="inherit"
                            textCase
                            variant="text"
                            startIcon={
                                activeMenu === title ? (
                                    <CircleRounded color={`${iconTheme}`} />
                                ) : (
                                    <CircleOutlined color={`${iconTheme}`} />
                                )
                            }
                            className={`d-inline-block`}
                            onClick={() => setActiveMenu(title)}
                        >
                            {title}
                        </Button>
                    </div>
                ))}

                <div
                    className="w-100 bg-success br-1 mt-3 mb-2"
                    style={{
                        backgroundImage: `url("${adUrl}")`,
                        height: 200,
                    }}
                ></div>

                <Button
                    sx={{
                        backgroundColor: activeBG,
                    }}
                    variant="text"
                    textCase
                    fullWidth
                >
                    Request Category
                </Button>
            </CardContent>
        </Card>
    );
};

const DiscussionSection = () => {
    const theme = useTheme();

    return (
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
                        <TableCell className={'fw-bold'}>Topic</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className={'fw-bold'}>Replies</TableCell>
                        <TableCell className={'fw-bold'}>Views</TableCell>
                        <TableCell className={'fw-bold'}>Activity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, id) => (
                        <TableRow
                            key={id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Avatar alt={'Topic'} src={row.topic} />
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {row.discussion}
                                </Typography>
                                <Typography noWrap={true} variant="body2">
                                    By <a href={'#'}>Don Phelix</a> On{' '}
                                    {row.date}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <AvatarGroup max={4} color={'red'}>
                                    {[1, 2, 3, 4, 5, 6, 7].map((reply) => (
                                        <Avatar
                                            key={reply}
                                            alt="Remy Sharp"
                                            src={`https://picsum.photos/${Math.floor(
                                                Math.random() * 100
                                            )}`}
                                            color={'inherit'}
                                            style={{
                                                border: '0.1px solid lightgray',
                                            }}
                                        />
                                    ))}
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
    );
};

const DescriptionSection = () => {
    return (
        <Card className="mb-2">
            <CardContent>
                <Typography>
                    Welcome Mahmud, you last visit was 3 Days ago. Since then
                    there has been 10,684 Messages and 567 Threads created
                </Typography>
            </CardContent>
        </Card>
    );
};

const ForumStatsSection = () => {
    const theme = useTheme();
    const activeBG = `${theme.palette.primary.main}22`;

    return (
        <Card className="mb-2">
            <CardContent>
                <Typography className="mb-3">Forum</Typography>
                <Divider />
                <ListItem divider disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Messages" />
                        <ListItemSecondaryAction>
                            256,6789
                        </ListItemSecondaryAction>
                    </ListItemButton>
                </ListItem>
                <ListItem divider disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Threads" />
                        <ListItemSecondaryAction>
                            256,6789
                        </ListItemSecondaryAction>
                    </ListItemButton>
                </ListItem>
                <ListItem divider disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Members Contributed" />
                        <ListItemSecondaryAction>6789</ListItemSecondaryAction>
                    </ListItemButton>
                </ListItem>
                <ListItem divider disablePadding>
                    <ListItemButton>
                        <ListItemText primary="Latest Members" />
                        <ListItemSecondaryAction>
                            <AvatarGroup max={4} color={'red'}>
                                {[1, 2, 3].map((reply) => (
                                    <Avatar
                                        key={reply}
                                        alt="Remy Sharp"
                                        src={`https://picsum.photos/${Math.floor(
                                            Math.random() * 100
                                        )}`}
                                        color={'inherit'}
                                        style={{
                                            border: '0.1px solid lightgray',
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                ))}
                            </AvatarGroup>
                        </ListItemSecondaryAction>
                    </ListItemButton>
                </ListItem>
                <Button
                    className="mt-2"
                    sx={{
                        backgroundColor: activeBG,
                    }}
                    variant="text"
                    textCase
                    fullWidth
                >
                    Start a Thread
                </Button>
            </CardContent>
        </Card>
    );
};

const TrendingSection = () => {
    return (
        <Card>
            <CardContent>
                <Typography className="mb-3">Trending Threads</Typography>
                {[1, 2, 3].map((item) => (
                    <TrendingListItem key={item} />
                ))}
            </CardContent>
        </Card>
    );
};

const TrendingListItem = () => {
    return (
        <>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton>
                    <AvatarGroup max={4} color={'red'}></AvatarGroup>
                    <ListItemText
                        primary={
                            <div className="d-flex">
                                {[1, 2, 3].map((reply) => (
                                    <Avatar
                                        key={reply}
                                        alt="Remy Sharp"
                                        src={`https://picsum.photos/${Math.floor(
                                            Math.random() * 100
                                        )}`}
                                        color={'inherit'}
                                        style={{
                                            border: '0.1px solid lightgray',
                                            width: 20,
                                            height: 20,
                                        }}
                                    ></Avatar>
                                ))}
                                <Typography className="ms-2">
                                    By Lukip
                                </Typography>
                            </div>
                        }
                    />
                    <ListItemSecondaryAction>3h ago</ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            <Typography noWrap className="mb-1 mx-2">
                Reimagining Peer To Peer Finance With Marlowe
            </Typography>
        </>
    );
};

const adUrl = `https://media.istockphoto.com/photos/bitcoin-cryptocurrency-trends-graphs-and-charts-picture-id1294303237?k=20&m=1294303237&s=612x612&w=0&h=0-igz1A4-GdGa-ApF4Mvyxc4-NLjcZ6DFNWW4ptVFYA=`;

const menuItems = [
    { title: 'General Discussion', theme: 'info' },
    { title: 'News', theme: 'success' },
    { title: 'Announcement', theme: 'warning' },
    { title: 'Cryptocurrencies', theme: 'secondary' },
    { title: 'Services', theme: 'info' },
    { title: 'Trading', theme: 'success' },
    { title: 'Report and Scam', theme: 'error' },
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
