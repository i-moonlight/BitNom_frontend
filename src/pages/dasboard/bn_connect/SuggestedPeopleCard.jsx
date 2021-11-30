import { useMutation } from '@apollo/client';
import {
    Avatar,
    Card,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper,
    Skeleton,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../components/Button';
//import { getFeed } from '../utilities/functions';
import { getUserInitials } from '../../../utilities/Helpers';
import {} from '../utilities/functions';
import {
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    //QUERY_LOAD_SCROLLS,
    QUERY_FETCH_PROFILE,
} from '../utilities/queries';

export default function SuggestedPeopleCard({ suggestedUsers, profileData }) {
    const [notFollowed, setNotFollowed] = useState();
    const history = useHistory();

    const getFollowStatus = useCallback(
        (user) => {
            let status;
            profileData?.following?.forEach((item) => {
                if (item?.userId?._id === user?._id) {
                    status = item?.userId?._id;
                }
            });
            return status;
        },
        [profileData?.following]
    );

    useEffect(() => {
        const notFollowedInner = [];

        suggestedUsers?.forEach((user) => {
            if (!getFollowStatus(user)) notFollowedInner.push(user);
        });

        return () => {
            setNotFollowed(notFollowedInner);
        };
    }, [getFollowStatus, suggestedUsers]);

    /*   let notFollowed = [];
  suggestedUsers?.forEach((user) => {
    if (!getFollowStatus(user)) notFollowed.push(user);
  }); */

    return (
        <Paper>
            <List
                style={{ padding: 8, paddingBottom: 0 }}
                component={Card}
                variant="outlined"
            >
                <Typography style={{ marginLeft: 8 }} variant="body1">
                    People you may know
                </Typography>
                {!notFollowed &&
                    [1, 2, 3]?.map((user) => (
                        <ListItem key={user} divider>
                            <ListItemAvatar>
                                <Skeleton animation="wave">
                                    <Avatar
                                        variant="square"
                                        style={{ height: 50 }}
                                    />
                                </Skeleton>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Skeleton variant="text" animation="wave" />
                                }
                                secondary={
                                    <Skeleton variant="text" animation="wave" />
                                }
                            />
                            <ListItemIcon>
                                <Skeleton
                                    className="ms-2"
                                    variant="rectangular"
                                    animation="wave"
                                    width={50}
                                    height={24}
                                />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                {notFollowed?.slice(0, 3)?.map((user) => (
                    <ListItemComponent
                        key={user?._id}
                        getFollowStatus={getFollowStatus}
                        user={user}
                        profileData={profileData}
                    />
                ))}
                <Divider />
                {notFollowed?.length > 0 && (
                    <Button
                        textCase
                        size="small"
                        variant="text"
                        className="my-1"
                        onClick={() => {
                            history.push('/connect/people');
                        }}
                    >
                        Show More
                    </Button>
                )}
                {notFollowed && notFollowed?.length === 0 && (
                    <Typography variant="body2">0 Suggestions.</Typography>
                )}
            </List>
        </Paper>
    );
}

function ListItemComponent({ user, getFollowStatus }) {
    const [status, setStatus] = React.useState();

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
                /*  {
          query: QUERY_LOAD_SCROLLS,
          variables: { data: { ids: getFeed(profileData), limit: 220 } },
        }, */
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
                /*  {
          query: QUERY_LOAD_SCROLLS,
          variables: { data: { ids: getFeed(profileData), limit: 220 } },
        }, */
            ],
        });

        setStatus();
        //setFollowing(following - 1);
    };

    useEffect(() => {
        if (getFollowStatus(user)) {
            setStatus(true);
        }
    }, [getFollowStatus, user]);
    return (
        <ListItem divider>
            <ListItemAvatar>
                <Avatar
                    src={
                        user?.profile_pic
                            ? process.env.REACT_APP_BACKEND_URL +
                              user?.profile_pic
                            : ''
                    }
                    style={{
                        backgroundColor: '#fed132',
                    }}
                >
                    {user?.profile_pic
                        ? ''
                        : getUserInitials(user?.displayName)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body2">{user?.displayName}</Typography>
                }
                secondary={'@' + user?._id}
            />
            <ListItemIcon>
                {/* <SendRounded /> */}
                <Button
                    onClick={() =>
                        status
                            ? handleUnFollowUser(user?._id)
                            : handleFollowUser(user?._id)
                    }
                    size="small"
                    variant="outlined"
                    textCase
                >
                    {status ? 'Unfollow' : 'Follow'}
                </Button>
            </ListItemIcon>
        </ListItem>
    );
}
