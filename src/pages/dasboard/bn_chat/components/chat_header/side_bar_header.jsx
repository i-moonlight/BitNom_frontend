import { MoreVert, Search } from '@mui/icons-material';
import {
    Divider,
    IconButton,
    InputBase,
    Paper,
    Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import { useStyles } from '../../utils/styles';

export default function SideBarHeader() {
    const theme = useTheme();
    const classes = useStyles();
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
                    placeholder="Search Messages"
                    inputProps={{ 'aria-label': 'search messages' }}
                />
            </Paper>
        </>
    );
}
