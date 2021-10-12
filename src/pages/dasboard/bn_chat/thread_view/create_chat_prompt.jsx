import { useMutation, useQuery } from '@apollo/client';
import {
    Card,
    Divider,
    Grid,
    IconButton,
    Modal,
    Typography,
    useTheme,
    Paper,
    InputBase,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { CloseRounded, Search } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { QUERY_SEARCH_USERS } from '../../utilities/queries';
import { CREATE_DIALOGUE } from '../graphql/queries';
import { useStyles } from '../utils/styles';
import { generateRandomColor } from '../../utilities/functions';
import { getUserInitials } from '../../../../utilities/Helpers';

export default function CreateChatPrompt({
    openChatInvite,
    setChatInviteOpen,
}) {
    const [values, setValues] = useState({
        searchString: '',
    });
    const theme = useTheme();
    const classes = useStyles();
    const { loading: userLoading, data: userData } = useQuery(
        QUERY_SEARCH_USERS,
        {
            variables: {
                params: { searchString: values.searchString },
            },
            context: { clientName: 'users' },
        }
    );

    const [sendChatInvite, { data }] = useMutation(CREATE_DIALOGUE);
    const onSendInvite = async (_id) => {
        await sendChatInvite({
            variables: {
                _id: _id,
            },
            context: { clientName: 'chat' },
        });
    };
    const handleSearch = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    const handleSendInvite = (user) => {
        onSendInvite(user._id);
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
                <Grid item lg={3} md={2} sm={1} xs={1}></Grid>
                <Grid item lg={6} md={8} sm={10} xs={10}>
                    <Card>
                        <div className="space-between mx-3 my-2 center-horizontal">
                            <Typography variant="body1">
                                Search users
                            </Typography>
                            <IconButton size="small" className="m-1 p-1">
                                <CloseRounded
                                    onClick={() => {
                                        setChatInviteOpen(false);
                                    }}
                                />
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
                                {' '}
                                <IconButton
                                    size="small"
                                    type="submit"
                                    className={'m-1 p-1' + classes.iconButton}
                                    aria-label="search"
                                    onClick={handleSearch}
                                >
                                    <Search />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Find Users"
                                    inputProps={{
                                        'aria-label': 'search messages',
                                    }}
                                    name="searchString"
                                    type="text"
                                    value={values.searchString}
                                    onChange={handleSearch}
                                />
                            </Paper>
                        </div>
                        <CardContent>
                            {users && (
                                <List>
                                    {users &&
                                        users.map((user, index) => (
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
                                                            {' '}
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
                                    {' '}
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
                                    {' '}
                                    <Typography>No users found</Typography>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/* <Autocomplete
        options={users}
        loading={userLoading}
        inputValue={values.searchString}
        onChange={handleChange}
        multiple
        filterSelectedOptions
        getOptionLabel={(option) => option?.displayName}
        renderInput={(params) => (
          <Paper
            {...params}
            variant={theme.palette.mode == "light" ? "outlined" : "elevation"}
            elevation={0}
            component="form"
            className={classes.paperSearch}
          >
            {" "}
            <IconButton
              size="small"
              type="submit"
              className={"m-1 p-1" + classes.iconButton}
              aria-label="search"
              onClick={handleSearch}
            >
              <Search />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder="Find Users"
              inputProps={{ "aria-label": "search messages" }}
              name="searchString"
              type="text"
              value={values.searchString}
              onChange={handleChange}
            />
          </Paper>
        )}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Avatar
                src={
                  option?.profile_pic
                    ? process.env.REACT_APP_BACKEND_URL + option?.profile_pic
                    : ""
                }
                style={{
                  backgroundColor: generateRandomColor(),
                  marginRight: "5px",
                }}
              >
                {option?.profile_pic
                  ? ""
                  : getUserInitials(option?.displayName)}
              </Avatar>
              <Grid item xs>
                <span
                  key={option?._id}
                  //style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {option?.displayName}
                </span>

                <Typography variant="body2" color="textSecondary">
                  {`@${option?._id}`}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      /> */}
        </Modal>
    );
}
