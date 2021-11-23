import { DeleteRounded } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

export default function PinnedMessages({ message }) {
    return (
        <ListItem
            button
            alignItems="flex-start"
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteRounded />
                </IconButton>
            }
        >
            <ListItemText
                secondary={
                    <>
                        <Typography component="div">
                            {message?.text
                                ? message?.text
                                : message?.images
                                ? message?.images
                                : message?.video
                                ? message?.video
                                : message?.gif
                                ? message?.gif
                                : message?.documents}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
}
