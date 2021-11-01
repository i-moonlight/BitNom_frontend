import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export default function Blocked() {
    return (
        <Card>
            <CardContent>
                <Typography>
                    You can no longer send messages to this chat!
                </Typography>
            </CardContent>
        </Card>
    );
}
