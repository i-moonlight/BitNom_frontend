import { useQuery } from '@apollo/client';
import {
    Grid,
    IconButton,
    Typography,
    Divider,
    Paper,
    InputBase,
    useTheme,
} from '@material-ui/core';
import { Create, MoreVert, Search } from '@material-ui/icons';
import React, { useState } from 'react';
import { SEARCH_CHATS } from '../../graphql/queries';
import { useStyles } from '../../utils/styles';

export default function SideBarHeader({ setChatInviteOpen }) {
    const [values, setSearchString] = useState({ searchString: '' });
    const theme = useTheme();
    const classes = useStyles();
    const handleChatSearch = (e) => {
        setSearchString({
            ...values,
            [e.target.name]: e.target.values,
        });
    };
    const { loading, data } = useQuery(SEARCH_CHATS, {
        variables: {
            params: { searchString: values.searchString },
        },
        context: { clientName: 'chat' },
    });
    console.log('LOADING', loading);
    console.log('DATA_CHATS', data);
    return (
        <>
            <Grid item container>
                <Grid item xs={8}>
                    {' '}
                    <Typography variant="h5" className={classes.menuHeader}>
                        Messaging
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={2}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                >
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    item
                    xs={2}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                >
                    {' '}
                    <IconButton onClick={setChatInviteOpen}>
                        <Create />
                    </IconButton>
                </Grid>
            </Grid>{' '}
            <Divider className={classes.divider} />
            <Grid item>
                <Paper
                    variant={
                        theme.palette.type == 'light' ? 'outlined' : 'elevation'
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
                    >
                        <Search />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Chats"
                        inputProps={{ 'aria-label': 'search chats' }}
                        name="searchString"
                        value={values.searchString}
                        onChange={handleChatSearch}
                    />
                </Paper>
            </Grid>
        </>
    );
}
