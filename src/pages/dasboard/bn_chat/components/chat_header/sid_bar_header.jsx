import { useQuery } from '@apollo/client';
import { MoreVert, Search, Chat } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import CreateChatPrompt from '../../thread_view/CreateChatPrompt';
import { SEARCH_CHATS } from '../../graphql/queries';
import { useStyles } from '../../utils/styles';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';
import { setChatSearchInput } from '../../../../../store/actions/chatActions';
export default function SideBarHeader() {
    const [searchTerm, setSearchString] = useState('');
    const [createChatOpen, setCreateChatInviteOpen] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const { data } = useQuery(SEARCH_CHATS, {
        variables: {
            params: { searchString: searchTerm },
        },
        context: { clientName: 'chat' },
    });
    const handleChatSearch = (e) => {
        setSearchString(e.target.value);
    };
    const handleDebouncedChatSearch = useMemo(
        () => debounce(handleChatSearch, 500),
        []
    );
    useEffect(() => {
        if (data?.Dialogue?.search.length > 0) {
            dispatch(setChatSearchInput(data?.Dialogue?.search));
        }
    }, [data?.Dialogue?.search, dispatch]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between my-2">
                <Typography variant="h6" className={classes.menuHeader}>
                    Messaging
                </Typography>
                <div className="align-items-end">
                    {' '}
                    <IconButton onClick={() => setCreateChatInviteOpen(true)}>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
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
                    onChange={handleDebouncedChatSearch}
                />
            </Paper>
            <CreateChatPrompt
                openChatInvite={createChatOpen}
                setChatInviteOpen={(openChatInvite) =>
                    setCreateChatInviteOpen(openChatInvite)
                }
            />
        </>
    );
}
