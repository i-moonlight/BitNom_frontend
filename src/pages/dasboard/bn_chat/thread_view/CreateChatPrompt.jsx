import { useLazyQuery, useMutation } from '@apollo/client';
import { CloseRounded, Search } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Modal,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../../../store/actions/chatActions';
import { getUserInitials } from '../../../../utilities/Helpers';
import { generateRandomColor } from '../../utilities/functions';
import { QUERY_SEARCH_USERS } from '../../utilities/queries';
import { CREATE_DIALOGUE } from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function CreateChatPrompt({
    openChatInvite,
    setChatInviteOpen,
}) {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const [searchUsers, { loading: userLoading, data: userData }] =
        useLazyQuery(QUERY_SEARCH_USERS);

    const [sendChatInvite, { data }] = useMutation(CREATE_DIALOGUE);

    const onSendInvite = (IUserSmall) => {
        sendChatInvite({
            variables: {
                data: IUserSmall,
            },
            context: { clientName: 'chat' },
            errorPolicy: 'all',
        }).then(({ data: createChatData, errors: createChatErrors }) => {
            if (createChatData?.Dialogue?.create) {
                const dialogue = createChatData?.Dialogue?.create;
                if (dialogue?.status !== 'new') {
                    dispatch(setCurrentChat(dialogue));
                }
                setChatInviteOpen(false);
                setErrors([]);
            }
            if (createChatErrors) {
                if (createChatErrors[0]?.message == 400) {
                    const errorObject = createChatErrors[0];
                    const errorArr = [];
                    for (const [key, value] of Object.entries(
                        errorObject?.state
                    )) {
                        errorArr.push(`${value[0]}`);
                        if (key === 'acceptedI' || key === 'acceptedR') {
                            setChatInviteOpen(false);
                        }
                        if (key === 'content') {
                            setErrors(errorArr);
                        }
                    }
                    setErrors(errorArr);
                }
            }
        });
    };

    const handleSendInvite = (user) => {
        onSendInvite({
            _id: user?._id,
        });
    };

    const users = userData?.Users?.search?.filter(
        (user) => user?._id !== 'bn-ai'
    );

    return (
        <Modal
            data={data}
            style={{
                outline: 'none',

                '&:focusVisible': {
                    outline: 'none',
                },
            }}
            className="center-horizontal center-vertical w-100"
            open={openChatInvite}
        >
            <Grid container>
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body1">
                                Send connection requests
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setChatInviteOpen(false);
                                    setErrors([]);
                                }}
                                size="small"
                                className="m-1 p-1"
                            >
                                <CloseRounded />
                            </IconButton>
                        </div>
                        <Divider></Divider>

                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Paper
                                variant={
                                    theme.palette.mode == 'light'
                                        ? 'outlined'
                                        : 'elevation'
                                }
                                elevation={0}
                                component="form"
                                className={classes.paperSearch}
                            >
                                <IconButton
                                    size="small"
                                    type="submit"
                                    className={'m-1 p-1' + classes.iconButton}
                                    aria-label="search"
                                >
                                    <Search />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Find Users"
                                    inputProps={{
                                        'aria-label': 'search users',
                                    }}
                                    name="searchString"
                                    type="text"
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            searchUsers({
                                                variables: {
                                                    params: {
                                                        searchString:
                                                            e.target.value,
                                                    },
                                                },
                                                context: {
                                                    clientName: 'users',
                                                },
                                            });
                                        }
                                    }}
                                />
                            </Paper>
                        </div>
                        <CardContent
                            style={{
                                maxHeight: '75vh',
                                minHeight: '30vh',
                                overflowY: 'auto',
                            }}
                        >
                            {users && (
                                <List>
                                    {users?.map((user, index) => (
                                        <ListItem
                                            button
                                            key={index}
                                            onClick={() =>
                                                handleSendInvite(user)
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={user._id}
                                                    src={
                                                        user?.profile_pic
                                                            ? process.env
                                                                  .REACT_APP_BACKEND_URL +
                                                              user?.profile_pic
                                                            : `https://ui-avatars.com/api/?name=${getUserInitials(
                                                                  user?.displayName
                                                              )}&background=random`
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            generateRandomColor(),
                                                        marginRight: '5px',
                                                    }}
                                                >
                                                    {getUserInitials(
                                                        user?.displayName
                                                    )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={user?.displayName}
                                                secondary={
                                                    user?.bio || `@${user?._id}`
                                                }
                                            ></ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            )}

                            {userLoading && (
                                <Grid
                                    alignContent="center"
                                    alignItems="center"
                                    container
                                    item
                                    direction="column"
                                    style={{ width: '100%', marginTop: '10%' }}
                                >
                                    <CircularProgress />
                                </Grid>
                            )}

                            {!userLoading && !users && (
                                <Grid
                                    alignContent="center"
                                    alignItems="center"
                                    container
                                    item
                                    direction="column"
                                    style={{ width: '100%' }}
                                >
                                    <Typography>No users found</Typography>
                                </Grid>
                            )}
                            {errors?.length > 0 && (
                                <Grid
                                    alignContent="center"
                                    alignItems="center"
                                    container
                                    item
                                    direction="column"
                                    style={{ width: '100%' }}
                                >
                                    {errors?.map((errItem) => (
                                        <ListItem key={errItem}>
                                            <ListItemText
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        color="error"
                                                    >
                                                        {`${errItem}`}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1} sm={2} md={3} lg={4}></Grid>
            </Grid>
        </Modal>
    );
}
