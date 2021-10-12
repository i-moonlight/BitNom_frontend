import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function AwaitResponse({ dialogue }) {
    return (
        <Grid
            item
            justifyContent="center"
            alignItems="center"
            container
            direction="column"
            style={{ width: '100%', marginTop: '40%' }}
        >
            <Typography variant="body2">
                Please wait as <Link>{dialogue.recipient.info}</Link> responds
                to your chat invitation
            </Typography>
        </Grid>
    );
}
