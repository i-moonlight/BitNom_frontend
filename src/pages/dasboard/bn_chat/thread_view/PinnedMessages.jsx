import { useMutation } from '@apollo/client';
import { Close, DeleteRounded } from '@mui/icons-material';
import {
    Alert,
    IconButton,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePinnedMessage } from '../../../../store/actions/chatActions';
import { UNPIN_MESSAGE } from '../graphql/queries';

export default function PinnedMessages({ message }) {
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const [unpin] = useMutation(UNPIN_MESSAGE, {
        onError(e) {
            setError(e.graphQLErrors[0].state);
        },
    });

    const unpinMessage = async (OMessageInput) => {
        await unpin({
            variables: {
                data: OMessageInput,
            },
            context: { clientName: 'chat' },
        });
    };

    const handleUnpinMessage = (_id) => {
        unpinMessage({ chat: message?.chat?._id, message: message?._id });
        dispatch(deletePinnedMessage(_id));
    };

    return (
        <ListItem
            button
            alignItems="flex-start"
            secondaryAction={
                <Tooltip title="Unpin message">
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleUnpinMessage(message?._id)}
                    >
                        <DeleteRounded />
                    </IconButton>
                </Tooltip>
            }
        >
            <ListItemText
                secondary={
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
                }
            />
            {Object.keys(error)?.length > 0 && (
                <div>
                    {' '}
                    {Object.values(error)?.map((value) => (
                        <Alert
                            severity="error"
                            key={value}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError({});
                                    }}
                                >
                                    {' '}
                                    <Close fontSize="inherent" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {' '}
                            {value}
                        </Alert>
                    ))}
                </div>
            )}
        </ListItem>
    );
}
