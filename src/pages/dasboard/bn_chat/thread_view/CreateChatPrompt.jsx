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
import debounce from 'lodash/debounce';
import React, { Fragment, useCallback } from 'react';
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

    const [searchUsers, { loading: userLoading, data: userData }] =
        useLazyQuery(QUERY_SEARCH_USERS);

    const debouncer = useCallback(() => {
        debounce(searchUsers, 500);
    }, [searchUsers]);

    const [sendChatInvite, { data }] = useMutation(CREATE_DIALOGUE);

    const onSendInvite = async (IUserSmall) => {
        await sendChatInvite({
            variables: {
                data: IUserSmall,
            },
            context: { clientName: 'chat' },
        });
    };

    const handleSendInvite = (user) => {
        onSendInvite({
            _id: user?._id,
        });
        setChatInviteOpen(false);
    };

    const users =
        userData && userData?.Users?.search ? userData?.Users?.search : null;

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
                {' '}
                <Grid item lg={5} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={3} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body1">
                                Search users
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setChatInviteOpen(false);
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
                                    onChange={(e) =>
                                        debouncer({
                                            variables: {
                                                params: {
                                                    searchString:
                                                        e.target.value,
                                                },
                                            },
                                            context: { clientName: 'users' },
                                        })
                                    }
                                />
                            </Paper>
                        </div>
                        <CardContent>
                            {users && (
                                <List>
                                    {users &&
                                        users?.map((user, index) => (
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
                                                                : ''
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                generateRandomColor(),
                                                            marginRight: '5px',
                                                        }}
                                                    >
                                                        {user?.profile_pic
                                                            ? ''
                                                            : getUserInitials(
                                                                  user?.displayName
                                                              )}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    secondary={
                                                        <Fragment>
                                                            <Typography
                                                                sx={{
                                                                    display:
                                                                        'inline',
                                                                }}
                                                            >
                                                                {
                                                                    user.displayName
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                {user.bio}
                                                            </Typography>
                                                        </Fragment>
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
                                    style={{ width: '100%', marginTop: '40%' }}
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    );
}
