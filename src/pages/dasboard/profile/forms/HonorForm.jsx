import { useMutation } from '@apollo/client';
import { SearchRounded } from '@mui/icons-material';
import {
    Alert,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Button, FormikButton } from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { honorInitialValues } from '../utilities/profile.initialValues';
import {
    MUTATION_ADD_HONOR,
    MUTATION_REMOVE_HONOR,
    MUTATION_UPDATE_HONOR,
    QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { honorValidation } from '../utilities/profile.validationSchemas';

export default function HonorForm({ onClose, updateData }) {
    const [expires, setExpires] = useState(updateData?.expires);
    const [localError, setLocalError] = useState(false);
    const classes = useStyles();

    const [
        addHonor,
        {
            // addError,
            // data,
            addLoading,
        },
    ] = useMutation(MUTATION_ADD_HONOR, {
        context: { clientName: 'users' },
    });

    const [
        updateHonor,
        {
            // updateError,
            //  data,
            updateLoading,
        },
    ] = useMutation(MUTATION_UPDATE_HONOR, {
        context: { clientName: 'users' },
    });

    const [
        removeHonor,
        {
            // updateError,
            //  data,
            removeLoading,
        },
    ] = useMutation(MUTATION_REMOVE_HONOR, {
        context: { clientName: 'users' },
    });

    return (
        <div className="mt-2">
            <Form
                initialValues={updateData || honorInitialValues}
                validationSchema={honorValidation}
                onSubmit={(
                    { organization, name, start_date, end_date, url },
                    { resetForm }
                ) => {
                    setLocalError(null);

                    if (!expires && end_date == '') {
                        setLocalError(
                            'End Date required if the credential expires'
                        );
                        return;
                    }

                    const IHonors = {
                        organization,
                        name,
                        start_date,
                        end_date,
                        expires,
                        url,
                    };

                    updateData
                        ? updateHonor({
                              variables: {
                                  id: updateData?.id,
                                  data: IHonors,
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
                          })
                        : addHonor({
                              variables: {
                                  data: IHonors,
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
                            name="name"
                            labelTop="Name of honor"
                            placeholder={updateData?.name || 'Type to search'}
                            adornmentType="start"
                            adornment={<SearchRounded className="p-" />}
                        />
                        <TextField
                            required
                            fullWidth
                            name="organization"
                            labelTop="Issuing Organization"
                            placeholder={
                                updateData?.title || 'Organization Name'
                            }
                        />
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    type="date"
                                    name="start_date"
                                    labelTop="Start Date"
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    disabled={expires}
                                    type="date"
                                    name="end_date"
                                    labelTop="End Date"
                                />
                            </Grid>
                        </Grid>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={expires}
                                    onChange={() => {
                                        setExpires(!expires);
                                    }}
                                    name="checkedA"
                                />
                            }
                            label={
                                <Typography variant="body2">
                                    This credential does not expire
                                </Typography>
                            }
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            name="url"
                            labelTop="Credential Url"
                            placeholder="Credential / Award URL"
                        />
                        {localError && (
                            <Alert severity="error">{localError}</Alert>
                        )}
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={onClose}
                                color="inherit"
                                size="small"
                                variant="text"
                            >
                                Cancel
                            </Button>
                            {updateData && (
                                <Button
                                    disabled={removeLoading}
                                    size="small"
                                    className="ms-2"
                                    onClick={() => {
                                        removeHonor({
                                            variables: {
                                                id: updateData?.id,
                                            },
                                            refetchQueries: [
                                                {
                                                    query: QUERY_FETCH_PROFILE,
                                                    context: {
                                                        clientName: 'users',
                                                    },
                                                },
                                            ],
                                        }).then(() => {
                                            // resetForm();
                                            onClose();
                                        });
                                    }}
                                >
                                    Delete
                                </Button>
                            )}
                            <FormikButton
                                disabled={addLoading || updateLoading}
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
