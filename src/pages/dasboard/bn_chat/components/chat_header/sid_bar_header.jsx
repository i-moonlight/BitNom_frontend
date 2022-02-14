import { useLazyQuery } from '@apollo/client';
import { Chat, Search } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChatSearchInput } from '../../../../../store/actions/chatActions';
import { SEARCH_CHATS } from '../../graphql/queries';
import CreateChatPrompt from '../../thread_view/CreateChatPrompt';
import { useStyles } from '../../utils/styles';
//import { ToastContainer } from 'react-toastify';

export default function SideBarHeader() {
    const [searchTerm, setSearchString] = useState('');
    const [createChatOpen, setCreateChatInviteOpen] = useState(false);
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [searchChats, { data }] = useLazyQuery(SEARCH_CHATS);

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

    useEffect(() => {
        if (searchTerm.length > 0) {
            searchChats({
                variables: {
                    params: { searchString: searchTerm },
                },
                context: { clientName: 'chat' },
            });
        }
    }, [searchChats, searchTerm]);

    useEffect(() => {
        if (searchTerm) {
            const timeoutId = setTimeout(() => {
                setSearchString('');
            }, 10000);
            return () => clearTimeout(timeoutId);
        }
    }, [searchTerm]);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between my-2">
                <Typography variant="h6" className={classes.menuHeader}>
                    Messaging
                </Typography>
                <div className="align-items-end">
                    <IconButton onClick={() => setCreateChatInviteOpen(true)}>
                        <Chat />
                    </IconButton>
                    {/*   <IconButton>
                        <MoreVert />
                    </IconButton> */}
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
                <IconButton
                    size="small"
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
