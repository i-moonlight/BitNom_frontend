import {
    Grid,
    IconButton,
    Typography,
    Divider,
    Paper,
    InputBase,
    useTheme,
} from '@mui/material';
import { Create, MoreVert, Search } from '@mui/icons-material';
import React from 'react';
import { useStyles } from '../../utils/styles';

export default function SideBarHeader({ setChatInviteOpen }) {
    const theme = useTheme();
    const classes = useStyles();
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
                        placeholder="Search Messages"
                        inputProps={{ 'aria-label': 'search messages' }}
                    />
                </Paper>
            </Grid>
        </>
    );
}
