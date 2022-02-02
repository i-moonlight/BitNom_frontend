import { useMutation, useQuery } from '@apollo/client';
import { ArrowBack } from '@mui/icons-material';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Screen from '../../../components/Screen';
import SEO from '../../../components/SEO';
import { getUserInitials } from '../../../utilities/Helpers';
import UserCard from '../bn_connect/UserCard';
import {} from '../utilities/functions';
import {
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    QUERY_FETCH_PROFILE,
} from '../utilities/queries';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function Connections() {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const mdDown = useMediaQuery('(max-width:1279px)');
    const history = useHistory();
    const { active_tab } = useParams();

    useEffect(() => {
        if (active_tab) {
            setValue(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { data: profileData } = useQuery(QUERY_FETCH_PROFILE, {
        context: { clientName: 'users' },
    });

    const getFollowStatus = (usr) => {
        let status;
        profileData?.Users?.profile?.following?.forEach((item) => {
            if (item?.userId?._id === usr?.userId?._id) {
                status = true;
            }
        });
        return status;
    };

    const followers = profileData?.Users?.profile?.followers;
    const following = profileData?.Users?.profile?.following;

    const handleChange = (event, val) => {
        setValue(val);
    };

    return (
        <Screen>
            <SEO
                title="Your friends"
                url={`${window.location.origin}/profile/friends`}
                description={`Your followers and the friends you follow`}
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
                                            <Typography variant="body1">
                                                Connections
                                            </Typography>
                                        </div>
                                    }
                                />
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    variant="fullWidth"
                                >
                                    <Tab
                                        key={'Followers'}
                                        label={'Followers'}
                                        disableRipple
                                        style={{ textTransform: 'none' }}
                                    />
                                    <Tab
                                        key={'Following'}
                                        label={'Following'}
                                        disableRipple
                                        style={{ textTransform: 'none' }}
                                    />
                                </Tabs>
                                <Divider />
                                <CardContent>
                                    {value === 0 &&
                                        followers?.length > 0 &&
                                        followers?.map((follower) => (
                                            <ListItemComponent
                                                key={follower?.userId?._id}
                                                getFollowStatus={
                                                    getFollowStatus
                                                }
                                                item={follower}
                                            />
                                        ))}
                                    {value === 1 &&
                                        following?.length > 0 &&
                                        following?.map((follow) => (
                                            <ListItemComponent
                                                key={follow?.userId?._id}
                                                getFollowStatus={
                                                    getFollowStatus
                                                }
                                                item={follow}
                                            />
                                        ))}
                                    {(value === 0 && followers?.length < 1) ||
                                    (value === 1 && following?.length < 1) ? (
                                        <Grid align="center">
                                            <Typography
                                                variant="body1"
                                                color="primary"
                                            >
                                                {value === 0
                                                    ? 'You have no followers yet.'
                                                    : 'You have not followed anyone.'}
                                            </Typography>
                                        </Grid>
                                    ) : (
                                        ''
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item md={4} lg={3}>
                            {/* {!smDown && } */}
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Screen>
    );
}

function ListItemComponent({ item, getFollowStatus }) {
    const [status, setStatus] = React.useState();
    const history = useHistory();
    React.useEffect(() => {
        if (getFollowStatus(item)) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [getFollowStatus, item]);

    const [followUser, { data: followData }] =
        useMutation(MUTATION_FOLLOW_USER);
    const [unFollowUser, { data: unFollowData }] = useMutation(
        MUTATION_UNFOLLOW_USER
    );
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
        if (unFollowData?.Users?.unFollow == true) setStatus(false);
        //setFollowing(following - 1);
    };
    return (
        <ListItem className="space-between" key={item?.userId?._id} divider>
            <ListItemAvatar>
                <Avatar
                    src={
                        item?.userId?.profile_pic
                            ? process.env.REACT_APP_BACKEND_URL +
                              item?.userId?.profile_pic
                            : ''
                    }
                    style={{
                        backgroundColor: '#fed132',
                    }}
                >
                    {item?.userId?.profile_pic
                        ? ''
                        : getUserInitials(item?.userId?.displayName)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <div className="center-horizontal">
                        <Typography
                            component="a"
                            onClick={() =>
                                history.push(`/users/${item?.userId?._id}`)
                            }
                            variant="body2"
                            className="mx-1"
                        >
                            {item?.userId?.displayName}{' '}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {'@' + item?.userId?._id}
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
                        {item?.userId?.bio}
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
                    minWidth: 30,
                    '&.MuiListItemIconRoot': {
                        minWidth: 30,
                    },
                }}
            >
                {status !== undefined && (
                    <div
                        style={{
                            color: status ? red[300] : '#006097',
                        }}
                    >
                        <Button
                            onClick={() =>
                                status
                                    ? handleUnFollowUser(item?.userId?._id)
                                    : handleFollowUser(item?.userId?._id)
                            }
                            className="mx-2"
                            size="small"
                            variant="outlined"
                            disableRipple
                            color="inherit"
                            style={{
                                textTransform: 'none',
                            }}
                        >
                            {status === true && 'Unfollow'}
                            {status === false && 'Follow'}
                        </Button>
                    </div>
                )}
            </ListItemIcon>
        </ListItem>
    );
}
