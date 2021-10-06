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
    Typography,
    CircularProgress,
    Grid,
} from '@material-ui/core';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { useMutation } from '@apollo/client';
import {
    MUTATION_FOLLOW_USER,
    MUTATION_UNFOLLOW_USER,
    //QUERY_LOAD_SCROLLS,
    QUERY_FETCH_PROFILE,
} from '../utilities/queries';
//import { getFeed } from '../utilities/functions';
import { getUserInitials } from '../../../utilities/Helpers';
import { generateRandomColor } from '../utilities/functions';

export default function SuggestedPeopleCard({ suggestedUsers, profileData }) {
    const [notFollowed, setNotFollowed] = useState();

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
                {!notFollowed && (
                    <Grid align="center">
                        <CircularProgress
                            color="primary"
                            size={24}
                            thickness={4}
                        />
                    </Grid>
                )}
                {notFollowed?.slice(0, 3)?.map((user) => (
                    <ListItemComponent
                        key={user?._id}
                        getFollowStatus={getFollowStatus}
                        user={user}
                        profileData={profileData}
                    />
                ))}
                <Divider />
                <Link to="/dashboard/people">
                    <Typography
                        variant="body2"
                        className="my-2"
                        color="primary"
                    >
                        Show more
                    </Typography>
                </Link>
            </List>
        </Paper>
    );
}

function ListItemComponent({ user, getFollowStatus }) {
    const [status, setStatus] = React.useState();

    useEffect(() => {
        if (getFollowStatus(user)) {
            setStatus(true);
        }
    }, [getFollowStatus, user]);

    const [
        followUser,
        {
            data: followData,
            //  loading,
            //   error
        },
    ] = useMutation(MUTATION_FOLLOW_USER);
    const [
        unFollowUser,
        {
            data: unFollowData,
            //  loading,
            //   error
        },
    ] = useMutation(MUTATION_UNFOLLOW_USER);

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
        if (followData?.Users?.follow == true)
            console.log(followData?.Users?.follow);
        setStatus(true);
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
        if (unFollowData?.Users?.unFollow == true)
            console.log(unFollowData?.Users?.unFollow);
        setStatus();
        //setFollowing(following - 1);
    };

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
                        backgroundColor: generateRandomColor(),
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
