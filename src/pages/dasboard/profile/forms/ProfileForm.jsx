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
import { profileValidation } from '../utilities/profile.validationSchemas';

export default function ProfileForm({ onClose, updateData }) {
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
                initialValues={
                    updateData || {
                        displayName: '',
                        website: '',
                        portfolio: '',
                    }
                }
                validationSchema={profileValidation}
                onSubmit={(
                    { displayName, website, portfolio },
                    { resetForm }
                ) => {
                    setLocalError(null);

                    const IUpdateUser = {
                        displayName,
                        website,
                        portfolio,
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
                            name="displayName"
                            labelTop="Your Name"
                            placeholder={
                                updateData?.bio || 'Full name to be displayed'
                            }
                        />
                        <TextField
                            required
                            fullWidth
                            name="website"
                            labelTop="Website URL"
                            placeholder={
                                updateData?.website || 'Your Website URL'
                            }
                        />
                        <TextField
                            required
                            fullWidth
                            name="portfolio"
                            labelTop="PortFolio URL"
                            placeholder={
                                updateData?.portfolio || 'Your Portfolio URL'
                            }
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
