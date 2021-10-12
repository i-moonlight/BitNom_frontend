import { useMutation, useSubscription } from '@apollo/client';
import { Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    ACCEPT_DIALOGUE_INVITE,
    CHAT_ACCEPTED,
    REJECT_DIALOGUE_INVITE,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';
import {
    setCurrentChat,
    clearCurrentChat,
    removeFromInvites,
    addToChatDialogues,
} from '../../../../store/actions/chatActions';

export default function InviteView({ dialogue }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [RejectChat] = useMutation(REJECT_DIALOGUE_INVITE, {
        variables: {
            _id: dialogue._id,
        },
        context: { clientName: 'chat' },
    });

    const [AcceptChat] = useMutation(ACCEPT_DIALOGUE_INVITE, {
        variables: {
            _id: dialogue._id,
        },
        context: { clientName: 'chat' },
    });

    const { data: chatAccepted } = useSubscription(CHAT_ACCEPTED, {
        variables: {
            _id: dialogue._id,
        },
    });

    useEffect(() => {
        if (chatAccepted?.chatAccepted) {
            dispatch(clearCurrentChat());
            dispatch(addToChatDialogues(chatAccepted?.chatAccepted));
            dispatch(setCurrentChat(chatAccepted?.chatAccepted));
            dispatch(removeFromInvites(chatAccepted?.chatAccepted));
        }
        // eslint-disable-next-line
    }, [chatAccepted?.chatAccepted]);
    const handleReject = (e) => {
        e.preventDefault();
        RejectChat();
    };
    const handleAccept = (e) => {
        e.preventDefault();
        AcceptChat();
    };
    return (
        <Grid item style={{ width: '100%', height: '70vh' }}>
            <Paper className={classes.inviteBar}>
                <Grid container className={classes.inviteBoard}>
                    <Grid xs={8}>
                        <Typography className={classes.inviteIntro}>
                            Accept to chat with{' '}
                            <Link>{dialogue.otherUser.info.displayName}</Link> .
                            if you ignore the chat wil be removed,and we wont
                            let the sender know
                        </Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.reject}
                            onClick={handleReject}
                        >
                            Reject
                        </Button>
                    </Grid>
                    <Grid xs={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.accept}
                            onClick={handleAccept}
                        >
                            Accept
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
