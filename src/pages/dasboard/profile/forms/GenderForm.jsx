import { useMutation } from '@apollo/client';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import {
    MUTATION_UPDATE_PROFILE,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';

export default function GenderForm({ onClose, profile }) {
    const [gender, setGender] = useState(profile?.gender);
    const classes = useStyles();

    const [
        updateProfile,
        {
            // addError,
            // data,
            profileLoading,
        },
    ] = useMutation(MUTATION_UPDATE_PROFILE, {
        context: { clientName: 'users' },
    });

    return (
        <div className="mt-2">
            <Card className={classes.formCard}>
                <CardContent>
                    <Typography>Update Gender</Typography>

                    <div className="mt-2">
                        {['male', 'female'].map((val) => (
                            <Chip
                                variant={val == gender ? 'default' : 'outlined'}
                                color="primary"
                                key={val}
                                label={val}
                                className="me-2 mb-2 text-capitalize"
                                onClick={() => {
                                    setGender(val);
                                }}
                            />
                        ))}
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                        <Button
                            onClick={onClose}
                            color="inherit"
                            size="small"
                            variant="text"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={() => {
                                updateProfile({
                                    variables: {
                                        data: { gender: gender },
                                    },
                                    refetchQueries: [
                                        {
                                            query: QUERY_FETCH_PROFILE,
                                            context: { clientName: 'users' },
                                        },
                                    ],
                                }).then(() => {
                                    onClose();
                                });
                            }}
                            size="small"
                            className="ms-2"
                            disabled={profileLoading}
                        >
                            Update
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
