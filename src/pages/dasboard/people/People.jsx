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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { getUserInitials } from '../../../utilities/Helpers';
import UserCard from '../bn_connect/UserCard';
import {
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    QUERY_FETCH_PROFILE,
    QUERY_GET_USERS,
} from '../utilities/queries';

export default function People() {
    const classes = useStyles();
    const state = useSelector((st) => st);

    const mdDown = useMediaQuery('(max-width:1279px)');
    const smDown = useMediaQuery('(max-width:959px)');

    const history = useHistory();

    const user = state.auth.user;

    const { data: usersData } = useQuery(QUERY_GET_USERS, {
        params: { data: { limit: 20 } },
        context: { clientName: 'users' },
    });

    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const following = [];
    profileData?.Users?.profile?.following?.forEach((item) =>
        following.push(item?.userId?._id)
    );
    const suggestedUsers = usersData?.Users?.get?.filter(
        (item) =>
            item?._id !== 'bn-ai' &&
            item?._id !== user?._id &&
            !following.includes(item?._id) &&
            item?.displayName
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
            {smDown && <div className="my-5 w-100"></div>}
            <SEO
                title="People You May Know | Bitnorm"
                url={`${window.location.origin}/people`}
                description={`New friend suggestions`}
            />
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
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <IconButton
                                            size="small"
                                            className="m-1 p-1"
                                            aria-label="back"
                                            color="inherit"
                                            onClick={() => history.goBack()}
                                        >
                                            <ArrowBack />
                                        </IconButton>
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
                                    <List component="div">
                                        {suggestedUsers?.map((usr) => (
                                            <ListItemComponent
                                                key={usr?._id}
                                                getFollowStatus={
                                                    getFollowStatus
                                                }
                                                item={usr}
                                            />
                                        ))}
                                        {suggestedUsers?.length < 1 && (
                                            <Typography variant="body2">
                                                0 Suggestions.
                                            </Typography>
                                        )}
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
    const [status, setStatus] = useState();
    useEffect(() => {
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
                secondary={
                    <Typography
                        style={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                        }}
                        variant="body2"
                    >
                        {item?.bio}
                    </Typography>
                }
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

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));
