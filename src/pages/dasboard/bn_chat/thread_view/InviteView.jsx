import { useMutation } from '@apollo/client';
import {
    Card,
    CardActions,
    CardContent,
    Link,
    Typography,
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
        <div
            // style={{ minHeight: '64vh' }}
            className="d-flex justify-content-center align-items-end mx-auto w-100 mt-3"
        >
            <Card className={classes.cardDefault}>
                <CardContent>
                    <Typography>
                        Accept to chat with{' '}
                        <Link
                            to={`/users/${dialogue?.otherUser?.info?._id?._id}`}
                        >
                            {dialogue?.otherUser?.info?._id?.displayName}
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
                        textCase
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleReject}
                        textCase
                    >
                        Reject
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
