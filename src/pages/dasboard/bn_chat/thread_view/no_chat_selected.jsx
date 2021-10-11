import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function NoChatSelected() {
    return (
        <Grid
            item
            justifyContent="center"
            alignItems="center"
            container
            direction="column"
            style={{ width: '100%', marginTop: '35%' }}
        >
            <Typography variant="body1">You have no chat selected </Typography>
            <Typography variant="body2">
                choose one from your existing chats, or start a new chat
            </Typography>
            <Button variant="contained" color="primary">
                Start a new chat
            </Button>
        </Grid>
    );
}
