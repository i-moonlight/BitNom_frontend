import { useMutation } from '@apollo/client';
import { Alert, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { Button, FormikButton } from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import {
    MUTATION_UPDATE_PROFILE,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { bioValidation } from '../utilities/profile.validationSchemas';

export default function AboutForm({ onClose, updateData }) {
    const [localError, setLocalError] = useState(false);
    const classes = useStyles();

    const [
        updateUser,
        {
            // updateError,
            //  data,
            updateLoading,
        },
    ] = useMutation(MUTATION_UPDATE_PROFILE, {
        context: { clientName: 'users' },
    });

    return (
        <div className="mt-2">
            <Form
                initialValues={updateData || { bio: '' }}
                validationSchema={bioValidation}
                onSubmit={({ bio }, { resetForm }) => {
                    setLocalError(null);

                    const IUpdateUser = {
                        bio,
                    };

                    updateUser({
                        variables: {
                            data: IUpdateUser,
                        },
                        refetchQueries: [
                            {
                                query: QUERY_FETCH_PROFILE,
                                context: { clientName: 'users' },
                            },
                        ],
                    }).then(() => {
                        resetForm();
                        onClose();
                    });
                }}
            >
                <Card className={classes.formCard}>
                    <CardContent>
                        <TextField
                            required
                            fullWidth
                            multiline
                            name="bio"
                            labelTop="Bio"
                            placeholder={
                                updateData?.description ||
                                'Brief Description of yourself'
                            }
                            rows={4}
                        />
                        {localError && (
                            <Alert severity="error">{localError}</Alert>
                        )}
                        <div className="d-flex justify-content-end mt-2">
                            <Button
                                onClick={onClose}
                                color="inherit"
                                size="small"
                                variant="text"
                            >
                                Cancel
                            </Button>
                            <FormikButton
                                disabled={updateLoading}
                                size="small"
                                className="ms-2"
                            >
                                {updateData ? 'Update' : 'Save'}
                            </FormikButton>
                        </div>
                    </CardContent>
                </Card>
            </Form>
        </div>
    );
}
