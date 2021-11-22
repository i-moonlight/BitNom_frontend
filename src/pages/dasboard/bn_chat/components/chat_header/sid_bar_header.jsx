import { Chat, MoreVert, Search } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import CreateChatPrompt from '../../thread_view/CreateChatPrompt';
import { useStyles } from '../../utils/styles';

export default function SideBarHeader() {
    const [values, setSearchString] = useState({ searchString: '' });
    const [createChatOpen, setCreateChatInviteOpen] = useState(false);

    const theme = useTheme();
    const classes = useStyles();

    const handleChatSearch = (e) => {
        setSearchString({
            ...values,
            [e.target.name]: e.target.values,
        });
    };

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
                    value={values.searchString}
                    onChange={handleChatSearch}
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
