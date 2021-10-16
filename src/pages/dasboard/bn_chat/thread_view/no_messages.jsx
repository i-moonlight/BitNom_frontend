import { Button, Typography } from '@mui/material';
import React from 'react';

export default function EmptyMessages() {
    return (
        <div
            style={{ minHeight: '55vh' }}
            className="d-flex justify-content-center align-items-center mx-auto w-100"
        >
            <div className="text-center h-100">
                <Typography variant="body1">
                    You have no messages yet.
                </Typography>
                <Typography variant="body2">
                    Be the first one to start the conversation
                </Typography>
                <Button variant="contained" color="primary" className="my-3">
                    New Message
                </Button>
            </div>
        </div>
    );
}
