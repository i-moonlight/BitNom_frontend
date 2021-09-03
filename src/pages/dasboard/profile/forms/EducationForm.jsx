import { useMutation } from '@apollo/client';
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import TextField from '../../../../components/TextField';
import { educationInitialValues } from '../utilities/profile.initialValues';
import {
  MUTATION_ADD_EDUCATION,
  MUTATION_REMOVE_EDUCATION,
  MUTATION_UPDATE_EDUCATION,
  QUERY_FETCH_PROFILE,
} from '../utilities/profile.queries';
import { useStyles } from '../utilities/profile.styles';
import { educationValidation } from '../utilities/profile.validationSchemas';

export default function EducationForm({ onClose, updateData }) {
  const [current, setCurrent] = useState(updateData?.current);
  const [localError, setLocalError] = useState(false);
  const classes = useStyles();

  const [
    addEducation,
    {
      // addError,
      // data,
      addLoading,
    },
  ] = useMutation(MUTATION_ADD_EDUCATION, {
    context: { clientName: 'users' },
  });

  const [
    updateEducation,
    {
      // updateError,
      //  data,
      updateLoading,
    },
  ] = useMutation(MUTATION_UPDATE_EDUCATION, {
    context: { clientName: 'users' },
  });

  const [
    removeEducation,
    {
      // updateError,
      //  data,
      removeLoading,
    },
  ] = useMutation(MUTATION_REMOVE_EDUCATION, {
    context: { clientName: 'users' },
  });

  return (
    <div className='mt-2'>
      <Form
        initialValues={updateData || educationInitialValues}
        validationSchema={educationValidation}
        onSubmit={(
          { institution, major, start_date, end_date, description },
          { resetForm }
        ) => {
          setLocalError(null);

          if (!current && end_date == '') {
            setLocalError(
              "End Date required if you aren't currently pursuing this"
            );
            return;
          }

          const IEducation = current
            ? {
                institution,
                major,
                start_date,
                current,
                description,
              }
            : {
                institution,
                major,
                start_date,
                end_date,
                description,
              };

          console.log(IEducation);

          updateData ? console.log('upd') : console.log('add');

          updateData
            ? updateEducation({
                variables: {
                  id: updateData?.id,
                  data: IEducation,
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
            : addEducation({
                variables: {
                  data: IEducation,
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
              name='institution'
              labelTop='Institution'
              placeholder={updateData?.institution || 'Type to search'}
              adornmentType='start'
              adornment={<SearchRounded className='p-' />}
            />
            <TextField
              required
              fullWidth
              name='major'
              labelTop={updateData?.major || 'Degree &amp; Major'}
              placeholder='Degree Type'
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  required
                  type='date'
                  name='start_date'
                  labelTop='Start Date'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={current}
                  type='date'
                  name='end_date'
                  labelTop='End Date'
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={current}
                  onChange={() => {
                    setCurrent(!current);
                  }}
                  name='checkedA'
                />
              }
              label={
                <Typography variant='body2'>
                  I&apos;m currently pursuing this
                </Typography>
              }
            />
            <TextField
              required
              fullWidth
              multiline
              name='description'
              labelTop='Description'
              placeholder={updateData?.description || 'Describe your education'}
              rows={4}
            />
            {localError && <Alert severity='error'>{localError}</Alert>}
            <div className='d-flex justify-content-end'>
              <Button
                onClick={onClose}
                color='inherit'
                size='small'
                variant='text'
              >
                Cancel
              </Button>
              {updateData && (
                <Button
                  disabled={removeLoading}
                  size='small'
                  className='ms-2'
                  onClick={() => {
                    removeEducation({
                      variables: {
                        id: updateData?.id,
                      },
                      refetchQueries: [
                        {
                          query: QUERY_FETCH_PROFILE,
                          context: { clientName: 'users' },
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
              <Button
                disabled={addLoading || updateLoading}
                size='small'
                className='ms-2'
                submit
              >
                {updateData ? 'Update' : 'Save'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
}
