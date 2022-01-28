import { useMutation } from '@apollo/client';
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { GET_DIALOGUES, UNBLOCK_DIALOGUE } from '../graphql/queries';
import { useStyles } from '../utils/styles';

export default function Blocked({ otherUser, dialogue }) {
    const classes = useStyles();

    const [unblockUser] = useMutation(UNBLOCK_DIALOGUE);

    const onUnblockUser = () => {
        unblockUser({
            variables: {
                _id: dialogue,
            },
            context: { clientName: 'chat' },
            refetchQueries: [
                {
                    query: GET_DIALOGUES,
                    variables: {
                        status: 'accepted',
                    },
                    context: { clientName: 'chat' },
                },
            ],
        });
    };
    const handleUnblockUser = () => {
        onUnblockUser();
    };

    return (
        <Card className={classes.cardDefault}>
            <CardContent className="d-flex justify-content-center align-items-center mx-auto w-100">
                {otherUser?.blocked === true ? (
                    <Typography variant="body2">
                        You blocked{' '}
                        <Link to={`/users/${otherUser?.info?._id?._id}`}>
                            @{otherUser?.info?._id?._id}
                        </Link>
                        ,unblock to continue chating{' '}
                    </Typography>
                ) : (
                    <Typography variant="body2">
                        {' '}
                        You can no longer send messages to this chat!
                    </Typography>
                )}

                {otherUser?.blocked === true && (
                    <Button
                        style={{ marginLeft: '18px' }}
                        onClick={handleUnblockUser}
                    >
                        {' '}
                        unblock
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
