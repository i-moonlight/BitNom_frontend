import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from '../utils/styles';

export default function Blocked() {
    const classes = useStyles();
    return (
        <Card className={classes.cardDefault}>
            <CardContent>
                <Typography>
                    You can no longer send messages to this chat!
                </Typography>
            </CardContent>
        </Card>
    );
}
