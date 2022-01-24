import { useQuery } from '@apollo/client';
import {
    BookmarkRounded,
    CollectionsBookmarkRounded,
    EventRounded,
    PersonRounded,
} from '@mui/icons-material';
import {
    Avatar,
    Badge,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { getUserInitials } from '../../../utilities/Helpers';
import { QUERY_FETCH_PROFILE } from '../utilities/queries';

export default function ConnectProfile() {
    const classes = useStyles();

    const card = useRef();
    const history = useHistory();

    const state = useSelector((st) => st);

    const mdDown = useMediaQuery('(max-width:1279px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const user = state.auth.user;
    const userInitials = getUserInitials(user?.displayName);

    const sticky =
        window.innerHeight < card?.current?.clientHeight + 176
            ? window.innerHeight - (card?.current?.clientHeight + 24)
            : 160;

    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });
    return (
        <Screen>
            {smDown && <div className="my-5 w-100"></div>}
            <SEO
                title="Connect | Bitnorm"
                url={`${window.location.origin}/connect/profile`}
                description={`Your connect profile information`}
            />
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && <Grid item lg={3}></Grid>}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <div
                                ref={card}
                                style={{
                                    position: 'sticky',
                                    top: sticky,
                                    //176
                                }}
                            >
                                <Card
                                    className={classes.mainCard}
                                    variant={'outlined'}
                                >
                                    <CardMedia
                                        style={{ height: 200 }}
                                        src={
                                            process.env.REACT_APP_BACKEND_URL +
                                            user?.cover_pic
                                        }
                                        image={
                                            process.env.REACT_APP_BACKEND_URL +
                                            user?.cover_pic
                                        }
                                    />
                                    <CardContent
                                        style={{
                                            position: 'relative',
                                            top: -80,
                                            marginBottom: -80,
                                        }}
                                    >
                                        <div className="space-between">
                                            <div>
                                                <Avatar
                                                    src={
                                                        user?.profile_pic &&
                                                        process.env
                                                            .REACT_APP_BACKEND_URL +
                                                            user?.profile_pic
                                                    }
                                                    variant="rounded"
                                                    style={{
                                                        backgroundColor:
                                                            '#fed132',
                                                        marginRight: 12,
                                                        width: 80,
                                                        height: 80,
                                                    }}
                                                >
                                                    {userInitials}
                                                </Avatar>
                                                <Typography
                                                    className="pt-1"
                                                    variant="body2"
                                                >
                                                    {user?.displayName}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {`@${user?._id}`}
                                                </Typography>
                                            </div>

                                            <div
                                                style={{
                                                    position: 'relative',
                                                    top: 60,
                                                }}
                                            ></div>
                                        </div>

                                        <Divider
                                            style={{
                                                marginTop: 8,
                                                marginBottom: 8,
                                            }}
                                        />

                                        <div className="center-horizontal space-between">
                                            <div
                                                onClick={() =>
                                                    history.push(
                                                        '/profile/posts'
                                                    )
                                                }
                                                className={
                                                    classes.clickableTypography
                                                }
                                            >
                                                <Typography variant="body2">
                                                    Posts
                                                </Typography>
                                                <div className="center-horizontal">
                                                    <CollectionsBookmarkRounded
                                                        color="primary"
                                                        className="mx-2"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            state?.postCount
                                                                ?.postCount
                                                        }
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes.clickableTypography
                                                }
                                                onClick={() =>
                                                    history.push(
                                                        '/profile/friends'
                                                    )
                                                }
                                            >
                                                <Typography variant="body2">
                                                    Followers
                                                </Typography>
                                                <div className="center-horizontal">
                                                    <PersonRounded
                                                        color="primary"
                                                        className="mx-2"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            profileData?.Users
                                                                ?.profile
                                                                ?.followers
                                                                ?.length
                                                        }
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    classes.clickableTypography
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    history.push(
                                                        '/profile/friends/following'
                                                    );
                                                }}
                                            >
                                                <Typography variant="body2">
                                                    Following
                                                </Typography>
                                                <div className="center-horizontal">
                                                    <PersonRounded
                                                        color="primary"
                                                        className="mx-2"
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {
                                                            profileData?.Users
                                                                ?.profile
                                                                ?.following
                                                                ?.length
                                                        }
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <Divider />
                                    <CardActions className="py-0">
                                        <Button
                                            color="inherit"
                                            textCase
                                            startIcon={<BookmarkRounded />}
                                            variant="text"
                                            className="py-1 my-1"
                                            onClick={() =>
                                                history.push(
                                                    '/profile/bookmarks'
                                                )
                                            }
                                        >
                                            Saved Items
                                        </Button>
                                    </CardActions>
                                    <Divider />
                                    <CardActions className="py-0">
                                        <Button
                                            color="inherit"
                                            textCase
                                            startIcon={<EventRounded />}
                                            endIcon={
                                                <Badge
                                                    className="ms-2 me-3"
                                                    badgeContent={
                                                        state?.eventCount
                                                            ?.eventCount
                                                    }
                                                    color="primary"
                                                ></Badge>
                                            }
                                            variant="text"
                                            className="py-1 my-1 me-3"
                                            onClick={() =>
                                                history.push('/events')
                                            }
                                        >
                                            Events
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item md={4} lg={3}></Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
    mainCard: {
        [theme.breakpoints.down('md')]: {
            marginBottom: 16,
            marginTop: 16,
        },
    },
}));
