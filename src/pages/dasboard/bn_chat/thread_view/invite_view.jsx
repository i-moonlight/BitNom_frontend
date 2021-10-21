import { useMutation, useSubscription } from '@apollo/client';
import {
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../components/Button';
import {
    addToChatDialogues,
    clearCurrentChat,
    removeFromInvites,
    setCurrentChat,
} from '../../../../store/actions/chatActions';
import {
    ACCEPT_DIALOGUE_INVITE,
    CHAT_ACCEPTED,
    REJECT_DIALOGUE_INVITE,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function InviteView({ dialogue }) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [RejectChat] = useMutation(REJECT_DIALOGUE_INVITE, {
        variables: {
            _id: dialogue?._id,
        },
        context: { clientName: 'chat' },
    });

    const [AcceptChat] = useMutation(ACCEPT_DIALOGUE_INVITE, {
        variables: {
            _id: dialogue?._id,
        },
        context: { clientName: 'chat' },
    });

    const { data: chatAccepted } = useSubscription(CHAT_ACCEPTED, {
        variables: {
            _id: dialogue?._id,
        },
    });

    useEffect(() => {
        if (chatAccepted?.chatAccepted) {
            dispatch(clearCurrentChat());
            dispatch(addToChatDialogues(chatAccepted?.chatAccepted));
            dispatch(setCurrentChat(chatAccepted?.chatAccepted));
            dispatch(removeFromInvites(chatAccepted?.chatAccepted));
        }
    }, [chatAccepted?.chatAccepted, dispatch]);

    const handleReject = (e) => {
        e.preventDefault();
        RejectChat();
    };

    const handleAccept = (e) => {
        e.preventDefault();
        AcceptChat();
    };

    return (
        <Card className={classes.inviteBar}>
            <CardContent>
                <Typography>
                    Accept to chat with{' '}
                    <Link to={`/users/${dialogue?.otherUser?.info?._id}`}>
                        {dialogue?.otherUser?.info?.displayName}
                    </Link>
                    . If you ignore this, the chat wil be removed and we wont
                    let the sender know.
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAccept}
                    className="me-1"
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReject}
                >
                    Reject
                </Button>
            </CardActions>
        </Card>
    );
}
