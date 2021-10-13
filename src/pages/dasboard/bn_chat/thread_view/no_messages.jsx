import { Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
    },
}));
export default function EmptyMessages() {
    const classes = useStyles();

    return (
        <>
            <Grid item>
                <Typography variant="body1">
                    You have no messages yet.
                </Typography>
                <Typography variant="body2">
                    Be the first one to start the conversation
                </Typography>
                <Grid
                    alignContent="center"
                    alignItems="center"
                    item
                    direction="column"
                    className={classes.root}
                >
                    <Button variant="contained" color="primary">
                        New Message
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
