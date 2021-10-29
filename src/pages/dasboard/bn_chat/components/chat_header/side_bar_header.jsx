import { useQuery } from '@apollo/client';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import { MoreVert, Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { SEARCH_CHATS } from '../../graphql/queries';
import { useStyles } from '../../utils/styles';

export default function SideBarHeader() {
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
            <div className="d-flex align-items-center justify-content-between my-2">
                <Typography variant="h6" className={classes.menuHeader}>
                    Messaging
                </Typography>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            <Divider className={classes.divider} />
            <Paper
                variant={
                    theme.palette.mode == 'light' ? 'outlined' : 'elevation'
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
        </>
    );
}
