import { useMutation } from '@apollo/client';
import {
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
    Grid,
} from '@mui/material';

import { Button } from '../../../../components/Button';

import {
    ACCEPT_DIALOGUE_INVITE,
    REJECT_DIALOGUE_INVITE,
} from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function InviteView({ dialogue }) {
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

    const handleReject = (e) => {
        e.preventDefault();
        RejectChat();
    };

    const handleAccept = (e) => {
        e.preventDefault();
        AcceptChat();
    };

    return (
        <Grid
            item
            justifyContent="center"
            alignItems="center"
            container
            direction="column"
            style={{ width: '100%', marginTop: '83%' }}
        >
            <Card className={classes.inviteBar}>
                <CardContent>
                    <Typography>
                        Accept to chat with{' '}
                        <Link to={`/users/${dialogue?.otherUser?.info?._id}`}>
                            {dialogue?.otherUser?.info?.displayName}
                        </Link>
                        . If you ignore this, the chat wil be removed and we
                        wont let the sender know.
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
        </Grid>
    );
}
