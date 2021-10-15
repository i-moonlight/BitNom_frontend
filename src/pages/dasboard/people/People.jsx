import { useMutation, useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import { getUserInitials } from '../../../utilities/Helpers';
import UserCard from '../bn_connect/UserCard';
import {} from '../utilities/functions';
import {
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    QUERY_FETCH_PROFILE,
    QUERY_GET_USERS,
    QUERY_LOAD_EVENTS,
    QUERY_LOAD_SCROLLS,
} from '../utilities/queries';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function People() {
    const classes = useStyles();
    const state = useSelector((st) => st);
    const mdDown = useMediaQuery('(max-width:1279px)');

    const user = state.auth.user;

    const { data: usersData } = useQuery(QUERY_GET_USERS, {
        params: { data: { limit: 20 } },
        context: { clientName: 'users' },
    });

    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const { data: userScrolls } = useQuery(QUERY_LOAD_SCROLLS, {
        variables: { data: { author: user?._id, limit: 500 } },
    });
    const { data: userEvents } = useQuery(QUERY_LOAD_EVENTS, {
        variables: {
            data: { host: user?._id, limit: 20 },
        },
    });

    const suggestedUsers = usersData?.Users?.get?.filter(
        (item) => item?._id !== 'bn-ai' && item?._id !== user?._id
    );

    const getFollowStatus = (usr) => {
        let status;
        profileData?.Users?.profile?.following?.forEach((item) => {
            if (item?.userId?._id == usr?._id) {
                status = item?.userId?._id;
            }
        });
        return status;
    };

    return (
        <Screen>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {!mdDown && (
                            <Grid item lg={3}>
                                <UserCard
                                    following={
                                        profileData?.Users?.profile?.following
                                            ?.length
                                    }
                                    followers={
                                        profileData?.Users?.profile?.followers
                                            ?.length
                                    }
                                    scrolls={userScrolls?.Posts?.get?.length}
                                    events={userEvents?.Events?.get?.length}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Link to="/dashboard">
                                            <IconButton
                                                size="small"
                                                className="m-1 p-1"
                                                aria-label="back"
                                                color="inherit"
                                            >
                                                <ArrowBack />
                                            </IconButton>
                                        </Link>
                                    }
                                    title={
                                        <div className="center-horizontal">
                                            <Typography>
                                                People you may know
                                            </Typography>
                                        </div>
                                    }
                                />
                                <Divider />
                                <CardContent>
                                    <List>
                                        {suggestedUsers?.map((usr) => (
                                            <ListItemComponent
                                                key={usr?._id}
                                                getFollowStatus={
                                                    getFollowStatus
                                                }
                                                item={usr}
                                            />
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4} lg={3}></Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

function ListItemComponent({ item, getFollowStatus }) {
    const [status, setStatus] = React.useState();
    React.useEffect(() => {
        if (getFollowStatus(item)) setStatus(true);
    }, [getFollowStatus, item]);

    const [
        followUser,
        {
            data: followData,
            //  loading,
            //   error
        },
    ] = useMutation(MUTATION_FOLLOW_USER);

    const [unFollowUser] = useMutation(MUTATION_UNFOLLOW_USER);

    const handleFollowUser = (user_id) => {
        followUser({
            variables: {
                data: {
                    user_id: user_id,
                },
            },
            context: { clientName: 'users' },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                },
            ],
        });
        if (followData?.Users?.follow == true) setStatus(true);
        //setFollowing(following + 1);
    };

    const handleUnFollowUser = (user_id) => {
        unFollowUser({
            variables: {
                data: {
                    user_id: user_id,
                },
            },
            context: { clientName: 'users' },
            refetchQueries: [
                {
                    query: QUERY_FETCH_PROFILE,
                    context: { clientName: 'users' },
                },
            ],
        });
        setStatus();
        //setFollowing(following - 1);
    };

    return (
        <ListItem className="space-between" key={item?._id}>
            <ListItemAvatar>
                <Avatar
                    src={
                        item?.profile_pic
                            ? process.env.REACT_APP_BACKEND_URL +
                              item?.profile_pic
                            : ''
                    }
                    style={{
                        backgroundColor: '#fed132',
                    }}
                >
                    {getUserInitials(item?.displayName)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <div className="center-horizontal">
                        <Typography variant="body2" className="mx-1">
                            {item?.displayName}{' '}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {'@' + item?._id}
                        </Typography>
                    </div>
                }
                secondary={item?.bio}
            />
            <ListItemIcon
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
                style={{
                    marginRight: 0,
                    paddingRight: 0,
                    minWidth: 20,
                    '&.MuiListItemIconRoot': {
                        minWidth: 20,
                    },
                }}
            >
                <Button
                    onClick={() =>
                        status
                            ? handleUnFollowUser(item?._id)
                            : handleFollowUser(item?._id)
                    }
                    className="mx-2"
                    size="small"
                    variant="outlined"
                    color="primary"
                    textCase
                >
                    {status ? 'Unfollow' : 'Follow'}
                </Button>
            </ListItemIcon>
        </ListItem>
    );
}
